export interface EtapaInfo {
  id: '44' | '42' | '40';
  limiteSemanal: 44 | 42 | 40;
  divisor: 220 | 210 | 200;
  titulo: string;
  subtitulo: string;
  inicio: string;
  repousosSemanais: number;
  valorHoraMinimo: number;
}

export const SALARIO_MINIMO_2026 = 1621.00; // Decreto nº 12.797/2025
export const ULTIMA_ATUALIZACAO = '30/10/2026';

export const ETAPAS_EC141: EtapaInfo[] = [
  {
    id: '44',
    limiteSemanal: 44,
    divisor: 220,
    titulo: 'Regra Anterior (44 h)',
    subtitulo: 'Até 15/12/2026',
    inicio: 'Vigente até 15/12/2026',
    repousosSemanais: 1,
    valorHoraMinimo: 7.37,
  },
  {
    id: '42',
    limiteSemanal: 42,
    divisor: 210,
    titulo: '1ª Etapa (42 h)',
    subtitulo: 'A partir de 16/12/2026',
    inicio: '16/12/2026 (há fontes que citam 15/12/2026)',
    repousosSemanais: 2,
    valorHoraMinimo: 7.72,
  },
  {
    id: '40',
    limiteSemanal: 40,
    divisor: 200,
    titulo: '2ª Etapa (40 h)',
    subtitulo: 'Até Dez/2027 (14 meses)',
    inicio: 'Dezembro de 2027 (em até 14 meses da publicação)',
    repousosSemanais: 2,
    valorHoraMinimo: 8.11,
  },
];

export interface RegraResumo {
  codigo: string;
  titulo: string;
  descricao: string;
  requerConfirmacao?: boolean;
}

export const REGRAS_NEGOCIO: RegraResumo[] = [
  {
    codigo: 'RN-01',
    titulo: 'Novo limite constitucional (Art. 7º, XIII)',
    descricao:
      'Promulgada em 16/10/2026, a EC 141/2026 passa a prever jornada normal de até 8 h diárias e 40 h semanais, facultada a compensação de horários e a redução da jornada mediante acordo ou convenção coletiva.',
  },
  {
    codigo: 'RN-02',
    titulo: 'Transição em etapas (44 h → 42 h → 40 h)',
    descricao:
      'Limite de 44 h até a 1ª etapa; passa para 42 h semanais a partir de 16/12/2026; e chega a 40 h semanais em até 14 meses da publicação (dezembro de 2027). Nota: há fontes jurídicas que citam 15/12/2026 para o início da 1ª etapa.',
    requerConfirmacao: true,
  },
  {
    codigo: 'RN-03',
    titulo: 'Dois repousos semanais remunerados (Art. 7º, XV)',
    descricao:
      'Passam a ser obrigatórios dois dias de descanso semanal remunerado (preferencialmente aos sábados e domingos) já a partir da 1ª etapa de transição em dezembro de 2026.',
  },
  {
    codigo: 'RN-04',
    titulo: 'Proibição de redução salarial e valorização da hora',
    descricao:
      'É vedada qualquer redução salarial, inclusive de pisos normativos. Trabalhadores mensalistas mantêm o salário mensal integral (elevando o valor da hora pelo divisor 210 e 200); horistas têm o valor da hora reajustado proporcionalmente.',
  },
  {
    codigo: 'RN-05',
    titulo: 'Cláusulas coletivas e transição',
    descricao:
      'Cláusulas de acordos e convenções coletivas incompatíveis perdem efeito a partir de 16/12/2026. Acordo ou convenção pode negociar a distribuição da jornada diária durante a transição, respeitados os dois repousos do art. 7º, XV.',
  },
  {
    codigo: 'RN-06',
    titulo: 'Regimes diferenciados e compensação mensal (§ 3º)',
    descricao:
      'Lei futura poderá disciplinar regimes diferenciados, respeitados 8 h/dia e 40 h/semana, 6 h em turnos ininterruptos de revezamento e dois descansos semanais. A compensação mensal de repousos pode ser negociada coletivamente.',
  },
  {
    codigo: 'RN-07',
    titulo: 'Medidas transitórias para MEI, ME e EPP',
    descricao:
      'Lei complementar poderá prever medidas transitórias e de apoio para microempreendedores individuais (MEI), microempresas (ME) e empresas de pequeno porte (EPP), condicionadas à manutenção do emprego.',
  },
  {
    codigo: 'RN-08',
    titulo: 'Servidores públicos, terceirização e hipersuficientes',
    descricao:
      'A emenda não altera o regime estatutário de servidores públicos. Existem disposições específicas para repactuação de contratos de terceirização com o Poder Público e para empregados hipersuficientes.',
    requerConfirmacao: true,
  },
  {
    codigo: 'RN-09',
    titulo: 'Continuidade da escala 12x36',
    descricao:
      'A escala 12x36 não é extinta expressamente pela emenda. Com 1 h de intervalo concedida (11 h efetivas), a média semanal é de 38,5 h; com intervalo indenizado (12 h), a média é de 42 h/semana, exigindo ajuste até dez/2027.',
    requerConfirmacao: true,
  },
];

export interface FaqItem {
  pergunta: string;
  resposta: string;
  categoria: 'Trabalhador' | 'Escalas' | 'Empregador e RH';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    categoria: 'Trabalhador',
    pergunta: 'Meu salário vai diminuir porque vou trabalhar menos horas por semana?',
    resposta:
      'Não. A Emenda Constitucional nº 141/2026 proíbe expressamente a redução de salários e pisos salariais (RN-04). Se você é mensalista, continuará recebendo exatamente o mesmo salário mensal bruto, o que significa que cada hora trabalhada passa a valer mais devido à redução do divisor mensal (de 220 para 210 na 1ª etapa e 200 na 2ª etapa).',
  },
  {
    categoria: 'Escalas',
    pergunta: 'Trabalhadores na escala 6x1 passam a ter 2 folgas por semana quando?',
    resposta:
      'A regra dos dois repousos semanais remunerados (art. 7º, XV) passa a valer na 1ª etapa da transição, em 16/12/2026 (algumas fontes citam 15/12/2026). Para manter uma escala com mais de 5 dias seguidos de trabalho, será necessária previsão de compensação mensal de repousos em convenção ou acordo coletivo ou lei de regimes diferenciados.',
  },
  {
    categoria: 'Escalas',
    pergunta: 'Como fica quem trabalha na escala 12x36 (saúde, portaria, vigilância)?',
    resposta:
      'A escala 12x36 não foi extinta pela EC 141/2026. Em um ciclo de 12h de trabalho por 36h de descanso, o trabalhador cumpre em média 3,5 turnos por semana. Quando há 1 hora de intervalo para refeição (11 horas efetivas de trabalho), a jornada média semanal é de 38,5 horas — já abaixo do limite de 42h (2026) e de 40h (dez/2027). Porém, se o intervalo for indenizado (12h computadas), a média fica em 42h semanais, exigindo adequação até dezembro de 2027.',
  },
  {
    categoria: 'Empregador e RH',
    pergunta: 'Como mudam os divisores de folha de pagamento (220, 210 e 200)?',
    resposta:
      'O divisor mensal é calculado multiplicando o limite semanal por 5 (considerando 30 dias / 6 dias ou a proporção com o DSR). Com 44h semanais, o divisor é 220. Na 1ª etapa (42h em dez/2026), o divisor cai para 210 (+4,76% no valor da hora). Na etapa final (40h em dez/2027), o divisor passa a ser 200 (+10% no valor da hora em relação ao divisor 220).',
  },
  {
    categoria: 'Empregador e RH',
    pergunta: 'Existe regra de transição especial para MEI, Microempresas (ME) e EPP?',
    resposta:
      'Sim (RN-07). A EC 141/2026 prevê que lei complementar poderá estabelecer medidas transitórias e compensatórias para MEI, ME e EPP, desde que condicionadas à manutenção dos postos de trabalho.',
  },
  {
    categoria: 'Trabalhador',
    pergunta: 'Este simulador calcula descontos de INSS, Imposto de Renda ou FGTS?',
    resposta:
      'O foco oficial do simulador é o cálculo do valor da hora normal, horas extras, adicional noturno, valor por hora efetiva e conformidade da escala perante a EC 141/2026 (remuneração bruta estimada). Você também pode ativar a estimativa opcional de INSS/IRPF no painel avançado apenas para referência.',
  },
];

export const GLOSSARIO_ITEMS = [
  {
    termo: '6x1 / 5x2',
    definicao: 'Proporção de dias de trabalho seguidos por dias de folga em cada ciclo da escala.',
  },
  {
    termo: '12x36',
    definicao: 'Regime especial com 12 horas de trabalho seguidas por 36 horas ininterruptas de descanso.',
  },
  {
    termo: 'Repouso Semanal Remunerado (RSR / DSR)',
    definicao: 'Dias de folga semanal pagos no salário. Com a EC 141/2026, passam a ser dois dias por semana a partir da 1ª etapa.',
  },
  {
    termo: 'Divisor (220, 210, 200)',
    definicao: 'Número de horas mensais (limite semanal × 5) utilizado para dividir o salário mensal e encontrar o valor de 1 hora de trabalho.',
  },
  {
    termo: 'Hipersuficiente',
    definicao: 'Trabalhador com diploma de nível superior e salário mensal igual ou superior a duas vezes o limite máximo dos benefícios do RGPS (teto do INSS), com regras próprias de negociação na CLT.',
  },
  {
    termo: 'MEI / ME / EPP',
    definicao: 'Microempreendedor Individual, Microempresa e Empresa de Pequeno Porte, que poderão contar com medidas transitórias em lei complementar.',
  },
];

export const FONTES_REFERENCIA = [
  { nome: 'Texto da Emenda Constitucional nº 141/2026 (Promulgação 16/10/2026)', tipo: 'Base Constitucional' },
  { nome: 'Decreto nº 12.797/2025 — Salário Mínimo 2026 (R$ 1.621,00)', tipo: 'Legislação Federal' },
  { nome: 'Agência Senado — Cobertura e tramitação da redução de jornada', tipo: 'Fonte Oficial' },
  { nome: 'Fenacon & Legisweb — Tabelas de divisores trabalhistas (220 / 210 / 200)', tipo: 'Referência Contábil' },
  { nome: 'Caltrab & Pontotel — Estudos de impacto em escalas 6x1, 5x2 e 12x36', tipo: 'Guia Técnico RH' },
];
