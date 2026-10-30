import { EscalaId } from './escalas';

export type CategoriaNoticia =
  | 'Congresso e Legislação'
  | 'Escala 6x1 vs 5x2'
  | 'Escala 12x36'
  | 'Valor da Hora e Folha'
  | 'Empregadores e MEI/EPP';

export interface SecaoArtigo {
  subtitulo: string;
  paragrafos: string[];
  destaqueDados?: {
    rotulo: string;
    valor: string;
    detalhe: string;
  }[];
}

export interface NoticiaSEO {
  id: string;
  slug: string;
  categoria: CategoriaNoticia;
  dataPublicacao: string;
  dataISO: string;
  tempoLeitura: string;
  origemLegislativa: string;
  titulo: string;
  resumoMeta: string;
  palavrasChave: string[];
  fonteReferencia: string;
  simulacaoRelacionada: {
    rotuloBotao: string;
    escalaId: EscalaId;
    etapa: 44 | 42 | 40;
    horasTurno?: number;
  };
  secoes: SecaoArtigo[];
}

export const NOTICIAS_EC141: NoticiaSEO[] = [
  {
    id: 'promulgacao-ec-141-2026-pec-221-pec-8',
    slug: 'congresso-promulga-ec-141-2026-fim-44h-pec-221-pec-8',
    categoria: 'Congresso e Legislação',
    dataPublicacao: '16 de outubro de 2026',
    dataISO: '2026-10-16',
    tempoLeitura: '4 min de leitura',
    origemLegislativa: 'PEC 221/2019 e PEC 8/2025 → EC 141/2026',
    titulo:
      'Congresso Nacional promulga a EC 141/2026: entenda a transição de 44h para 42h e 40h semanais sem redução salarial',
    resumoMeta:
      'Assinada pelo Congresso Nacional em 16 de outubro de 2026 a partir da PEC 221/2019 e da PEC 8/2025, a Emenda Constitucional nº 141/2026 fixa jornada de 40h semanais e dois descansos remunerados.',
    palavrasChave: [
      'Emenda Constitucional 141/2026',
      'PEC 221/2019',
      'PEC 8/2025',
      'Congresso Nacional 16 de outubro de 2026',
      'redução de jornada 40 horas',
    ],
    fonteReferencia: 'Agência Senado / Diário do Congresso Nacional (16/10/2026)',
    simulacaoRelacionada: {
      rotuloBotao: 'Simular transição na 1ª Etapa (42h)',
      escalaId: '6x1',
      etapa: 42,
    },
    secoes: [
      {
        subtitulo: 'Da PEC 221/2019 e PEC 8/2025 ao texto final assinado em 16/10/2026',
        paragrafos: [
          'Em sessão solene realizada em 16 de outubro de 2026, o Congresso Nacional promulgou a Emenda Constitucional nº 141/2026. O texto consolida anos de debates iniciados na Câmara dos Deputados com a PEC 221/2019 e impulsionados pela mobilização em torno da PEC 8/2025 pelo fim da escala 6x1 sem compensação.',
          'Com a nova redação do artigo 7º, incisos XIII e XV da Constituição Federal, a duração do trabalho normal não poderá ser superior a 8 horas diárias e 40 horas semanais, garantindo-se dois repousos semanais remunerados (preferencialmente aos sábados e domingos) e vedando qualquer corte salarial.',
        ],
        destaqueDados: [
          {
            rotulo: 'Promulgação no Congresso',
            valor: '16/10/2026',
            detalhe: 'Origem: PEC 221/2019 e PEC 8/2025',
          },
          {
            rotulo: '1ª Etapa de Transição',
            valor: '42 h / semana',
            detalhe: 'A partir de 16/12/2026 (divisor 210)',
          },
          {
            rotulo: '2ª Etapa Definitiva',
            valor: '40 h / semana',
            detalhe: 'Em até 14 meses · Dez/2027 (divisor 200)',
          },
        ],
      },
      {
        subtitulo: 'O que muda imediatamente para trabalhadores e departamentos de RH',
        paragrafos: [
          'Entre 16 de outubro e meados de dezembro de 2026, vigora o período de adaptação operacional com o limite anterior de 44 horas semanais. A partir de 16/12/2026 (algumas fontes jurídicas apontam 15/12/2026), entra em vigor a 1ª etapa obrigatória: teto de 42 horas semanais, dois dias de descanso semanal remunerado e perda de eficácia de cláusulas coletivas incompatíveis.',
          'Já a etapa final de 40 horas semanais será obrigatória em até 14 meses contados da publicação (dezembro de 2027), consolidando o divisor 200 na folha de pagamento brasileira.',
        ],
      },
    ],
  },
  {
    id: 'escala-6x1-vs-5x2-regras-folgas',
    slug: 'escala-6x1-vs-5x2-como-fica-com-dois-repousos-ec-141-2026',
    categoria: 'Escala 6x1 vs 5x2',
    dataPublicacao: '20 de outubro de 2026',
    dataISO: '2026-10-20',
    tempoLeitura: '5 min de leitura',
    origemLegislativa: 'Art. 7º, XIII e XV · EC 141/2026',
    titulo:
      'Escala 6x1 vs 5x2 na EC 141/2026: quando começam as duas folgas semanais e o que acontece com o comércio',
    resumoMeta:
      'Compare a escala 6x1 (44h) com a 5x2 (40h) após a EC 141/2026. Veja por que a exigência de dois repousos semanais remunerados em dezembro de 2026 transforma o comércio e serviços.',
    palavrasChave: [
      'escala 6x1 acabou',
      'escala 6x1 vs 5x2',
      'dois repousos semanais remunerados',
      'comércio e serviços EC 141/2026',
    ],
    fonteReferencia: 'Caltrab / Fenacon — Guia de Escalas 2026',
    simulacaoRelacionada: {
      rotuloBotao: 'Simular escala 5x2 na etapa de 40h',
      escalaId: '5x2',
      etapa: 40,
    },
    secoes: [
      {
        subtitulo: 'Por que a escala 6x1 tradicional gera duplo alerta a partir de dezembro de 2026',
        paragrafos: [
          'Na escala 6x1 tradicional de 44 horas semanais (6 dias de 7h20 por 1 dia de descanso), o trabalhador cumpre 44 horas por semana e usufrui de apenas 1 folga semanal. A partir de 16/12/2026, esse modelo esbarra em duas travas constitucionais simultâneas: o novo teto de 42 horas semanais (excesso de 2h/semana) e a obrigatoriedade de dois repousos semanais remunerados (art. 7º, XV).',
          'Para migrar para a escala 5x2 (5 dias de 8 horas e 2 dias de folga), o trabalhador passa a cumprir exatamente 40 horas semanais e ganha 208 horas de tempo livre por ano em comparação ao antigo regime de 44 horas.',
        ],
        destaqueDados: [
          {
            rotulo: 'Escala 6x1 (44h)',
            valor: '1 folga/sem',
            detalhe: 'Gera excesso de 2h em dez/2026 e 4h em dez/2027',
          },
          {
            rotulo: 'Escala 5x2 (40h)',
            valor: '2 folgas/sem',
            detalhe: '100% compatível com a 1ª e a 2ª etapa da EC 141',
          },
          {
            rotulo: 'Ganho de Tempo Livre',
            valor: '+208 h/ano',
            detalhe: 'Equivalente a 26 dias úteis de 8h por ano',
          },
        ],
      },
      {
        subtitulo: 'Compensação mensal de repousos via convenção coletiva (§ 3º)',
        paragrafos: [
          'A EC 141/2026 permite que lei futura crie regimes diferenciados respeitados os limites de 8h diárias, 40h semanais e dois dias de descanso. Além disso, a compensação mensal dos repousos semanais pode ser objeto de negociação coletiva (acordo ou convenção coletiva), permitindo escalas de revezamento desde que a média de folgas e o teto de horas sejam integralmente preservados.',
        ],
      },
    ],
  },
  {
    id: 'valor-da-hora-divisor-220-210-200',
    slug: 'valor-da-hora-com-42h-e-40h-divisores-220-210-200-salario-minimo',
    categoria: 'Valor da Hora e Folha',
    dataPublicacao: '24 de outubro de 2026',
    dataISO: '2026-10-24',
    tempoLeitura: '4 min de leitura',
    origemLegislativa: 'Vedação de Redução Salarial · RN-04 EC 141/2026',
    titulo:
      'Valor da hora com 42h e 40h: como a mudança do divisor (220 → 210 → 200) aumenta a hora normal e a hora extra',
    resumoMeta:
      'Com a proibição de redução salarial da EC 141/2026, o divisor mensal cai de 220 para 210 em dezembro de 2026 e para 200 em dezembro de 2027, valorizando a hora trabalhada em até 10%.',
    palavrasChave: [
      'divisor 210',
      'divisor 200',
      'valor da hora salário mínimo 2026',
      'cálculo hora extra EC 141/2026',
    ],
    fonteReferencia: 'Legisweb / Decreto nº 12.797/2025 (Salário Mínimo R$ 1.621,00)',
    simulacaoRelacionada: {
      rotuloBotao: 'Calcular valor da hora com divisor 200',
      escalaId: '5x2',
      etapa: 40,
    },
    secoes: [
      {
        subtitulo: 'Por que o valor da hora sobe mesmo com o salário mensal igual?',
        paragrafos: [
          'A regra de ouro da EC 141/2026 (RN-04) é a irredutibilidade salarial: nenhum trabalhador mensalista ou piso de categoria pode sofrer corte no salário mensal em razão da queda da jornada semanal. Como o trabalhador recebe o mesmo salário para trabalhar menos horas no mês, o divisor trabalhista (calculado pela fórmula Limite Semanal × 5) diminui.',
          'Tomando como base o salário mínimo nacional de 2026 (R$ 1.621,00, fixado pelo Decreto nº 12.797/2025), o valor da hora normal sobe de R$ 7,37 (divisor 220) para R$ 7,72 na 1ª etapa (divisor 210, alta de +4,76%) e atinge R$ 8,11 na 2ª etapa (divisor 200, alta de +10%).',
        ],
        destaqueDados: [
          {
            rotulo: 'Etapa 44h (Divisor 220)',
            valor: 'R$ 7,37 / hora',
            detalhe: 'Hora extra 50%: R$ 11,06 · Salário Mínimo 2026',
          },
          {
            rotulo: '1ª Etapa 42h (Divisor 210)',
            valor: 'R$ 7,72 / hora',
            detalhe: 'Hora extra 50%: R$ 11,58 (+4,76% por hora)',
          },
          {
            rotulo: '2ª Etapa 40h (Divisor 200)',
            valor: 'R$ 8,11 / hora',
            detalhe: 'Hora extra 50%: R$ 12,17 (+10,00% por hora)',
          },
        ],
      },
      {
        subtitulo: 'Reflexo automático em horas extras, adicional noturno e domingos/feriados',
        paragrafos: [
          'Como as horas extras (+50%), o trabalho em domingos e feriados não compensados (+100%) e o adicional noturno (+20%) são calculados diretamente sobre o valor da hora normal, qualquer empregado que realize horas adicionais terá acréscimo real na remuneração bruta mensal já a partir de 16 de dezembro de 2026.',
        ],
      },
    ],
  },
  {
    id: 'como-fica-escala-12x36-ec-141-2026',
    slug: 'como-fica-escala-12x36-saude-vigilancia-ec-141-2026',
    categoria: 'Escala 12x36',
    dataPublicacao: '27 de outubro de 2026',
    dataISO: '2026-10-27',
    tempoLeitura: '4 min de leitura',
    origemLegislativa: 'RN-09 · Análise Técnica 12x36 na EC 141/2026',
    titulo:
      'Como fica a escala 12x36 na EC 141/2026: diferença crucial entre intervalo concedido (38,5h) e indenizado (42h)',
    resumoMeta:
      'Saiba se a escala 12x36 continua válida após a EC 141/2026. Com 1h de intervalo para refeição (11h líquidas), a média semanal é de 38,5h e respeita o limite de 40h.',
    palavrasChave: [
      'escala 12x36 EC 141/2026',
      'plantão 12x36 continua válido',
      '12x36 intervalo intrajornada 38,5 horas',
      'saúde e vigilância 12x36',
    ],
    fonteReferencia: 'Pontotel / Caltrab — Regimes de Plantão 2026',
    simulacaoRelacionada: {
      rotuloBotao: 'Simular escala 12x36 (11h efetivas)',
      escalaId: '12x36',
      etapa: 40,
      horasTurno: 11,
    },
    secoes: [
      {
        subtitulo: 'A escala 12x36 não foi extinta pela Emenda Constitucional nº 141/2026',
        paragrafos: [
          'Profissionais de saúde, hospitais, portaria e vigilância patrimonial têm uma dúvida recorrente: a escala 12x36 acabou? A resposta técnica é não. A EC 141/2026 não extingue expressamente o regime de 12 horas de trabalho seguidas por 36 horas ininterruptas de descanso.',
          'Como o ciclo da 12x36 dura 2 dias (1 dia de plantão + 1 dia de folga), o trabalhador cumpre em média 3,5 turnos por semana (7 ÷ 2 = 3,5). O ponto decisivo para o enquadramento constitucional está no tratamento do intervalo intrajornada de 1 hora para refeição e descanso.',
        ],
        destaqueDados: [
          {
            rotulo: '12x36 com 1h de Intervalo',
            valor: '38,5 h / semana',
            detalhe: '3,5 turnos × 11h efetivas = Dentro do limite de 40h',
          },
          {
            rotulo: '12x36 Intervalo Indenizado',
            valor: '42,0 h / semana',
            detalhe: '3,5 turnos × 12h = Exige ajuste até dez/2027 (limite 40h)',
          },
          {
            rotulo: 'Descanso Semanal Médio',
            valor: '3,5 dias / sem',
            detalhe: 'Atende com folga o mínimo de 2 repousos semanais',
          },
        ],
      },
      {
        subtitulo: 'Atenção aos acordos coletivos para turnos acima de 8 horas',
        paragrafos: [
          'Por envolver turnos diários superiores a 8 horas, a manutenção da escala 12x36 requer atenção às convenções e acordos coletivos de trabalho da categoria (RN-01 e RN-05), além da concessão efetiva de 1 hora de intervalo para que a carga semanal média permaneça em 38,5 horas quando o teto de 40 horas entrar em vigor em dezembro de 2027.',
        ],
      },
    ],
  },
  {
    id: 'perguntas-empregadores-mei-me-epp-contratos-publicos',
    slug: 'guia-empregadores-mei-me-epp-terceirizacao-ec-141-2026',
    categoria: 'Empregadores e MEI/EPP',
    dataPublicacao: '30 de outubro de 2026',
    dataISO: '2026-10-30',
    tempoLeitura: '5 min de leitura',
    origemLegislativa: 'RN-05, RN-07 e RN-08 · EC 141/2026',
    titulo:
      'Guia para Empregadores, MEI, ME e EPP: medidas transitórias, acordos coletivos e contratos com o Poder Público',
    resumoMeta:
      'O que pequenas empresas (MEI, ME e EPP), contadores e gestores de RH precisam preparar para 16 de dezembro de 2026 sob a Emenda Constitucional nº 141/2026.',
    palavrasChave: [
      'MEI ME EPP redução de jornada',
      'impacto na folha EC 141/2026',
      'contratos de terceirização Poder Público',
      'hipersuficientes CLT EC 141',
    ],
    fonteReferencia: 'Fenacon / Agência Senado — Guia Empresarial EC 141/2026',
    simulacaoRelacionada: {
      rotuloBotao: 'Simular custo no Modo RH / Empresa',
      escalaId: '6x1',
      etapa: 42,
    },
    secoes: [
      {
        subtitulo: 'Medidas transitórias para MEI, Microempresas (ME) e Empresas de Pequeno Porte (EPP)',
        paragrafos: [
          'Reconhecendo o impacto operacional sobre pequenos negócios do comércio e serviços, a EC 141/2026 prevê (RN-07) que lei complementar poderá instituir medidas transitórias e mecanismos compensatórios voltados especificamente para MEI, ME e EPP, condicionados à preservação dos empregos.',
          'Enquanto a lei complementar é aguardada, contadores e analistas de DP recomendam simular imediatamente a readequação das escalas (como a transição de 6x1 de 7h20 para 5x2 de 8h ou turnos revezados) para evitar o pagamento recorrente de 2 a 4 horas extras semanais por colaborador.',
        ],
        destaqueDados: [
          {
            rotulo: 'Prazo da 1ª Etapa',
            valor: '16/12/2026',
            detalhe: 'Cláusulas coletivas incompatíveis perdem efeito',
          },
          {
            rotulo: 'Pequenos Negócios',
            valor: 'MEI, ME e EPP',
            detalhe: 'Lei complementar preverá medidas ligadas à manutenção do emprego',
          },
          {
            rotulo: 'Setor Público e Terceirizados',
            valor: 'Regras Próprias',
            detalhe: 'Estatutários inalterados; terceirizados têm diretriz específica',
          },
        ],
      },
      {
        subtitulo: 'Terceirização com o Poder Público, servidores e hipersuficientes (RN-08)',
        paragrafos: [
          'A emenda constitucional não altera a jornada estatutária dos servidores públicos civis das administrações diretas, autárquicas e fundacionais. Contudo, prevê regras específicas para a repactuação e equilíbrio econômico-financeiro de contratos de terceirização firmados com o Poder Público, bem como disposições aplicáveis aos trabalhadores hipersuficientes (portadores de diploma de nível superior e salário igual ou superior a duas vezes o teto do INSS).',
        ],
      },
    ],
  },
];

export function filtrarNoticiasEC141(
  categoria: string,
  busca: string
): NoticiaSEO[] {
  const termo = busca.trim().toLowerCase();
  return NOTICIAS_EC141.filter((item) => {
    const matchCategoria =
      categoria === 'Todas' || item.categoria === categoria;
    if (!matchCategoria) return false;
    if (!termo) return true;

    const alvo = [
      item.titulo,
      item.resumoMeta,
      item.origemLegislativa,
      item.categoria,
      ...item.palavrasChave,
      ...item.secoes.flatMap((s) => [s.subtitulo, ...s.paragrafos]),
    ]
      .join(' ')
      .toLowerCase();

    return alvo.includes(termo);
  });
}
