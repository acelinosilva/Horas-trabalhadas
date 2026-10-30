import { ETAPAS_EC141, SALARIO_MINIMO_2026 } from './config';
import { EscalaId } from './escalas';
import { AlertaConformidade, avaliarAlertasEC141 } from './regras-ec141';

export interface EntradaSimulacao {
  salario: number;
  escalaId: EscalaId;
  W: number; // Dias de trabalho no ciclo
  R: number; // Dias de folga no ciclo
  H: number; // Horas efetivas por turno
  etapa: 44 | 42 | 40; // Limite semanal da etapa (L)
  horasExtras: number; // Horas extras 50% no mês
  horasNoturnas: number; // Horas noturnas (20%) no mês
  horasDomFeriado: number; // Horas em domingos/feriados (100%) no mês
  percentualExtraCustom?: number; // RF-20: percentual customizado opcional (padrão 50%)
  percentualNoturnoCustom?: number; // RF-20: percentual noturno customizado opcional (padrão 20%)
}

export interface ComparacaoEtapaItem {
  etapa: 44 | 42 | 40;
  divisor: 220 | 210 | 200;
  titulo: string;
  subtitulo: string;
  valorHoraUsuario: number;
  horaExtra50Usuario: number;
  ganhoPercentualHora: number;
  valorHoraMinimo: number;
}

export interface DiaCalendario {
  diaNumero: number;
  semana: number;
  diaSemanaLabel: string;
  trabalha: boolean;
  horas: number;
}

export interface ResultadoSimulacao {
  salarioBase: number;
  divisor: 220 | 210 | 200;
  limiteEtapa: 44 | 42 | 40;
  turnosPorSemana: number;
  jornadaSemanal: number;
  folgaSemanal: number;
  horasPorMes: number;
  valorHora: number;
  horaExtra50Unit: number;
  horaExtra100Unit: number;
  adicionalNoturnoUnit: number;
  totalExtras50: number;
  totalDomFeriado: number;
  totalNoturno: number;
  brutoEstimado: number;
  valorHoraEfetiva: number;
  excessoSemanal: number;
  ganhoTempoLivreAnual: number;
  alertas: AlertaConformidade[];
  tabelaEtapas: ComparacaoEtapaItem[];
  calendario4Semanas: DiaCalendario[];
  estimativaInss: number;
  estimativaIrpf: number;
  liquidoEstimado: number;
}

/**
 * Arredonda valor monetário ou métrico para 2 casas decimais de forma determinística
 */
export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Calcula INSS progressivo (referência 2026 baseada na tabela progressiva ajustada ao mínimo de R$ 1.621,00)
 */
export function calcularInssEstimado(bruto: number): number {
  if (bruto <= 0) return 0;
  const faixa1 = 1621.00;
  const faixa2 = 2902.84;
  const faixa3 = 4354.27;
  const teto = 8475.55;

  const base = Math.min(bruto, teto);
  let inss = 0;

  if (base > 0) {
    inss += Math.min(base, faixa1) * 0.075;
  }
  if (base > faixa1) {
    inss += (Math.min(base, faixa2) - faixa1) * 0.09;
  }
  if (base > faixa2) {
    inss += (Math.min(base, faixa3) - faixa2) * 0.12;
  }
  if (base > faixa3) {
    inss += (base - faixa3) * 0.14;
  }

  return round2(inss);
}

/**
 * Calcula IRPF estimado com desconto simplificado
 */
export function calcularIrpfEstimado(bruto: number, inss: number): number {
  if (bruto <= 0) return 0;
  const descontoSimplificado = 607.20;
  const deducaoEfetiva = Math.max(inss, descontoSimplificado);
  const baseCalculo = Math.max(0, bruto - deducaoEfetiva);

  if (baseCalculo <= 2428.80) return 0;
  if (baseCalculo <= 2826.65) return round2(Math.max(0, baseCalculo * 0.075 - 182.16));
  if (baseCalculo <= 3751.05) return round2(Math.max(0, baseCalculo * 0.15 - 394.16));
  if (baseCalculo <= 4664.68) return round2(Math.max(0, baseCalculo * 0.225 - 675.49));
  return round2(Math.max(0, baseCalculo * 0.275 - 908.73));
}

export function calcularSimulacao(entrada: EntradaSimulacao): ResultadoSimulacao {
  const S = Math.max(0, Number.isFinite(entrada.salario) ? entrada.salario : 0);
  const W = Math.max(1, Number.isFinite(entrada.W) && entrada.W > 0 ? Math.round(entrada.W) : 1);
  const R = Math.max(0, Number.isFinite(entrada.R) && entrada.R >= 0 ? Math.round(entrada.R) : 0);
  const H = Math.max(0, Math.min(24, Number.isFinite(entrada.H) ? entrada.H : 0));
  const L: 44 | 42 | 40 = entrada.etapa === 44 || entrada.etapa === 42 || entrada.etapa === 40 ? entrada.etapa : 42;

  const horasExtras = Math.max(0, Number.isFinite(entrada.horasExtras) ? entrada.horasExtras : 0);
  const horasNoturnas = Math.max(0, Number.isFinite(entrada.horasNoturnas) ? entrada.horasNoturnas : 0);
  const horasDomFeriado = Math.max(0, Number.isFinite(entrada.horasDomFeriado) ? entrada.horasDomFeriado : 0);

  const percExtra =
    entrada.percentualExtraCustom !== undefined && entrada.percentualExtraCustom >= 50
      ? entrada.percentualExtraCustom / 100
      : 0.5;
  const percNoturno =
    entrada.percentualNoturnoCustom !== undefined && entrada.percentualNoturnoCustom >= 20
      ? entrada.percentualNoturnoCustom / 100
      : 0.2;

  const cicloTotal = W + R;
  const turnosPorSemanaRaw = cicloTotal > 0 ? (7 * W) / cicloTotal : 0;

  // Caso especial para 6x1 de 7h20 (7.33h): garante exatamente 44.0h semanais conforme seção 4.2 do PRD
  const isPadrao6x1QuarentaEQuatro = W === 6 && R === 1 && Math.abs(H - 7.33) <= 0.015;
  const jornadaSemanalRaw = isPadrao6x1QuarentaEQuatro ? 44 : turnosPorSemanaRaw * H;

  const turnosPorSemana = round2(turnosPorSemanaRaw);
  const jornadaSemanal = round2(jornadaSemanalRaw);
  const folgaSemanal = round2(7 - turnosPorSemanaRaw);
  const horasPorMes = round2((jornadaSemanalRaw * 52) / 12);

  const divisor = (L * 5) as 220 | 210 | 200;
  const valorHoraRaw = S / divisor;
  const valorHora = round2(valorHoraRaw);

  // Pelas fórmulas da seção 3.2:
  // Hora extra 50% = hora * 1,5 (ou percentual customizado)
  // Trabalho em domingo/feriado (extra 100%) = hora * 2
  // Adicional noturno = hora * 0,20
  const horaExtra50Unit = round2(valorHora * (1 + percExtra));
  const horaExtra100Unit = round2(valorHora * 2);
  const adicionalNoturnoUnit = round2(valorHora * percNoturno);

  const totalExtras50 = round2(horaExtra50Unit * horasExtras);
  const totalDomFeriado = round2(horaExtra100Unit * horasDomFeriado);
  const totalNoturno = round2(adicionalNoturnoUnit * horasNoturnas);

  const brutoEstimado = round2(S + totalExtras50 + totalDomFeriado + totalNoturno);
  const valorHoraEfetiva = horasPorMes > 0 ? round2(S / horasPorMes) : 0;
  const excessoSemanal = round2(Math.max(0, jornadaSemanal - L));
  const ganhoTempoLivreAnual = round2(Math.max(0, (44 - jornadaSemanal) * 52));

  const alertas = avaliarAlertasEC141({
    escalaId: entrada.escalaId,
    W,
    R,
    H,
    limiteSemanal: L,
    jornadaSemanal,
    folgaSemanal,
  });

  const valorHora220 = S / 220;
  const tabelaEtapas: ComparacaoEtapaItem[] = ETAPAS_EC141.map((et) => {
    const vhUser = round2(S / et.divisor);
    const he50User = round2(vhUser * (1 + percExtra));
    const ganhoPerc = valorHora220 > 0 ? round2(((S / et.divisor - valorHora220) / valorHora220) * 100) : 0;
    return {
      etapa: et.limiteSemanal,
      divisor: et.divisor,
      titulo: et.titulo,
      subtitulo: et.subtitulo,
      valorHoraUsuario: vhUser,
      horaExtra50Usuario: he50User,
      ganhoPercentualHora: ganhoPerc,
      valorHoraMinimo: round2(SALARIO_MINIMO_2026 / et.divisor),
    };
  });

  const diasSemanaNomes = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  const calendario4Semanas: DiaCalendario[] = [];
  for (let i = 0; i < 28; i++) {
    const posNoCiclo = cicloTotal > 0 ? i % cicloTotal : 0;
    const trabalha = posNoCiclo < W;
    calendario4Semanas.push({
      diaNumero: i + 1,
      semana: Math.floor(i / 7) + 1,
      diaSemanaLabel: diasSemanaNomes[i % 7],
      trabalha,
      horas: trabalha ? H : 0,
    });
  }

  const estimativaInss = calcularInssEstimado(brutoEstimado);
  const estimativaIrpf = calcularIrpfEstimado(brutoEstimado, estimativaInss);
  const liquidoEstimado = round2(Math.max(0, brutoEstimado - estimativaInss - estimativaIrpf));

  return {
    salarioBase: S,
    divisor,
    limiteEtapa: L,
    turnosPorSemana,
    jornadaSemanal,
    folgaSemanal,
    horasPorMes,
    valorHora,
    horaExtra50Unit,
    horaExtra100Unit,
    adicionalNoturnoUnit,
    totalExtras50,
    totalDomFeriado,
    totalNoturno,
    brutoEstimado,
    valorHoraEfetiva,
    excessoSemanal,
    ganhoTempoLivreAnual,
    alertas,
    tabelaEtapas,
    calendario4Semanas,
    estimativaInss,
    estimativaIrpf,
    liquidoEstimado,
  };
}

export interface ResultadoEmpregador {
  numFuncionarios: number;
  custoHoraPorFuncionario220: number;
  custoHoraPorFuncionarioEtapa: number;
  acrescimoPercentualHora: number;
  folhaMensalBaseTotal: number;
  horasTotaisEquipe44: number;
  horasTotaisEquipeEtapa: number;
  horasReduzidasEquipeMes: number;
  custoReposicaoHorasExtrasMes: number;
}

export function calcularImpactoEmpregador(
  entrada: EntradaSimulacao,
  numFuncionarios: number
): ResultadoEmpregador {
  const n = Math.max(1, Math.round(numFuncionarios || 1));
  const sim = calcularSimulacao(entrada);
  const custoHora220 = round2(sim.salarioBase / 220);
  const custoHoraEtapa = sim.valorHora;
  const acrescimoPercentualHora =
    custoHora220 > 0 ? round2(((custoHoraEtapa - custoHora220) / custoHora220) * 100) : 0;

  const folhaMensalBaseTotal = round2(sim.brutoEstimado * n);
  const horasMes44 = (44 * 52) / 12;
  const horasMesLimite = (sim.limiteEtapa * 52) / 12;

  const horasTotaisEquipe44 = round2(horasMes44 * n);
  const horasTotaisEquipeEtapa = round2(horasMesLimite * n);
  const horasReduzidasEquipeMes = round2(Math.max(0, horasTotaisEquipe44 - horasTotaisEquipeEtapa));
  const custoReposicaoHorasExtrasMes = round2(horasReduzidasEquipeMes * sim.horaExtra50Unit);

  return {
    numFuncionarios: n,
    custoHoraPorFuncionario220: custoHora220,
    custoHoraPorFuncionarioEtapa: custoHoraEtapa,
    acrescimoPercentualHora,
    folhaMensalBaseTotal,
    horasTotaisEquipe44,
    horasTotaisEquipeEtapa,
    horasReduzidasEquipeMes,
    custoReposicaoHorasExtrasMes,
  };
}

export function formatMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
