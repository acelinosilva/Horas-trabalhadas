import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Copy,
  Check,
  Share2,
  Printer,
  Calendar,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { EntradaSimulacao, ResultadoSimulacao, formatMoeda } from '../utils/calculos';
import { formatNumeroPt } from '../utils/regras-ec141';
import { SALARIO_MINIMO_2026 } from '../utils/config';
import { getEscalaPreset } from '../utils/escalas';
import { buildShareableUrl } from '../utils/url-state';

interface ResultadosPainelProps {
  entrada: EntradaSimulacao;
  resultado: ResultadoSimulacao;
  mostrarLiquido: boolean;
}

export const ResultadosPainel: React.FC<ResultadosPainelProps> = ({
  entrada,
  resultado,
  mostrarLiquido,
}) => {
  const [copiadoResumo, setCopiadoResumo] = useState(false);
  const [copiadoLink, setCopiadoLink] = useState(false);

  const presetInfo = getEscalaPreset(entrada.escalaId);
  const percentualBarra = Math.min(
    100,
    Math.round((resultado.jornadaSemanal / Math.max(resultado.limiteEtapa, 48)) * 100)
  );
  const posicaoMarcadorLimite = Math.round(
    (resultado.limiteEtapa / Math.max(resultado.limiteEtapa, 48)) * 100
  );

  const handleCopiarResumo = async () => {
    const linhas = [
      `Resumo da Simulação — Horas Trabalhadas (EC 141/2026)`,
      `Escala: ${presetInfo.nome} (${entrada.W}d trabalho × ${entrada.R}d folga · ${formatNumeroPt(entrada.H)}h/turno)`,
      `Etapa: Limite de ${resultado.limiteEtapa} h/semana (Divisor ${resultado.divisor})`,
      `Salário Base: ${formatMoeda(resultado.salarioBase)}`,
      `Valor da Hora Normal: ${formatMoeda(resultado.valorHora)} | Hora Extra (+50%): ${formatMoeda(resultado.horaExtra50Unit)}`,
      `Jornada Média: ${formatNumeroPt(resultado.jornadaSemanal)} h/semana | Folga Média: ${formatNumeroPt(resultado.folgaSemanal)} dias/semana`,
      `Remuneração Bruta Estimada: ${formatMoeda(resultado.brutoEstimado)}`,
      `Status: ${resultado.alertas.map((a) => `${a.id}: ${a.titulo}`).join(' | ')}`,
    ];
    try {
      await navigator.clipboard.writeText(linhas.join('\n'));
      setCopiadoResumo(true);
      setTimeout(() => setCopiadoResumo(false), 2500);
    } catch {
      setCopiadoResumo(true);
      setTimeout(() => setCopiadoResumo(false), 2500);
    }
  };

  const handleCompartilharLink = async () => {
    const url = buildShareableUrl(entrada);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', url);
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiadoLink(true);
      setTimeout(() => setCopiadoLink(false), 2500);
    } catch {
      setCopiadoLink(true);
      setTimeout(() => setCopiadoLink(false), 2500);
    }
  };

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* 1. Destaque Principal: Valor da Hora, Bruto Estimado, Jornada Média, Folga Média */}
      <section
        aria-label="Resultados principais da simulação"
        className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Escala {presetInfo.nome}</span>
              <span aria-hidden="true">·</span>
              <span>Etapa {resultado.limiteEtapa} h/semana</span>
              <span aria-hidden="true">·</span>
              <span>Divisor {resultado.divisor}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              Resultado da Simulação e Valor da Hora
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopiarResumo}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {copiadoResumo ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Resumo copiado
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar resumo
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCompartilharLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {copiadoLink ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Link copiado
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  Link da simulação
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Imprimir ou salvar como PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              Exportar PDF
            </button>
          </div>
        </div>

        {/* 4 Métricas Âncora */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1: Valor da Hora (Elemento de maior destaque conforme Seção 6) */}
          <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80">
            <div className="text-xs font-medium text-teal-800 dark:text-teal-300">
              Valor da hora normal (÷{resultado.divisor})
            </div>
            <div
              data-testid="metric-valor-hora"
              className="text-2xl sm:text-3xl font-bold font-mono-num text-teal-950 dark:text-teal-100 mt-1"
            >
              {formatMoeda(resultado.valorHora)}
            </div>
            <div className="text-xs text-teal-700 dark:text-teal-400 mt-1">
              Hora efetiva: {formatMoeda(resultado.valorHoraEfetiva)}/h
            </div>
          </div>

          {/* Card 2: Remuneração Bruta Estimada */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Remuneração bruta estimada
            </div>
            <div
              data-testid="metric-bruto-estimado"
              className="text-2xl font-bold font-mono-num text-slate-900 dark:text-slate-100 mt-1"
            >
              {formatMoeda(resultado.brutoEstimado)}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Base {formatMoeda(resultado.salarioBase)} + adicionais
            </div>
          </div>

          {/* Card 3: Jornada Média Semanal */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Jornada média semanal
            </div>
            <div
              data-testid="metric-jornada-semanal"
              className="text-2xl font-bold font-mono-num text-slate-900 dark:text-slate-100 mt-1"
            >
              {formatNumeroPt(resultado.jornadaSemanal)} h
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {formatNumeroPt(resultado.horasPorMes)} h/mês ({formatNumeroPt(resultado.turnosPorSemana)} turnos/sem)
            </div>
          </div>

          {/* Card 4: Folga Média Semanal */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Folga média por semana
            </div>
            <div
              data-testid="metric-folga-semanal"
              className="text-2xl font-bold font-mono-num text-emerald-700 dark:text-emerald-400 mt-1"
            >
              {formatNumeroPt(resultado.folgaSemanal)} {resultado.folgaSemanal === 1 ? 'dia' : 'dias'}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {resultado.ganhoTempoLivreAnual > 0
                ? `+${formatNumeroPt(resultado.ganhoTempoLivreAnual)} h livres/ano vs 44h`
                : 'Sem redução sobre 44h/sem'}
            </div>
          </div>
        </div>

        {/* Barra de Jornada vs Limite da Etapa (RF-07 + requisito de aria-label da Seção 5) */}
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Comparativo: Jornada semanal ({formatNumeroPt(resultado.jornadaSemanal)} h) vs. Limite da etapa ({resultado.limiteEtapa} h)
            </span>
            <span className="font-mono-num font-semibold text-slate-800 dark:text-slate-200">
              {resultado.excessoSemanal > 0
                ? `Excesso de +${formatNumeroPt(resultado.excessoSemanal)} h/sem`
                : `Respeita o limite (${formatNumeroPt(resultado.limiteEtapa - resultado.jornadaSemanal)} h de margem)`}
            </span>
          </div>

          <div
            role="meter"
            aria-label={`Barra de jornada semanal: ${formatNumeroPt(resultado.jornadaSemanal)} horas de um limite de ${resultado.limiteEtapa} horas semanais`}
            aria-valuenow={resultado.jornadaSemanal}
            aria-valuemin={0}
            aria-valuemax={resultado.limiteEtapa}
            className="relative h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-700"
          >
            <div
              style={{ width: `${percentualBarra}%` }}
              className={`h-full transition-all duration-150 ${
                resultado.excessoSemanal > 0
                  ? 'bg-amber-600 dark:bg-amber-500'
                  : 'bg-emerald-600 dark:bg-emerald-500'
              }`}
            />
            <div
              style={{ left: `${posicaoMarcadorLimite}%` }}
              title={`Limite da etapa: ${resultado.limiteEtapa}h`}
              className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white"
            />
          </div>
        </div>

        {/* Detalhamento de Horas Extras, Noturno e Domingos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-500 dark:text-slate-400 block">
              Hora extra (+{entrada.percentualExtraCustom || 50}%)
            </span>
            <span className="font-mono-num font-semibold text-slate-900 dark:text-slate-100">
              {formatMoeda(resultado.horaExtra50Unit)}/h
            </span>
            {entrada.horasExtras > 0 && (
              <span className="block text-[11px] text-teal-700 dark:text-teal-400 font-mono-num">
                Total: + {formatMoeda(resultado.totalExtras50)}
              </span>
            )}
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block">
              Domingos/Feriados (+100%)
            </span>
            <span className="font-mono-num font-semibold text-slate-900 dark:text-slate-100">
              {formatMoeda(resultado.horaExtra100Unit)}/h
            </span>
            {entrada.horasDomFeriado > 0 && (
              <span className="block text-[11px] text-teal-700 dark:text-teal-400 font-mono-num">
                Total: + {formatMoeda(resultado.totalDomFeriado)}
              </span>
            )}
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block">
              Adicional noturno (+{entrada.percentualNoturnoCustom || 20}%)
            </span>
            <span className="font-mono-num font-semibold text-slate-900 dark:text-slate-100">
              + {formatMoeda(resultado.adicionalNoturnoUnit)}/h
            </span>
            {entrada.horasNoturnas > 0 && (
              <span className="block text-[11px] text-teal-700 dark:text-teal-400 font-mono-num">
                Total: + {formatMoeda(resultado.totalNoturno)}
              </span>
            )}
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block">
              Ganho de tempo livre vs 44h
            </span>
            <span className="font-mono-num font-semibold text-emerald-700 dark:text-emerald-400">
              {formatNumeroPt(resultado.ganhoTempoLivreAnual)} h/ano
            </span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">
              Equivale a {formatNumeroPt(resultado.ganhoTempoLivreAnual / 8, 1)} dias de 8h
            </span>
          </div>
        </div>

        {/* Painel opcional de INSS e IRPF (RF-19) */}
        {mostrarLiquido && (
          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">
                INSS Progressivo Estimado
              </span>
              <span className="font-mono-num font-semibold text-slate-800 dark:text-slate-200">
                - {formatMoeda(resultado.estimativaInss)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">
                IRPF Estimado (Desc. Simplificado)
              </span>
              <span className="font-mono-num font-semibold text-slate-800 dark:text-slate-200">
                - {formatMoeda(resultado.estimativaIrpf)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">
                Salário Líquido Referencial
              </span>
              <span className="font-mono-num font-bold text-teal-800 dark:text-teal-300">
                {formatMoeda(resultado.liquidoEstimado)}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* 2. Alertas de Conformidade (RF-06 · Seção 3.3) */}
      <section aria-label="Diagnóstico de conformidade EC 141/2026" className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Diagnóstico da Escala na EC 141/2026
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {resultado.alertas.map((alerta) => {
            const estilos = {
              danger:
                'bg-red-50/70 dark:bg-red-950/30 border-red-200 dark:border-red-900/70 text-red-950 dark:text-red-100',
              warning:
                'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/70 text-amber-950 dark:text-amber-100',
              info:
                'bg-sky-50/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900/70 text-sky-950 dark:text-sky-100',
              success:
                'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/70 text-emerald-950 dark:text-emerald-100',
            }[alerta.severidade];

            const Icone = {
              danger: AlertTriangle,
              warning: AlertTriangle,
              info: Info,
              success: CheckCircle2,
            }[alerta.severidade];

            const corIcone = {
              danger: 'text-red-600 dark:text-red-400',
              warning: 'text-amber-600 dark:text-amber-400',
              info: 'text-sky-600 dark:text-sky-400',
              success: 'text-emerald-600 dark:text-emerald-400',
            }[alerta.severidade];

            return (
              <div
                key={alerta.id}
                data-testid={`alerta-${alerta.id}`}
                className={`p-4 rounded-xl border ${estilos} flex items-start gap-3`}
              >
                <Icone className={`w-5 h-5 shrink-0 mt-0.5 ${corIcone}`} aria-hidden="true" />
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono-num font-semibold opacity-75">
                      {alerta.id}
                    </span>
                    <span aria-hidden="true" className="opacity-50">
                      ·
                    </span>
                    <h4 className="text-sm font-semibold">{alerta.titulo}</h4>
                  </div>
                  <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                    {alerta.mensagem}
                  </p>
                  <p className="text-[11px] opacity-75 pt-0.5">{alerta.fundamento}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Tabela Comparativa do Valor da Hora nas Três Etapas (RF-09) */}
      <section
        aria-label="Tabela do valor da hora nas três etapas"
        className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              Evolução do Valor da Hora nas 3 Etapas (Vedação de Redução Salarial)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comparativo entre o seu salário ({formatMoeda(resultado.salarioBase)}) e o salário mínimo de 2026 ({formatMoeda(SALARIO_MINIMO_2026)})
            </p>
          </div>
        </div>

        <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 pr-4 font-semibold">Etapa / Vigência</th>
                <th className="py-2.5 px-3 font-semibold text-right">Divisor</th>
                <th className="py-2.5 px-3 font-semibold text-right">Sua Hora Normal</th>
                <th className="py-2.5 px-3 font-semibold text-right">Sua Extra (+50%)</th>
                <th className="py-2.5 px-3 font-semibold text-right">Valorização</th>
                <th className="py-2.5 pl-3 font-semibold text-right">Hora Sal. Mínimo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
              {resultado.tabelaEtapas.map((item) => {
                const selecionada = item.etapa === resultado.limiteEtapa;
                return (
                  <tr
                    key={item.etapa}
                    className={
                      selecionada
                        ? 'bg-teal-50/60 dark:bg-teal-950/30 font-medium'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-900/40'
                    }
                  >
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>{item.titulo}</span>
                        {selecionada && (
                          <span className="text-[11px] font-normal text-teal-700 dark:text-teal-400">
                            (Etapa selecionada)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.subtitulo}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono-num text-slate-700 dark:text-slate-300">
                      {item.divisor} h
                    </td>
                    <td className="py-3 px-3 text-right font-mono-num font-semibold text-slate-900 dark:text-slate-100">
                      {formatMoeda(item.valorHoraUsuario)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono-num text-slate-700 dark:text-slate-300">
                      {formatMoeda(item.horaExtra50Usuario)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono-num text-emerald-700 dark:text-emerald-400">
                      {item.ganhoPercentualHora > 0
                        ? `+${formatNumeroPt(item.ganhoPercentualHora)}%`
                        : 'Base'}
                    </td>
                    <td className="py-3 pl-3 text-right font-mono-num text-slate-600 dark:text-slate-400">
                      {formatMoeda(item.valorHoraMinimo)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Calendário Ilustrativo de 4 Semanas (RF-08) */}
      <section
        aria-label="Calendário ilustrativo de 4 semanas"
        className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              Calendário Ilustrativo de 4 Semanas (28 dias)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Visualização do ciclo de {entrada.W} {entrada.W === 1 ? 'dia' : 'dias'} de trabalho por {entrada.R} {entrada.R === 1 ? 'dia' : 'dias'} de descanso ({formatNumeroPt(entrada.H)} h por turno)
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-teal-700 dark:bg-teal-600 inline-block" />
              <span className="text-slate-700 dark:text-slate-300">
                Trabalho ({resultado.calendario4Semanas.filter((d) => d.trabalha).length} dias)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-600/20 dark:bg-emerald-500/25 border border-emerald-600/50 inline-block" />
              <span className="text-slate-700 dark:text-slate-300">
                Folga RSR ({resultado.calendario4Semanas.filter((d) => !d.trabalha).length} dias)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((diaNome) => (
            <div
              key={diaNome}
              className="text-center text-[11px] font-semibold text-slate-500 dark:text-slate-400 py-1"
            >
              {diaNome}
            </div>
          ))}

          {resultado.calendario4Semanas.map((dia) => (
            <div
              key={dia.diaNumero}
              className={`p-2 sm:p-2.5 rounded-lg border text-center transition-colors ${
                dia.trabalha
                  ? 'bg-teal-700 dark:bg-teal-800/90 border-teal-800 dark:border-teal-700 text-white'
                  : 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200'
              }`}
            >
              <div className="text-[10px] opacity-75 font-mono-num">Dia {dia.diaNumero}</div>
              <div className="text-xs font-bold mt-0.5">
                {dia.trabalha ? 'Trab.' : 'Folga'}
              </div>
              <div className="text-[10px] font-mono-num mt-0.5 opacity-90">
                {dia.trabalha ? `${formatNumeroPt(dia.horas)}h` : 'Descanso'}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            Em 4 semanas (28 dias), esta escala soma{' '}
            <strong className="font-mono-num text-slate-700 dark:text-slate-200">
              {formatNumeroPt(
                resultado.calendario4Semanas.reduce((acc, c) => acc + c.horas, 0)
              )}{' '}
              horas trabalhadas
            </strong>{' '}
            e{' '}
            <strong className="font-mono-num text-emerald-700 dark:text-emerald-400">
              {resultado.calendario4Semanas.filter((d) => !d.trabalha).length} dias de descanso
            </strong>
            .
          </span>
        </div>
      </section>
    </div>
  );
};
