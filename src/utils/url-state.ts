import { EntradaSimulacao } from './calculos';
import { SALARIO_MINIMO_2026 } from './config';
import { EscalaId, ESCALAS_PRESETS } from './escalas';

export const DEFAULT_ENTRADA: EntradaSimulacao = {
  salario: SALARIO_MINIMO_2026,
  escalaId: '6x1',
  W: 6,
  R: 1,
  H: 7.33,
  etapa: 42,
  horasExtras: 0,
  horasNoturnas: 0,
  horasDomFeriado: 0,
  percentualExtraCustom: 50,
  percentualNoturnoCustom: 20,
};

export function parseHashToEntrada(): EntradaSimulacao {
  if (typeof window === 'undefined' || !window.location.hash) {
    return { ...DEFAULT_ENTRADA };
  }

  try {
    const rawHash = window.location.hash.replace(/^#/, '');
    const params = new URLSearchParams(rawHash);
    if (!params.has('s') && !params.has('esc')) {
      return { ...DEFAULT_ENTRADA };
    }

    const escRaw = (params.get('esc') || '6x1') as EscalaId;
    const isValidEsc = ESCALAS_PRESETS.some((p) => p.id === escRaw);
    const escalaId: EscalaId = isValidEsc ? escRaw : '6x1';

    const s = Number(params.get('s'));
    const w = Number(params.get('w'));
    const r = Number(params.get('r'));
    const h = Number(params.get('h'));
    const et = Number(params.get('et'));
    const he = Number(params.get('he'));
    const hn = Number(params.get('hn'));
    const hdf = Number(params.get('hdf'));

    return {
      salario: Number.isFinite(s) && s >= 0 ? s : DEFAULT_ENTRADA.salario,
      escalaId,
      W: Number.isFinite(w) && w >= 1 ? w : DEFAULT_ENTRADA.W,
      R: Number.isFinite(r) && r >= 0 ? r : DEFAULT_ENTRADA.R,
      H: Number.isFinite(h) && h > 0 && h <= 24 ? h : DEFAULT_ENTRADA.H,
      etapa: et === 44 || et === 42 || et === 40 ? et : DEFAULT_ENTRADA.etapa,
      horasExtras: Number.isFinite(he) && he >= 0 ? he : 0,
      horasNoturnas: Number.isFinite(hn) && hn >= 0 ? hn : 0,
      horasDomFeriado: Number.isFinite(hdf) && hdf >= 0 ? hdf : 0,
      percentualExtraCustom: 50,
      percentualNoturnoCustom: 20,
    };
  } catch {
    return { ...DEFAULT_ENTRADA };
  }
}

export function buildShareableUrl(entrada: EntradaSimulacao): string {
  const params = new URLSearchParams();
  params.set('s', String(entrada.salario));
  params.set('esc', entrada.escalaId);
  params.set('w', String(entrada.W));
  params.set('r', String(entrada.R));
  params.set('h', String(entrada.H));
  params.set('et', String(entrada.etapa));
  if (entrada.horasExtras > 0) params.set('he', String(entrada.horasExtras));
  if (entrada.horasNoturnas > 0) params.set('hn', String(entrada.horasNoturnas));
  if (entrada.horasDomFeriado > 0) params.set('hdf', String(entrada.horasDomFeriado));

  const base = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  return `${base}#${params.toString()}`;
}
