import React, { useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  Calculator,
  Calendar,
  Clock,
  Share2,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { NOTICIAS_EC141, NoticiaSEO } from '../utils/noticias-ec141';
import { EscalaId } from '../utils/escalas';

interface NoticiaPaginaProps {
  noticia: NoticiaSEO;
  onVoltarHome: () => void;
  onAbrirOutraNoticia: (slug: string) => void;
  onAplicarCenarioNoSimulador: (params: {
    escalaId: EscalaId;
    etapa: 44 | 42 | 40;
    horasTurno?: number;
  }) => void;
}

export const NoticiaPagina: React.FC<NoticiaPaginaProps> = ({
  noticia,
  onVoltarHome,
  onAbrirOutraNoticia,
  onAplicarCenarioNoSimulador,
}) => {
  const [copiado, setCopiado] = React.useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const prevTitle = document.title;
    document.title = `${noticia.titulo} | Horas Trabalhadas`;
    return () => {
      document.title = prevTitle;
    };
  }, [noticia]);

  const outrasNoticias = useMemo(
    () => NOTICIAS_EC141.filter((n) => n.id !== noticia.id),
    [noticia.id]
  );

  const jsonLdArtigo = useMemo(() => {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: noticia.titulo,
      description: noticia.resumoMeta,
      datePublished: noticia.dataISO,
      dateModified: '2026-10-30',
      articleSection: noticia.categoria,
      keywords: noticia.palavrasChave.join(', '),
      author: {
        '@type': 'Organization',
        name: 'Horas Trabalhadas — Observatório EC 141/2026',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Horas Trabalhadas',
      },
    });
  }, [noticia]);

  const handleCompartilhar = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/noticia/${noticia.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    }
  };

  return (
    <div className="space-y-8 py-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdArtigo }}
      />

      {/* Barra de retorno e trilha de navegação */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onVoltarHome}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 hover:border-teal-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao Simulador
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Notícias EC 141/2026</span>
            <span aria-hidden="true">/</span>
            <span className="text-teal-700 dark:text-teal-400 font-medium">
              {noticia.categoria}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCompartilhar}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          {copiado ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Link da notícia copiado
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              Compartilhar matéria
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Corpo Principal da Notícia (8 colunas) */}
        <article
          data-testid="pagina-artigo-completo"
          className="lg:col-span-8 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-10 space-y-8"
        >
          <header className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            {/* Metadados limpos sem pílulas */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-teal-700 dark:text-teal-400">
                {noticia.categoria}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={noticia.dataISO}>{noticia.dataPublicacao}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {noticia.tempoLeitura}
              </span>
              <span aria-hidden="true">·</span>
              <span>{noticia.origemLegislativa}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight text-balance">
              {noticia.titulo}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {noticia.resumoMeta}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BookOpenCheck className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                Fonte consultada: <strong className="font-medium text-slate-700 dark:text-slate-200">{noticia.fonteReferencia}</strong>
              </span>

              <button
                type="button"
                onClick={() =>
                  onAplicarCenarioNoSimulador(noticia.simulacaoRelacionada)
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Calculator className="w-4 h-4" />
                {noticia.simulacaoRelacionada.rotuloBotao}
              </button>
            </div>
          </header>

          {/* Seções do artigo */}
          <div className="space-y-8">
            {noticia.secoes.map((sec) => (
              <section key={sec.subtitulo} className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  {sec.subtitulo}
                </h2>

                {sec.paragrafos.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    {p}
                  </p>
                ))}

                {sec.destaqueDados && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                    {sec.destaqueDados.map((dado) => (
                      <div
                        key={dado.rotulo}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800"
                      >
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {dado.rotulo}
                        </div>
                        <div className="text-lg font-bold font-mono-num text-teal-800 dark:text-teal-300 mt-1">
                          {dado.valor}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {dado.detalhe}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Chamada final para ação no simulador (sem exibir Tópicos indexados nem URL semântica) */}
          <div className="p-5 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Quer calcular o impacto exato no seu salário?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Aplique este cenário diretamente na calculadora gratuita da EC 141/2026.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onAplicarCenarioNoSimulador(noticia.simulacaoRelacionada)
              }
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Calculator className="w-4 h-4" />
              {noticia.simulacaoRelacionada.rotuloBotao}
            </button>
          </div>
        </article>

        {/* Coluna Lateral: Outras Notícias sobre a EC 141/2026 (4 colunas) */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Mais Notícias da EC 141/2026
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {outrasNoticias.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-teal-700 dark:text-teal-400">
                      {item.categoria}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.dataPublicacao}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    <a
                      href={`#/noticia/${item.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onAbrirOutraNoticia(item.slug);
                      }}
                      className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                    >
                      {item.titulo}
                    </a>
                  </h3>
                  <div>
                    <a
                      href={`#/noticia/${item.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onAbrirOutraNoticia(item.slug);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline"
                    >
                      Ler matéria
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
