import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Scale,
  BookOpen,
  CalendarClock,
  HelpCircle,
  ShieldAlert,
} from 'lucide-react';
import {
  FAQ_ITEMS,
  FONTES_REFERENCIA,
  GLOSSARIO_ITEMS,
  REGRAS_NEGOCIO,
  ULTIMA_ATUALIZACAO,
} from '../utils/config';
import { EscalaId } from '../utils/escalas';
import { NoticiasSecao } from './NoticiasSecao';

interface ConteudoEditorialProps {
  onAbrirNoticia: (slug: string) => void;
  onAplicarCenarioNoSimulador: (params: {
    escalaId: EscalaId;
    etapa: 44 | 42 | 40;
    horasTurno?: number;
  }) => void;
}

export const ConteudoEditorial: React.FC<ConteudoEditorialProps> = ({
  onAbrirNoticia,
  onAplicarCenarioNoSimulador,
}) => {
  const [faqAberto, setFaqAberto] = useState<number | null>(0);
  const [filtroFaq, setFiltroFaq] = useState<'Todos' | 'Trabalhador' | 'Escalas' | 'Empregador e RH'>('Todos');

  const faqsFiltrados =
    filtroFaq === 'Todos' ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.categoria === filtroFaq);

  return (
    <div className="space-y-10 pt-6">
      {/* 0. Seção de Notícias Importantes e Otimizadas para SEO (EC 141/2026 · PEC 221/2019 · PEC 8/2025) */}
      <NoticiasSecao
        onAbrirNoticia={onAbrirNoticia}
        onAplicarCenarioNoSimulador={onAplicarCenarioNoSimulador}
      />
      {/* 1. Linha do Tempo da Transição EC 141/2026 (RF-10) */}
      <section
        id="transicao"
        aria-labelledby="heading-transicao"
        className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6"
      >
        <div className="max-w-3xl space-y-1.5">
          <div className="text-xs font-medium text-teal-700 dark:text-teal-400">
            Cronograma Constitucional · Art. 7º, XIII e XV
          </div>
          <h2
            id="heading-transicao"
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100"
          >
            Linha do Tempo da Transição da EC 141/2026
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A redução da jornada semanal de 44 h para 40 h ocorre em duas etapas progressivas, acompanhada da garantia de dois repousos semanais remunerados e proibição de redução salarial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Marco 1 */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono-num font-semibold text-slate-800 dark:text-slate-200">
                16/10/2026
              </span>
              <span>Divisor 220</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              01. Promulgação da EC 141/2026
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Publicação oficial da emenda. Até o início da 1ª etapa, permanece o limite de 44 h semanais e 1 repouso semanal remunerado, enquanto empresas e sindicatos ajustam escalas.
            </p>
          </div>

          {/* Marco 2 */}
          <div className="p-5 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-300 dark:border-teal-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-teal-800 dark:text-teal-300">
              <span className="font-mono-num font-semibold">
                16/12/2026*
              </span>
              <span>Divisor 210 (+4,76%/h)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              02. 1ª Etapa: 42 h e 2 Repousos
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Jornada máxima cai para 42 h semanais e passam a valer dois repousos semanais remunerados (art. 7º, XV). Cláusulas coletivas incompatíveis perdem efeito.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              *Nota: Há fontes jurídicas que citam 15/12/2026 para o início da 1ª etapa.
            </p>
          </div>

          {/* Marco 3 */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono-num font-semibold text-emerald-700 dark:text-emerald-400">
                Até Dez/2027 (14 meses)
              </span>
              <span>Divisor 200 (+10%/h)</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              03. 2ª Etapa: Limite Final de 40 h
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Em até 14 meses da publicação, consolida-se o teto de 8 h diárias e 40 h semanais com divisor 200 e dois descansos semanais remunerados, sem redução salarial.
            </p>
          </div>
        </div>
      </section>

      {/* 2. O Que Você Precisa Saber — Regras RN-01 a RN-09 (RF-10) */}
      <section
        id="regras"
        aria-labelledby="heading-regras"
        className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6"
      >
        <div className="max-w-3xl space-y-1.5">
          <div className="text-xs font-medium text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
            <CalendarClock className="w-3.5 h-3.5" />
            Base Legal e Regras de Negócio
          </div>
          <h2
            id="heading-regras"
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100"
          >
            O Que Você Precisa Saber Sobre a EC 141/2026
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Resumo direto das nove diretrizes centrais da Emenda Constitucional nº 141/2026 para trabalhadores, profissionais de RH, contadores e pequenos empresários.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REGRAS_NEGOCIO.map((regra) => (
            <article
              key={regra.codigo}
              className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono-num font-semibold text-teal-700 dark:text-teal-400">
                    {regra.codigo}
                  </span>
                  {regra.requerConfirmacao && (
                    <span className="text-[11px] text-amber-700 dark:text-amber-400">
                      Sujeito à regulamentação / texto integral
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {regra.titulo}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {regra.descricao}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Perguntas Frequentes (FAQ em Sanfona · RF-13) + Glossário (Seção 13) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section
          id="faq"
          aria-labelledby="heading-faq"
          className="lg:col-span-7 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2
                id="heading-faq"
                className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"
              >
                <HelpCircle className="w-5 h-5 text-teal-700 dark:text-teal-400" />
                Perguntas Frequentes (FAQ)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Respostas rápidas sobre valor da hora, escalas e transição
              </p>
            </div>

            <div
              role="group"
              aria-label="Filtrar perguntas frequentes"
              className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg"
            >
              {(['Todos', 'Trabalhador', 'Escalas', 'Empregador e RH'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setFiltroFaq(cat);
                    setFaqAberto(0);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    filtroFaq === cat
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800">
            {faqsFiltrados.map((item, idx) => {
              const aberto = faqAberto === idx;
              return (
                <div key={item.pergunta} className="py-3.5">
                  <button
                    type="button"
                    onClick={() => setFaqAberto(aberto ? null : idx)}
                    aria-expanded={aberto}
                    className="w-full flex items-start justify-between gap-4 text-left"
                  >
                    <div>
                      <span className="text-[11px] text-teal-700 dark:text-teal-400 font-medium block">
                        {item.categoria}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {item.pergunta}
                      </span>
                    </div>
                    {aberto ? (
                      <ChevronUp className="w-4 h-4 shrink-0 text-slate-500 mt-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 shrink-0 text-slate-500 mt-1" />
                    )}
                  </button>
                  {aberto && (
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.resposta}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Glossário (Seção 13 do PRD) */}
        <section
          aria-labelledby="heading-glossario"
          className="lg:col-span-5 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
        >
          <div>
            <h2
              id="heading-glossario"
              className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 text-teal-700 dark:text-teal-400" />
              Glossário Trabalhista
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Termos essenciais usados nos cálculos de escala e folha
            </p>
          </div>

          <dl className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {GLOSSARIO_ITEMS.map((g) => (
              <div key={g.termo} className="py-3 first:pt-1 last:pb-0">
                <dt className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {g.termo}
                </dt>
                <dd className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                  {g.definicao}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* 4. Aviso Legal e Fontes Visíveis (RF-11) */}
      <section
        id="fontes"
        aria-labelledby="heading-aviso-legal"
        className="bg-slate-100/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-2">
            <h2
              id="heading-aviso-legal"
              className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Aviso Legal e Privacidade (LGPD)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Este simulador tem caráter exclusivamente educativo e informativo. Os valores calculados representam <strong>estimativas brutas</strong> baseadas nas fórmulas gerais da legislação trabalhista e nas regras de transição da Emenda Constitucional nº 141/2026. Não substitui folha de pagamento oficial, cálculo pericial nem consultoria jurídica ou contábil. Convenções e acordos coletivos de cada categoria podem prever regras, divisores e adicionais próprios.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <strong>100% Privado:</strong> Nenhum salário ou dado informado é enviado para servidores externos; todos os cálculos ocorrem localmente no seu navegador. Última atualização das regras e parâmetros: <span className="font-mono-num">{ULTIMA_ATUALIZACAO}</span>.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              Fontes e Referências Consultadas
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              {FONTES_REFERENCIA.map((f) => (
                <li key={f.nome} className="flex items-center justify-between gap-2">
                  <span>{f.nome}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                    {f.tipo}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
