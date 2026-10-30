import React, { useState } from 'react';
import { RotateCcw, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { EntradaSimulacao, formatMoeda } from '../utils/calculos';
import { ETAPAS_EC141, SALARIO_MINIMO_2026 } from '../utils/config';
import { ESCALAS_PRESETS, EscalaId, getEscalaPreset } from '../utils/escalas';

interface SimuladorFormProps {
  entrada: EntradaSimulacao;
  onChange: (nova: EntradaSimulacao) => void;
  onReset: () => void;
  mostrarLiquido: boolean;
  onToggleLiquido: (v: boolean) => void;
}

export const SimuladorForm: React.FC<SimuladorFormProps> = ({
  entrada,
  onChange,
  onReset,
  mostrarLiquido,
  onToggleLiquido,
}) => {
  const [mostrarAvancado, setMostrarAvancado] = useState(false);

  const handlePresetClick = (id: EscalaId) => {
    if (id === 'personalizada') {
      onChange({ ...entrada, escalaId: 'personalizada' });
      return;
    }
    const preset = getEscalaPreset(id);
    onChange({
      ...entrada,
      escalaId: preset.id,
      W: preset.diasTrabalho,
      R: preset.diasFolga,
      H: preset.horasTurno,
    });
  };

  const handleCicloChange = (campo: 'W' | 'R' | 'H', valorNum: number) => {
    onChange({
      ...entrada,
      escalaId: 'personalizada',
      [campo]: valorNum,
    });
  };

  const presetAtual = getEscalaPreset(entrada.escalaId);

  return (
    <aside
      aria-label="Parâmetros da simulação"
      className="w-full lg:w-[360px] shrink-0 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-5"
    >
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3.5">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Dados da Jornada
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cálculo instantâneo no navegador
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 bg-slate-100 dark:bg-slate-800/70 rounded-lg transition-colors whitespace-nowrap shrink-0"
          title="Restaurar valores iniciais"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Restaurar
        </button>
      </div>

      {/* 1. Salário Mensal + Atalho Salário Mínimo */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="input-salario"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            Salário bruto mensal (R$)
          </label>
          <button
            type="button"
            onClick={() => onChange({ ...entrada, salario: SALARIO_MINIMO_2026 })}
            className="text-xs font-medium text-teal-700 dark:text-teal-400 hover:underline whitespace-nowrap shrink-0"
          >
            Usar mínimo ({formatMoeda(SALARIO_MINIMO_2026)})
          </button>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono-num text-slate-400">
            R$
          </span>
          <input
            id="input-salario"
            type="number"
            min="0"
            step="10"
            value={entrada.salario === 0 ? '' : entrada.salario}
            placeholder="0,00"
            onChange={(e) => {
              const raw = e.target.value;
              const val = raw === '' ? 0 : Math.max(0, parseFloat(raw));
              onChange({ ...entrada, salario: Number.isNaN(val) ? 0 : val });
            }}
            className="w-full pl-9 pr-3 py-2.5 text-sm font-mono-num font-medium bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
      </div>

      {/* 2. Etapa da Transição EC 141/2026 */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
          Etapa da EC 141/2026 (Limite semanal)
        </span>
        <div
          role="group"
          aria-label="Selecionar etapa da transição"
          className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800"
        >
          {ETAPAS_EC141.map((et) => {
            const ativo = entrada.etapa === et.limiteSemanal;
            return (
              <button
                key={et.id}
                type="button"
                onClick={() => onChange({ ...entrada, etapa: et.limiteSemanal })}
                aria-pressed={ativo}
                className={`py-2 px-2 rounded-md text-center transition-colors ${
                  ativo
                    ? 'bg-teal-700 text-white font-semibold shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-mono-num whitespace-nowrap">
                  {et.limiteSemanal} h/sem
                </div>
                <div
                  className={`text-[10px] whitespace-nowrap truncate ${
                    ativo ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Div. {et.divisor}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Presets de Escala */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
            Modelo de escala
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {presetAtual.nome}
          </span>
        </div>
        <div
          role="group"
          aria-label="Modelos de escala predefinidos"
          className="grid grid-cols-4 gap-1.5"
        >
          {ESCALAS_PRESETS.map((preset) => {
            const selecionado = entrada.escalaId === preset.id;
            const rotuloBotao =
              preset.id === 'personalizada' ? 'Custom' : preset.id.toUpperCase();
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset.id)}
                aria-pressed={selecionado}
                className={`py-2 px-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  selecionado
                    ? 'bg-teal-50 dark:bg-teal-950/70 border-teal-600 dark:border-teal-500 text-teal-900 dark:text-teal-200 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {rotuloBotao}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          {presetAtual.descricaoCurta} · <span className="text-slate-600 dark:text-slate-300">{presetAtual.setorTipico}</span>
        </p>
      </div>

      {/* 4. Dias de Trabalho (W), Folga (R) e Horas por Turno (H) */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        <div>
          <label
            htmlFor="input-dias-trabalho"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Dias trab. (W)
          </label>
          <input
            id="input-dias-trabalho"
            type="number"
            min="1"
            max="30"
            step="1"
            value={entrada.W}
            onChange={(e) => {
              const val = Math.max(1, parseInt(e.target.value || '1', 10));
              handleCicloChange('W', Number.isNaN(val) ? 1 : val);
            }}
            className="w-full px-2.5 py-2 text-sm font-mono-num bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div>
          <label
            htmlFor="input-dias-folga"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Dias folga (R)
          </label>
          <input
            id="input-dias-folga"
            type="number"
            min="0"
            max="30"
            step="1"
            value={entrada.R}
            onChange={(e) => {
              const val = Math.max(0, parseInt(e.target.value || '0', 10));
              handleCicloChange('R', Number.isNaN(val) ? 0 : val);
            }}
            className="w-full px-2.5 py-2 text-sm font-mono-num bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div>
          <label
            htmlFor="input-horas-turno"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Horas/turno (H)
          </label>
          <input
            id="input-horas-turno"
            type="number"
            min="0.5"
            max="24"
            step="0.25"
            value={entrada.H}
            onChange={(e) => {
              const val = Math.max(0, Math.min(24, parseFloat(e.target.value || '0')));
              handleCicloChange('H', Number.isNaN(val) ? 0 : val);
            }}
            className="w-full px-2.5 py-2 text-sm font-mono-num bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
      </div>

      {/* Atalhos rápidos de turno para 6x1 e 12x36 */}
      {(entrada.escalaId === '12x36' || (entrada.W === 1 && entrada.R === 1)) && (
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-xs">
          <span className="text-slate-600 dark:text-slate-300">Intervalo 12x36:</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onChange({ ...entrada, escalaId: '12x36', W: 1, R: 1, H: 11 })}
              className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                entrada.H === 11
                  ? 'bg-teal-700 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              11h (1h concedida)
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...entrada, escalaId: '12x36', W: 1, R: 1, H: 12 })}
              className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                entrada.H === 12
                  ? 'bg-teal-700 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              12h (Indenizado)
            </button>
          </div>
        </div>
      )}

      {/* 5. Horas Extras, Noturnas e Domingos/Feriados no mês */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
        <span className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
          Adicionais variáveis no mês (opcional)
        </span>

        <div className="grid grid-cols-3 gap-2.5 items-end">
          <div>
            <label
              htmlFor="input-horas-extras"
              className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 whitespace-nowrap truncate"
            >
              Extras (+{entrada.percentualExtraCustom || 50}%)
            </label>
            <input
              id="input-horas-extras"
              type="number"
              min="0"
              max="200"
              step="1"
              value={entrada.horasExtras}
              onChange={(e) => {
                const v = Math.max(0, parseFloat(e.target.value || '0'));
                onChange({ ...entrada, horasExtras: Number.isNaN(v) ? 0 : v });
              }}
              className="w-full px-2.5 py-2 text-sm font-mono-num bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label
              htmlFor="input-horas-dom-feriado"
              className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 whitespace-nowrap truncate"
            >
              Dom./Fer. (100%)
            </label>
            <input
              id="input-horas-dom-feriado"
              type="number"
              min="0"
              max="200"
              step="1"
              value={entrada.horasDomFeriado}
              onChange={(e) => {
                const v = Math.max(0, parseFloat(e.target.value || '0'));
                onChange({ ...entrada, horasDomFeriado: Number.isNaN(v) ? 0 : v });
              }}
              className="w-full px-2.5 py-2 text-sm font-mono-num bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label
              htmlFor="input-horas-noturnas"
              className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1 whitespace-nowrap truncate"
            >
              Noturno (+{entrada.percentualNoturnoCustom || 20}%)
            </label>
            <input
              id="input-horas-noturnas"
              type="number"
              min="0"
              max="220"
              step="1"
              value={entrada.horasNoturnas}
              onChange={(e) => {
                const v = Math.max(0, parseFloat(e.target.value || '0'));
                onChange({ ...entrada, horasNoturnas: Number.isNaN(v) ? 0 : v });
              }}
              className="w-full px-2.5 py-2 text-sm font-mono-num bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>
        </div>
      </div>

      {/* 6. Painel de ajustes avançados (RF-19 e RF-20) */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <button
          type="button"
          onClick={() => setMostrarAvancado(!mostrarAvancado)}
          aria-expanded={mostrarAvancado}
          className="w-full flex items-center justify-between py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <span className="inline-flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
            Convenção coletiva e INSS/IRPF (opcional)
          </span>
          {mostrarAvancado ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {mostrarAvancado && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="input-perc-extra"
                  className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1"
                >
                  % Hora Extra (CCT)
                </label>
                <input
                  id="input-perc-extra"
                  type="number"
                  min="50"
                  max="200"
                  step="5"
                  value={entrada.percentualExtraCustom ?? 50}
                  onChange={(e) => {
                    const v = Math.max(50, parseFloat(e.target.value || '50'));
                    onChange({ ...entrada, percentualExtraCustom: Number.isNaN(v) ? 50 : v });
                  }}
                  className="w-full px-2.5 py-1.5 text-xs font-mono-num bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label
                  htmlFor="input-perc-noturno"
                  className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1"
                >
                  % Adic. Noturno (CCT)
                </label>
                <input
                  id="input-perc-noturno"
                  type="number"
                  min="20"
                  max="100"
                  step="5"
                  value={entrada.percentualNoturnoCustom ?? 20}
                  onChange={(e) => {
                    const v = Math.max(20, parseFloat(e.target.value || '20'));
                    onChange({ ...entrada, percentualNoturnoCustom: Number.isNaN(v) ? 20 : v });
                  }}
                  className="w-full px-2.5 py-1.5 text-xs font-mono-num bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none pt-1">
              <input
                type="checkbox"
                checked={mostrarLiquido}
                onChange={(e) => onToggleLiquido(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300">
                Exibir estimativa referencial de INSS e IRPF
              </span>
            </label>
          </div>
        )}
      </div>
    </aside>
  );
};
