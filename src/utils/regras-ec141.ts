import { EscalaId } from './escalas';

export type AlertaId = 'AL-01' | 'AL-02' | 'AL-03' | 'AL-04' | 'AL-05' | 'AL-06';
export type AlertaSeveridade = 'danger' | 'warning' | 'info' | 'success';

export interface AlertaConformidade {
  id: AlertaId;
  severidade: AlertaSeveridade;
  titulo: string;
  mensagem: string;
  fundamento: string;
}

export interface AvaliacaoRegrasInput {
  escalaId: EscalaId;
  W: number;
  R: number;
  H: number;
  limiteSemanal: 44 | 42 | 40;
  jornadaSemanal: number;
  folgaSemanal: number;
}

export function avaliarAlertasEC141(input: AvaliacaoRegrasInput): AlertaConformidade[] {
  const { escalaId, W, R, H, limiteSemanal: L, jornadaSemanal, folgaSemanal } = input;
  const alertas: AlertaConformidade[] = [];

  const excesso = Number(Math.max(0, jornadaSemanal - L).toFixed(2));

  // AL-01: Jornada semanal > L
  if (jornadaSemanal > L) {
    alertas.push({
      id: 'AL-01',
      severidade: 'danger',
      titulo: `Excesso de ${formatNumeroPt(excesso)} h/semana sobre o limite de ${L} h`,
      mensagem: `A jornada média semanal (${formatNumeroPt(jornadaSemanal)} h) ultrapassa o limite constitucional de ${L} h desta etapa em ${formatNumeroPt(excesso)} h por semana. Exige redução da carga diária, compensação em banco de horas ou pagamento como horas extras.`,
      fundamento: 'Art. 7º, XIII da CF/88 (Redação EC 141/2026 · RN-01 e RN-02)',
    });
  } else {
    // AL-06: Jornada <= L
    alertas.push({
      id: 'AL-06',
      severidade: 'success',
      titulo: `Jornada semanal dentro do limite de ${L} h`,
      mensagem: `Sua carga média de ${formatNumeroPt(jornadaSemanal)} h/semana respeita o teto de ${L} h semanais da etapa selecionada.`,
      fundamento: 'Art. 7º, XIII da CF/88 (EC 141/2026)',
    });
  }

  // AL-02: Folga média < 2 dias e etapa da transição (42 h ou 40 h)
  // Nota do PRD: Na tabela 3.3 e critério de aceite 4.2, AL-02 aplica-se nas etapas pós-promulgação (42h e 40h), enquanto AL-03 aplica-se na etapa de 44h.
  if (folgaSemanal < 2 && (L === 42 || L === 40)) {
    alertas.push({
      id: 'AL-02',
      severidade: 'warning',
      titulo: `Folga média de ${formatNumeroPt(folgaSemanal)} ${folgaSemanal === 1 ? 'dia' : 'dias'}/semana (mínimo de 2 repousos)`,
      mensagem:
        'A partir da 1ª etapa (16/12/2026), o art. 7º, XV exige dois repousos semanais remunerados. Escalas com menos de 2 folgas semanais exigem compensação mensal prevista em norma coletiva ou regulamentação por lei de regimes diferenciados.',
      fundamento: 'Art. 7º, XV e § 3º da CF/88 (EC 141/2026 · RN-03 e RN-06)',
    });
  }

  // AL-03: Folga média < 2 dias e etapa 44 h
  if (folgaSemanal < 2 && L === 44) {
    alertas.push({
      id: 'AL-03',
      severidade: 'info',
      titulo: `Atenção para dezembro/2026: folga média de ${formatNumeroPt(folgaSemanal)} ${folgaSemanal === 1 ? 'dia' : 'dias'}/semana`,
      mensagem:
        'A regra de 44 h exige apenas um repouso semanal remunerado, mas passam a ser obrigatórios dois repousos semanais a partir de 16/12/2026 (1ª etapa da EC 141/2026).',
      fundamento: 'Regra de Transição EC 141/2026 (RN-02 e RN-03)',
    });
  }

  // AL-04: Turno > 8 h
  if (H > 8) {
    alertas.push({
      id: 'AL-04',
      severidade: 'warning',
      titulo: `Turno diário de ${formatNumeroPt(H)} h (acima de 8 h)`,
      mensagem:
        'Jornadas diárias superiores a 8 horas dependem de acordo ou convenção coletiva de trabalho para compensação de horários, respeitado o limite semanal da etapa.',
      fundamento: 'Art. 7º, XIII da CF/88 (RN-01 e RN-05)',
    });
  }

  // AL-05: Escala 12x36
  const is12x36Pattern = escalaId === '12x36' || (W === 1 && R === 1 && H >= 10 && H <= 12);
  if (is12x36Pattern) {
    alertas.push({
      id: 'AL-05',
      severidade: 'info',
      titulo: 'Regra específica da escala 12x36 na EC 141/2026',
      mensagem:
        'A escala 12x36 não foi extinta expressamente, mas a média semanal não pode passar de 40 h em dez/2027. Com 1 h de intervalo concedida (11 h efetivas), a média é 38,5 h/semana (dentro do limite). Com intervalo indenizado (12 h), a média vai a 42 h/semana.',
      fundamento: 'RN-09 · Análise Técnica EC 141/2026',
    });
  }

  return alertas;
}

export function formatNumeroPt(val: number, maxDecimals = 2): string {
  return val.toLocaleString('pt-BR', {
    minimumFractionDigits: Number.isInteger(val) ? 0 : 1,
    maximumFractionDigits: maxDecimals,
  });
}
