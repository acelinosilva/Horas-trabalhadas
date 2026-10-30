import React, { useMemo, useState } from 'react';
import {
  Newspaper,
  Search,
  ArrowUpRight,
  Calculator,
  X,
} from 'lucide-react';
import {
  NOTICIAS_EC141,
  filtrarNoticiasEC141,
} from '../utils/noticias-ec141';
import { EscalaId } from '../utils/escalas';

interface NoticiasSecaoProps {
  onAbrirNoticia: (slug: string) => void;
  onAplicarCenarioNoSimulador: (params: {
    escalaId: EscalaId;
    etapa: 44 | 42 | 40;
    horasTurno?: number;
  }) => void;
}

const CATEGORIAS_FILTRO = [
  'Todas',
  'Congresso e Legislação',
  'Escala 6x1 vs 5x2',
  'Escala 12x36',
  'Valor da Hora e Folha',
  'Empregadores e MEI/EPP',
] as const;

export const NoticiasSecao: React.FC<NoticiasSecaoProps> = ({
  onAbrirNoticia,
  onAplicarCenarioNoSimulador,
}) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('Todas');
  const [busca, setBusca] = useState<string>('');

  const noticiasFiltradas = useMemo(
    () => filtrarNoticiasEC141(categoriaAtiva, busca),
    [categoriaAtiva, busca]
  );

  // Schema.org JSON-LD para ItemList + NewsArticle (invisível ao usuário, apenas para buscadores)
  const jsonLdNoticias = useMemo(() => {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Notícias e Análises sobre a Emenda Constitucional nº 141/2026 (PEC 221/2019 e PEC 8/2025)',
      description:
        'Cobertura completa da Emenda Constitucional nº 141/2026 assinada pelo Congresso Nacional em 16 de outubro de 2026: transição para 42h e 40h, fim da 6x1 sem compensação, 12x36 e divisores 210 e 200.',
      itemListElement: NOTICIAS_EC141.map((noticia, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
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
        },
      })),
    });
  }, []);

  return (
    <section
      id="noticias"
      aria-labelledby="heading-noticias-seo"
      className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-6"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdNoticias }}
      />

      {/* Cabeçalho Editorial da Seção de Notícias */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-teal-700 dark:text-teal-400 font-medium">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Central de Notícias e Guias Práticos</span>
            <span aria-hidden="true">·</span>
            <span>Promulgação no Congresso Nacional em 16/10/2026</span>
            <span aria-hidden="true">·</span>
            <span>Origem: PEC 221/2019 e PEC 8/2025</span>
          </div>
          <h2
            id="heading-noticias-seo"
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 text-balance"
          >
            Notícias Importantes sobre a Emenda Constitucional nº 141/2026
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Acompanhe as análises jurídicas e contábeis sobre a EC 141/2026 (resultante da PEC 221/2019 e da PEC 8/2025), assinada pelo Congresso Nacional em 16 de outubro de 2026. Clique em qualquer matéria para abrir o artigo completo em uma página dedicada.
          </p>
        </div>

        {/* Busca por palavras-chave */}
        <div className="w-full lg:w-72 shrink-0">
          <label htmlFor="input-busca-noticias" className="sr-only">
            Buscar notícias sobre a EC 141/2026
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="input-busca-noticias"
              type="search"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar PEC 221, PEC 8, 12x36, divisor..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            {busca && (
              <button
                type="button"
                onClick={() => setBusca('')}
                aria-label="Limpar busca de notícias"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filtros de Categoria (Botões funcionais interativos) */}
      <div
        role="group"
        aria-label="Filtrar notícias por tema da EC 141/2026"
        className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/90 rounded-lg border border-slate-200/70 dark:border-slate-800"
      >
        {CATEGORIAS_FILTRO.map((cat) => {
          const ativo = categoriaAtiva === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaAtiva(cat)}
              aria-pressed={ativo}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                ativo
                  ? 'bg-white dark:bg-[#16292E] text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {noticiasFiltradas.length === 0 ? (
        <div className="p-8 text-center rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Nenhuma matéria encontrada para os filtros selecionados.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategoriaAtiva('Todas');
              setBusca('');
            }}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
          >
            Mostrar todas as notícias da EC 141/2026
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {noticiasFiltradas.map((noticia, idx) => {
            const isDestaque = idx === 0 && categoriaAtiva === 'Todas' && !busca;
            return (
              <article
                key={noticia.id}
                data-testid={`noticia-card-${noticia.id}`}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-colors ${
                  isDestaque
                    ? 'md:col-span-2 lg:col-span-2 bg-teal-50/50 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800'
                    : 'bg-slate-50/80 dark:bg-slate-900/50 border-slate-200/90 dark:border-slate-800 hover:border-teal-600/60 dark:hover:border-teal-600/60'
                }`}
              >
                <div className="space-y-2.5">
                  {/* Metadados em texto limpo com separadores tipográficos */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-teal-800 dark:text-teal-300">
                      {noticia.categoria}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={noticia.dataISO}>{noticia.dataPublicacao}</time>
                    <span aria-hidden="true">·</span>
                    <span>{noticia.tempoLeitura}</span>
                  </div>

                  <h3
                    className={`${
                      isDestaque ? 'text-lg sm:text-xl' : 'text-base'
                    } font-bold text-slate-900 dark:text-slate-100 leading-snug`}
                  >
                    <a
                      href={`#/noticia/${noticia.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onAbrirNoticia(noticia.slug);
                      }}
                      className="hover:text-teal-800 dark:hover:text-teal-300 focus:outline-none focus:underline"
                    >
                      {noticia.titulo}
                    </a>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {noticia.resumoMeta}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      onAplicarCenarioNoSimulador(noticia.simulacaoRelacionada)
                    }
                    className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 font-medium whitespace-nowrap"
                  >
                    <Calculator className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                    {noticia.simulacaoRelacionada.rotuloBotao}
                  </button>

                  <a
                    href={`#/noticia/${noticia.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onAbrirNoticia(noticia.slug);
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-teal-700 dark:text-teal-400 hover:underline whitespace-nowrap shrink-0"
                  >
                    Ler matéria completa
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
