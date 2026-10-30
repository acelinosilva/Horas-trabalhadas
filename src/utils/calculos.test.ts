import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularSimulacao, calcularImpactoEmpregador } from './calculos';
import { SALARIO_MINIMO_2026 } from './config';

test('Critério de aceite 1: Salário R$ 1.621,00, escala 5x2 de 8 h e etapa 40 h -> hora R$ 8,11, jornada 40 h sem alerta de excesso', () => {
  const res = calcularSimulacao({
    salario: SALARIO_MINIMO_2026,
    escalaId: '5x2',
    W: 5,
    R: 2,
    H: 8,
    etapa: 40,
    horasExtras: 0,
    horasNoturnas: 0,
    horasDomFeriado: 0,
  });

  assert.equal(res.divisor, 200);
  assert.equal(res.valorHora, 8.11);
  assert.equal(res.jornadaSemanal, 40);
  assert.equal(res.folgaSemanal, 2);
  assert.equal(res.excessoSemanal, 0);
  assert.ok(res.alertas.some((a) => a.id === 'AL-06'));
  assert.ok(!res.alertas.some((a) => a.id === 'AL-01'));
  assert.ok(!res.alertas.some((a) => a.id === 'AL-02'));
});

test('Critério de aceite 2: Escala 6x1 de 44 h e etapa 42 h -> exibe AL-01 (excesso de 2 h) e AL-02 (folga média de 1 dia)', () => {
  const res = calcularSimulacao({
    salario: SALARIO_MINIMO_2026,
    escalaId: '6x1',
    W: 6,
    R: 1,
    H: 7.33,
    etapa: 42,
    horasExtras: 0,
    horasNoturnas: 0,
    horasDomFeriado: 0,
  });

  assert.equal(res.divisor, 210);
  assert.equal(res.valorHora, 7.72);
  assert.equal(res.jornadaSemanal, 44);
  assert.equal(res.folgaSemanal, 1);
  assert.equal(res.excessoSemanal, 2);
  assert.ok(res.alertas.some((a) => a.id === 'AL-01'));
  assert.ok(res.alertas.some((a) => a.id === 'AL-02'));
});

test('Critério de aceite 3: Escala 12x36 com 11 h por turno -> jornada média exibida é 38,5 h e alerta AL-05', () => {
  const res = calcularSimulacao({
    salario: 2500,
    escalaId: '12x36',
    W: 1,
    R: 1,
    H: 11,
    etapa: 40,
    horasExtras: 0,
    horasNoturnas: 0,
    horasDomFeriado: 0,
  });

  assert.equal(res.turnosPorSemana, 3.5);
  assert.equal(res.jornadaSemanal, 38.5);
  assert.equal(res.folgaSemanal, 3.5);
  assert.ok(res.alertas.some((a) => a.id === 'AL-05'));
  assert.ok(res.alertas.some((a) => a.id === 'AL-04')); // H > 8
  assert.ok(res.alertas.some((a) => a.id === 'AL-06')); // 38.5 <= 40
});

test('Fórmulas da Seção 3.2: horas extras 50%, domingo/feriado 100%, adicional noturno 20% e bruto estimado', () => {
  const res = calcularSimulacao({
    salario: 2200,
    escalaId: '5x2',
    W: 5,
    R: 2,
    H: 8,
    etapa: 44,
    horasExtras: 10,
    horasNoturnas: 20,
    horasDomFeriado: 5,
  });

  // Divisor 220 -> valorHora = 10.00
  assert.equal(res.valorHora, 10.00);
  assert.equal(res.horaExtra50Unit, 15.00);
  assert.equal(res.horaExtra100Unit, 20.00);
  assert.equal(res.adicionalNoturnoUnit, 2.00);

  // Totais: 10 * 15 = 150; 5 * 20 = 100; 20 * 2 = 40; Bruto = 2200 + 290 = 2490
  assert.equal(res.totalExtras50, 150.00);
  assert.equal(res.totalDomFeriado, 100.00);
  assert.equal(res.totalNoturno, 40.00);
  assert.equal(res.brutoEstimado, 2490.00);
  assert.equal(res.ganhoTempoLivreAnual, 208); // (44 - 40) * 52 = 208 h/ano
});

test('Constantes do salário mínimo nas 3 etapas (R$ 7,37, R$ 7,72, R$ 8,11)', () => {
  const res = calcularSimulacao({
    salario: SALARIO_MINIMO_2026,
    escalaId: '5x2',
    W: 5,
    R: 2,
    H: 8,
    etapa: 42,
    horasExtras: 0,
    horasNoturnas: 0,
    horasDomFeriado: 0,
  });

  const [et44, et42, et40] = res.tabelaEtapas;
  assert.equal(et44.valorHoraMinimo, 7.37);
  assert.equal(et42.valorHoraMinimo, 7.72);
  assert.equal(et40.valorHoraMinimo, 8.11);
});

test('Casos extremos: salário zero, 24h por turno, ciclo sem folga e modo empregador', () => {
  const resExtremo = calcularSimulacao({
    salario: 0,
    escalaId: 'personalizada',
    W: 7,
    R: 0,
    H: 24,
    etapa: 44,
    horasExtras: -5,
    horasNoturnas: 0,
    horasDomFeriado: 0,
  });

  assert.equal(resExtremo.valorHora, 0);
  assert.equal(resExtremo.turnosPorSemana, 7);
  assert.equal(resExtremo.folgaSemanal, 0);
  assert.equal(resExtremo.jornadaSemanal, 168);
  assert.ok(resExtremo.alertas.some((a) => a.id === 'AL-03')); // Folga < 2 na etapa 44h

  const emp = calcularImpactoEmpregador(
    {
      salario: 2000,
      escalaId: '6x1',
      W: 6,
      R: 1,
      H: 7.33,
      etapa: 40,
      horasExtras: 0,
      horasNoturnas: 0,
      horasDomFeriado: 0,
    },
    10
  );

  assert.equal(emp.numFuncionarios, 10);
  assert.equal(emp.custoHoraPorFuncionarioEtapa, 10); // 2000 / 200
  assert.equal(emp.folhaMensalBaseTotal, 20000);
});

import { NOTICIAS_EC141, filtrarNoticiasEC141 } from './noticias-ec141';

test('Notícias SEO EC 141/2026: valida filtro por categoria, busca por PEC 221/2019 e PEC 8/2025 e data 16 de outubro de 2026', () => {
  assert.equal(NOTICIAS_EC141.length, 5);

  const porPec = filtrarNoticiasEC141('Todas', 'PEC 221/2019');
  assert.ok(porPec.length >= 1);
  assert.equal(porPec[0].dataPublicacao, '16 de outubro de 2026');

  const porPec8 = filtrarNoticiasEC141('Todas', 'PEC 8/2025');
  assert.ok(porPec8.length >= 1);

  const porCategoria12x36 = filtrarNoticiasEC141('Escala 12x36', '');
  assert.equal(porCategoria12x36.length, 1);
  assert.equal(porCategoria12x36[0].simulacaoRelacionada.escalaId, '12x36');
});

