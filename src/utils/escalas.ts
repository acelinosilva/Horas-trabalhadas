export type EscalaId =
  | '6x1'
  | '5x2'
  | '12x36'
  | '6x2'
  | '4x2'
  | '12x60'
  | '24x48'
  | 'personalizada';

export interface EscalaPreset {
  id: EscalaId;
  nome: string;
  descricaoCurta: string;
  diasTrabalho: number;
  diasFolga: number;
  horasTurno: number;
  setorTipico: string;
}

export const ESCALAS_PRESETS: EscalaPreset[] = [
  {
    id: '6x1',
    nome: '6x1 (44h padrão)',
    descricaoCurta: '6 dias de trabalho por 1 de folga (7h20/dia = 44h/sem)',
    diasTrabalho: 6,
    diasFolga: 1,
    horasTurno: 7.33,
    setorTipico: 'Comércio, serviços, supermercados e atendimento',
  },
  {
    id: '5x2',
    nome: '5x2 (40h)',
    descricaoCurta: '5 dias de trabalho por 2 de folga (8h/dia = 40h/sem)',
    diasTrabalho: 5,
    diasFolga: 2,
    horasTurno: 8,
    setorTipico: 'Administrativo, escritórios, bancos e tecnologia',
  },
  {
    id: '12x36',
    nome: '12x36 (11h líq.)',
    descricaoCurta: '12h com 1h de intervalo seguidas de 36h de descanso',
    diasTrabalho: 1,
    diasFolga: 1,
    horasTurno: 11,
    setorTipico: 'Saúde, hospitais, portaria e vigilância',
  },
  {
    id: '6x2',
    nome: '6x2',
    descricaoCurta: '6 dias de trabalho seguidos por 2 dias de folga',
    diasTrabalho: 6,
    diasFolga: 2,
    horasTurno: 8,
    setorTipico: 'Indústria contínua e logística',
  },
  {
    id: '4x2',
    nome: '4x2',
    descricaoCurta: '4 dias de trabalho seguidos por 2 dias de folga',
    diasTrabalho: 4,
    diasFolga: 2,
    horasTurno: 8,
    setorTipico: 'Operações de revezamento e segurança',
  },
  {
    id: '12x60',
    nome: '12x60',
    descricaoCurta: 'Plantão de 12h (11h efetivas) por 60h de descanso',
    diasTrabalho: 1,
    diasFolga: 2,
    horasTurno: 11,
    setorTipico: 'Setor público e plantões especializados',
  },
  {
    id: '24x48',
    nome: '24x48',
    descricaoCurta: 'Plantão de 24h seguido por 48h de descanso',
    diasTrabalho: 1,
    diasFolga: 2,
    horasTurno: 24,
    setorTipico: 'Bombeiros civis, resgate e emergências',
  },
  {
    id: 'personalizada',
    nome: 'Personalizada',
    descricaoCurta: 'Defina livremente dias de trabalho, folga e horas por turno',
    diasTrabalho: 6,
    diasFolga: 1,
    horasTurno: 8,
    setorTipico: 'Qualquer jornada customizada',
  },
];

export function getEscalaPreset(id: EscalaId): EscalaPreset {
  return ESCALAS_PRESETS.find((e) => e.id === id) || ESCALAS_PRESETS[0];
}
