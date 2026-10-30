import React, { useState } from 'react';
import { ArrowRightLeft, Building2, CheckCircle2, AlertTriangle } from 'lucide-react';
import {
  EntradaSimulacao,
  calcularSimulacao,
  calcularImpactoEmpregador,
  formatMoeda,
} from '../utils/calculos';
import { ESCALAS_PRESETS, EscalaId, getEscalaPreset } from '../utils/escalas';
import { formatNumeroPt } from '../utils/regras-ec141';

interface ComparadorEscalasProps {
  entradaBase: EntradaSimulacao;
}

export const ComparadorEscalas: React.FC<ComparadorEscalasProps> = ({ entradaBase }) => {
  const [escalaBId, setEscalaBId] = useState<EscalaId>(
    entradaBase.escalaId === '5x2' ? '12x36' : '5x2'
  );
  const [etapaB, setEtapaB] = useState<44 | 42 | 40>(40);

  const presetA = getEscalaPreset(entradaBase.escalaId);
  const presetB = getEscalaPreset(escalaBId);

  const resA = calcularSimulacao(entradaBase);
  const resB = calcularSimulacao({
    ...entradaBase,
    escalaId: presetB.id,
    W: presetB.diasTrabalho,
    R: presetB.diasFolga,
    H: presetB.horasTurno,
    etapa: etapaB,
  });

  const diffHorasSemanal = resB.jornadaSemanal - resA.jornadaSemanal;
  const diffFolgasSemanal = resB.folgaSemanal - resA.folgaSemanal;
  const diffHorasAnual = (resA.jornadaSemanal - resB.jornadaSemanal) * 52;

  return (
    <section
      id="comparador"
      aria-label="Comparador de duas escalas lado a lado"
      className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            Comparar Duas Escalas Lado a Lado
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare sua escala selecionada no simulador com outra alternativa de jornada e etapa da EC 141/2026
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="select-escala-b" className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Comparar com:
          </label>
          <select
            id="select-escala-b"
            value={escalaBId}
            onChange={(e) => setEscalaBId(e.target.value as EscalaId)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
          >
            {ESCALAS_PRESETS.filter((p) => p.id !== 'personalizada').map((p) => (
              <option key={p.id} value={p.id}>
                Escala {p.nome}
              </option>
            ))}
          </select>

          <select
            aria-label="Etapa da segunda escala"
            value={etapaB}
            onChange={(e) => setEtapaB(Number(e.target.value) as 44 | 42 | 40)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
          >
            <option value={44}>Etapa 44h (Div. 220)</option>
            <option value={42}>Etapa 42h (Div. 210)</option>
            <option value={40}>Etapa 40h (Div. 200)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Coluna Escala A */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Cenário A (Atual no simulador)</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {presetA.nome} · Etapa {resA.limiteEtapa}h
              </h4>
            </div>
            {resA.excessoSemanal === 0 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-200/70 dark:border-slate-800">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Jornada semanal</dt>
              <dd className="font-mono-num font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                {formatNumeroPt(resA.jornadaSemanal)} h/sem
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Folga média semanal</dt>
              <dd className="font-mono-num font-bold text-sm text-emerald-700 dark:text-emerald-400 mt-0.5">
                {formatNumeroPt(resA.folgaSemanal)} dias/sem
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Valor da hora (÷{resA.divisor})</dt>
              <dd className="font-mono-num font-bold text-sm text-teal-800 dark:text-teal-300 mt-0.5">
                {formatMoeda(resA.valorHora)}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Valor por hora efetiva</dt>
              <dd className="font-mono-num font-semibold text-sm text-slate-800 dark:text-slate-200 mt-0.5">
                {formatMoeda(resA.valorHoraEfetiva)}
              </dd>
            </div>
          </dl>
        </div>

        {/* Coluna Escala B */}
        <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-teal-700 dark:text-teal-400">Cenário B (Alternativa)</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {presetB.nome} · Etapa {resB.limiteEtapa}h
              </h4>
            </div>
            {resB.excessoSemanal === 0 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-teal-200/60 dark:border-teal-800/60">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Jornada semanal</dt>
              <dd className="font-mono-num font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                {formatNumeroPt(resB.jornadaSemanal)} h/sem
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Folga média semanal</dt>
              <dd className="font-mono-num font-bold text-sm text-emerald-700 dark:text-emerald-400 mt-0.5">
                {formatNumeroPt(resB.folgaSemanal)} dias/sem
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Valor da hora (÷{resB.divisor})</dt>
              <dd className="font-mono-num font-bold text-sm text-teal-800 dark:text-teal-300 mt-0.5">
                {formatMoeda(resB.valorHora)}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Valor por hora efetiva</dt>
              <dd className="font-mono-num font-semibold text-sm text-slate-800 dark:text-slate-200 mt-0.5">
                {formatMoeda(resB.valorHoraEfetiva)}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Síntese da diferença */}
      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-medium text-slate-700 dark:text-slate-300">
          Diferença do Cenário B em relação ao Cenário A:
        </span>
        <div className="flex flex-wrap items-center gap-4 font-mono-num">
          <span>
            Jornada:{' '}
            <strong className={diffHorasSemanal <= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}>
              {diffHorasSemanal > 0 ? `+${formatNumeroPt(diffHorasSemanal)}` : formatNumeroPt(diffHorasSemanal)} h/sem
            </strong>
          </span>
          <span>
            Folgas:{' '}
            <strong className={diffFolgasSemanal >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}>
              {diffFolgasSemanal > 0 ? `+${formatNumeroPt(diffFolgasSemanal)}` : formatNumeroPt(diffFolgasSemanal)} d/sem
            </strong>
          </span>
          <span>
            Tempo livre no ano:{' '}
            <strong className="text-teal-800 dark:text-teal-300">
              {diffHorasAnual >= 0
                ? `+${formatNumeroPt(diffHorasAnual)} h livres/ano`
                : `${formatNumeroPt(diffHorasAnual)} h/ano`}
            </strong>
          </span>
        </div>
      </div>
    </section>
  );
};

interface PainelEmpregadorProps {
  entrada: EntradaSimulacao;
}

export const PainelEmpregador: React.FC<PainelEmpregadorProps> = ({ entrada }) => {
  const [numFuncionarios, setNumFuncionarios] = useState(10);
  const impacto = calcularImpactoEmpregador(entrada, numFuncionarios);

  return (
    <section
      aria-label="Modo empregador, RH e contabilidade"
      className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-700 dark:text-teal-400" />
            Simulador de Impacto para RH, Contadores e Empresas (MEI / ME / EPP)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dimensione o custo da hora e o volume de horas da equipe para N colaboradores na etapa de {entrada.etapa} h
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="input-num-funcionarios"
            className="text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            Nº de funcionários:
          </label>
          <input
            id="input-num-funcionarios"
            type="number"
            min="1"
            max="10000"
            value={numFuncionarios}
            onChange={(e) => {
              const v = Math.max(1, parseInt(e.target.value || '1', 10));
              setNumFuncionarios(Number.isNaN(v) ? 1 : v);
            }}
            className="w-24 px-3 py-1.5 text-sm font-mono-num font-semibold bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400 block">
            Custo da hora / funcionário
          </span>
          <span className="text-xl font-bold font-mono-num text-slate-900 dark:text-slate-100 mt-1 block">
            {formatMoeda(impacto.custoHoraPorFuncionarioEtapa)}
          </span>
          <span className="text-xs text-teal-700 dark:text-teal-400 font-mono-num mt-1 block">
            {impacto.acrescimoPercentualHora > 0
              ? `+${formatNumeroPt(impacto.acrescimoPercentualHora)}% vs divisor 220 (${formatMoeda(impacto.custoHoraPorFuncionario220)})`
              : 'Mesmo divisor (220)'}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400 block">
            Folha bruta mensal ({impacto.numFuncionarios} colab.)
          </span>
          <span className="text-xl font-bold font-mono-num text-slate-900 dark:text-slate-100 mt-1 block">
            {formatMoeda(impacto.folhaMensalBaseTotal)}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            Salário base mantido sem redução (RN-04)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400 block">
            Horas mensais da equipe
          </span>
          <span className="text-xl font-bold font-mono-num text-slate-900 dark:text-slate-100 mt-1 block">
            {formatNumeroPt(impacto.horasTotaisEquipeEtapa)} h/mês
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
            Redução de {formatNumeroPt(impacto.horasReduzidasEquipeMes)} h/mês vs 44h
          </span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/70">
          <span className="text-xs text-amber-800 dark:text-amber-300 block">
            Custo se mantiver 44h via hora extra (+50%)
          </span>
          <span className="text-xl font-bold font-mono-num text-amber-950 dark:text-amber-100 mt-1 block">
            + {formatMoeda(impacto.custoReposicaoHorasExtrasMes)}/mês
          </span>
          <span className="text-xs text-amber-700 dark:text-amber-400 mt-1 block">
            Economia ao readequar turnos para {entrada.etapa}h
          </span>
        </div>
      </div>

      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <strong className="text-slate-900 dark:text-slate-100">Nota para MEI, ME e EPP (RN-07):</strong> A Emenda Constitucional nº 141/2026 prevê que lei complementar poderá instituir medidas transitórias e mecanismos de apoio fiscal/trabalhista para microempreendedores individuais, microempresas e empresas de pequeno porte, condicionados à manutenção do nível de emprego.
      </div>
    </section>
  );
};
