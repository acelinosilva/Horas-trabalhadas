/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { calcularSimulacao, EntradaSimulacao } from './utils/calculos';
import { DEFAULT_ENTRADA, parseHashToEntrada, buildShareableUrl } from './utils/url-state';
import { SimuladorForm } from './components/SimuladorForm';
import { ResultadosPainel } from './components/ResultadosPainel';
import { ComparadorEscalas, PainelEmpregador } from './components/ModosExtras';
import { ConteudoEditorial } from './components/ConteudoEditorial';
import { SALARIO_MINIMO_2026 } from './utils/config';
import { EscalaId, getEscalaPreset } from './utils/escalas';
import { NOTICIAS_EC141 } from './utils/noticias-ec141';
import { BrandLogo } from './components/BrandLogo';
import { NoticiaPagina } from './components/NoticiaPagina';
import {
  PaginaSobre,
  PaginaPoliticaUso,
  PaginaContato,
} from './components/PaginasInstitucionais';

type AbaFerramenta = 'simulador' | 'comparador' | 'empregador';

type RotaAtiva =
  | { tipo: 'home' }
  | { tipo: 'sobre' }
  | { tipo: 'politica-de-uso' }
  | { tipo: 'contato' }
  | { tipo: 'noticia'; slug: string };

function lerRotaDoHash(): RotaAtiva {
  if (typeof window === 'undefined') return { tipo: 'home' };
  const h = window.location.hash;
  if (h === '#/sobre') return { tipo: 'sobre' };
  if (h === '#/politica-de-uso') return { tipo: 'politica-de-uso' };
  if (h === '#/contato') return { tipo: 'contato' };
  if (h.startsWith('#/noticia/')) {
    const slug = decodeURIComponent(h.replace('#/noticia/', '').trim());
    return { tipo: 'noticia', slug };
  }
  return { tipo: 'home' };
}

export default function App() {
  const [entrada, setEntrada] = useState<EntradaSimulacao>(() => parseHashToEntrada());
  const [mostrarLiquido, setMostrarLiquido] = useState<boolean>(false);
  const [abaAtiva, setAbaAtiva] = useState<AbaFerramenta>('simulador');
  const [rota, setRota] = useState<RotaAtiva>(() => lerRotaDoHash());
  const [temaEscuro, setTemaEscuro] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [linkHeaderCopiado, setLinkHeaderCopiado] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (temaEscuro) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [temaEscuro]);

  useEffect(() => {
    const onHashChange = () => {
      const novaRota = lerRotaDoHash();
      setRota(novaRota);
      if (
        novaRota.tipo === 'home' &&
        window.location.hash.includes('s=')
      ) {
        setEntrada(parseHashToEntrada());
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const resultado = useMemo(() => calcularSimulacao(entrada), [entrada]);

  const navegarParaHome = (secaoId?: string) => {
    setRota({ tipo: 'home' });
    if (typeof window !== 'undefined') {
      if (secaoId) {
        window.history.pushState(null, '', `#${secaoId}`);
        setTimeout(() => {
          const el = document.getElementById(secaoId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 30);
      } else {
        window.history.pushState(null, '', window.location.pathname);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const navegarParaPagina = (novaRota: RotaAtiva) => {
    setRota(novaRota);
    if (typeof window !== 'undefined') {
      if (novaRota.tipo === 'sobre') window.location.hash = '#/sobre';
      else if (novaRota.tipo === 'politica-de-uso')
        window.location.hash = '#/politica-de-uso';
      else if (novaRota.tipo === 'contato') window.location.hash = '#/contato';
      else if (novaRota.tipo === 'noticia')
        window.location.hash = `#/noticia/${novaRota.slug}`;
      else window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleReset = () => {
    setEntrada({ ...DEFAULT_ENTRADA });
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleAplicarCenarioNoSimulador = (params: {
    escalaId: EscalaId;
    etapa: 44 | 42 | 40;
    horasTurno?: number;
  }) => {
    const preset = getEscalaPreset(params.escalaId);
    setEntrada((prev) => ({
      ...prev,
      escalaId: preset.id,
      W: preset.diasTrabalho,
      R: preset.diasFolga,
      H: params.horasTurno ?? preset.horasTurno,
      etapa: params.etapa,
    }));
    setAbaAtiva('simulador');
    setRota({ tipo: 'home' });
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#simulador');
      setTimeout(() => {
        const el = document.getElementById('simulador');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 30);
    }
  };

  const handleShareHeader = async () => {
    const url = buildShareableUrl(entrada);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', url);
    }
    try {
      await navigator.clipboard.writeText(url);
      setLinkHeaderCopiado(true);
      setTimeout(() => setLinkHeaderCopiado(false), 2200);
    } catch {
      setLinkHeaderCopiado(true);
      setTimeout(() => setLinkHeaderCopiado(false), 2200);
    }
  };

  const noticiaAtiva = useMemo(() => {
    if (rota.tipo !== 'noticia') return undefined;
    return (
      NOTICIAS_EC141.find((n) => n.slug === rota.slug || n.id === rota.slug) ||
      NOTICIAS_EC141[0]
    );
  }, [rota]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFA] dark:bg-[#0B1517] text-slate-900 dark:text-slate-100">
      {/* Top Bar Contract: 3 Zonas separadas por gap-8 */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0E1B1E]/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zona 1: Brand logo profissional + wordmark */}
          <BrandLogo
            onClick={() => {
              navegarParaHome();
            }}
          />

          {/* Zona 2: 5 links de navegação em linha única */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="#simulador"
              onClick={(e) => {
                e.preventDefault();
                navegarParaHome('simulador');
              }}
              className={`hover:text-teal-800 dark:hover:text-teal-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                rota.tipo === 'home' ? 'text-teal-800 dark:text-teal-300 font-semibold' : ''
              }`}
            >
              Simulador
            </a>
            <a
              href="#noticias"
              onClick={(e) => {
                e.preventDefault();
                navegarParaHome('noticias');
              }}
              className={`hover:text-teal-800 dark:hover:text-teal-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                rota.tipo === 'noticia' ? 'text-teal-800 dark:text-teal-300 font-semibold' : ''
              }`}
            >
              Notícias
            </a>
            <a
              href="#/sobre"
              onClick={(e) => {
                e.preventDefault();
                navegarParaPagina({ tipo: 'sobre' });
              }}
              className={`hover:text-teal-800 dark:hover:text-teal-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                rota.tipo === 'sobre' ? 'text-teal-800 dark:text-teal-300 font-semibold' : ''
              }`}
            >
              Sobre
            </a>
            <a
              href="#/politica-de-uso"
              onClick={(e) => {
                e.preventDefault();
                navegarParaPagina({ tipo: 'politica-de-uso' });
              }}
              className={`hover:text-teal-800 dark:hover:text-teal-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                rota.tipo === 'politica-de-uso'
                  ? 'text-teal-800 dark:text-teal-300 font-semibold'
                  : ''
              }`}
            >
              Política de Uso
            </a>
            <a
              href="#/contato"
              onClick={(e) => {
                e.preventDefault();
                navegarParaPagina({ tipo: 'contato' });
              }}
              className={`hover:text-teal-800 dark:hover:text-teal-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                rota.tipo === 'contato' ? 'text-teal-800 dark:text-teal-300 font-semibold' : ''
              }`}
            >
              Contato
            </a>
          </nav>

          {/* Zona 3: 1 ação primária */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleShareHeader}
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              {linkHeaderCopiado ? 'Link Copiado!' : 'Compartilhar Simulação'}
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal Dinâmico conforme Página Ativa */}
      <main
        id="simulador"
        className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8"
      >
        {rota.tipo === 'noticia' && noticiaAtiva ? (
          <NoticiaPagina
            noticia={noticiaAtiva}
            onVoltarHome={() => navegarParaHome('noticias')}
            onAbrirOutraNoticia={(slug) =>
              navegarParaPagina({ tipo: 'noticia', slug })
            }
            onAplicarCenarioNoSimulador={handleAplicarCenarioNoSimulador}
          />
        ) : rota.tipo === 'sobre' ? (
          <PaginaSobre onVoltarHome={() => navegarParaHome()} />
        ) : rota.tipo === 'politica-de-uso' ? (
          <PaginaPoliticaUso onVoltarHome={() => navegarParaHome()} />
        ) : rota.tipo === 'contato' ? (
          <PaginaContato onVoltarHome={() => navegarParaHome()} />
        ) : (
          <>
            {/* Cabeçalho do Simulador e Barra de Modo/Tema */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    Emenda Constitucional nº 141/2026 (PEC 221/2019 e PEC 8/2025)
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Promulgada em 16/10/2026</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">
                    Salário Mínimo R${' '}
                    {SALARIO_MINIMO_2026.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
                  Simulador de Escala de Trabalho e Valor da Hora
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Verifique em segundos se sua escala (6x1, 5x2, 12x36 e outras) respeita os limites de cada etapa da EC 141/2026, os dois descansos semanais e calcule o novo valor da sua hora sem redução salarial.
                </p>
              </div>

              {/* Controles do Workspace: Seletor de Modo + Alternador de Tema */}
              <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-end gap-2.5 shrink-0">
                <div
                  role="tablist"
                  aria-label="Modo de visualização do simulador"
                  className="grid grid-cols-3 sm:flex items-center gap-1 p-1 w-full sm:w-auto bg-slate-200/70 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={abaAtiva === 'simulador'}
                    onClick={() => setAbaAtiva('simulador')}
                    className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate ${
                      abaAtiva === 'simulador'
                        ? 'bg-white dark:bg-[#16292E] text-slate-900 dark:text-white shadow-2xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Trabalhador
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={abaAtiva === 'comparador'}
                    onClick={() => setAbaAtiva('comparador')}
                    className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate ${
                      abaAtiva === 'comparador'
                        ? 'bg-white dark:bg-[#16292E] text-slate-900 dark:text-white shadow-2xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Comparar 2
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={abaAtiva === 'empregador'}
                    onClick={() => setAbaAtiva('empregador')}
                    className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate ${
                      abaAtiva === 'empregador'
                        ? 'bg-white dark:bg-[#16292E] text-slate-900 dark:text-white shadow-2xs font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    RH / Empresa
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setTemaEscuro(!temaEscuro)}
                  aria-label={temaEscuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-200 hover:border-teal-600 transition-colors whitespace-nowrap shrink-0"
                >
                  {temaEscuro ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      Tema Claro
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-teal-800" />
                      Tema Escuro
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Layout Principal: Formulário à esquerda (360px) e Resultados à direita */}
            <div className="mt-6 flex flex-col lg:flex-row items-start gap-6">
              <SimuladorForm
                entrada={entrada}
                onChange={setEntrada}
                onReset={handleReset}
                mostrarLiquido={mostrarLiquido}
                onToggleLiquido={setMostrarLiquido}
              />

              <div className="flex-1 min-w-0 w-full space-y-6">
                {abaAtiva === 'comparador' && (
                  <ComparadorEscalas entradaBase={entrada} />
                )}
                {abaAtiva === 'empregador' && (
                  <PainelEmpregador entrada={entrada} />
                )}

                <ResultadosPainel
                  entrada={entrada}
                  resultado={resultado}
                  mostrarLiquido={mostrarLiquido}
                />

                {abaAtiva === 'simulador' && (
                  <div className="grid grid-cols-1 gap-6">
                    <ComparadorEscalas entradaBase={entrada} />
                    <PainelEmpregador entrada={entrada} />
                  </div>
                )}
              </div>
            </div>

            {/* Seções Editoriais: Notícias SEO, Linha do Tempo, Regras RN-01..09, FAQ, Glossário e Fontes */}
            <ConteudoEditorial
              onAbrirNoticia={(slug) =>
                navegarParaPagina({ tipo: 'noticia', slug })
              }
              onAplicarCenarioNoSimulador={handleAplicarCenarioNoSimulador}
            />
          </>
        )}
      </main>

      {/* Rodapé Institucional com Créditos Acewebsites */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1B1E] mt-12 py-8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <BrandLogo
                size="sm"
                onClick={() => {
                  navegarParaHome();
                }}
              />
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">
                |
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Simulador e Notícias da Emenda Constitucional nº 141/2026 (PEC 221/2019 e PEC 8/2025)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-600 dark:text-slate-300">
              <a
                href="#simulador"
                onClick={(e) => {
                  e.preventDefault();
                  navegarParaHome('simulador');
                }}
                className="hover:text-teal-700 dark:hover:text-teal-300 hover:underline"
              >
                Simulador
              </a>
              <a
                href="#noticias"
                onClick={(e) => {
                  e.preventDefault();
                  navegarParaHome('noticias');
                }}
                className="hover:text-teal-700 dark:hover:text-teal-300 hover:underline"
              >
                Notícias EC 141
              </a>
              <a
                href="#/sobre"
                onClick={(e) => {
                  e.preventDefault();
                  navegarParaPagina({ tipo: 'sobre' });
                }}
                className="hover:text-teal-700 dark:hover:text-teal-300 hover:underline"
              >
                Sobre
              </a>
              <a
                href="#/politica-de-uso"
                onClick={(e) => {
                  e.preventDefault();
                  navegarParaPagina({ tipo: 'politica-de-uso' });
                }}
                className="hover:text-teal-700 dark:hover:text-teal-300 hover:underline"
              >
                Política de Uso
              </a>
              <a
                href="#/contato"
                onClick={(e) => {
                  e.preventDefault();
                  navegarParaPagina({ tipo: 'contato' });
                }}
                className="hover:text-teal-700 dark:hover:text-teal-300 hover:underline"
              >
                Contato
              </a>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div>
              © {new Date().getFullYear()} Horas Trabalhadas. Todos os direitos reservados, Criado por{' '}
              <a
                href="https://www.acewebsites.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-700 dark:text-teal-400 hover:underline"
              >
                Acewebsites
              </a>
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              Cálculo 100% local no navegador · Em conformidade com a LGPD
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
