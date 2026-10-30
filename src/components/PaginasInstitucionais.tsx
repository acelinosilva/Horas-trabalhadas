import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Scale,
  Users,
  Mail,
  Send,
  FileText,
  Lock,
  Calculator,
} from 'lucide-react';
import { SALARIO_MINIMO_2026, ULTIMA_ATUALIZACAO } from '../utils/config';

interface PaginaInstitucionalProps {
  onVoltarHome: () => void;
}

export const PaginaSobre: React.FC<PaginaInstitucionalProps> = ({ onVoltarHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const prev = document.title;
    document.title = 'Sobre o Horas Trabalhadas — Simulador EC 141/2026';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div data-testid="pagina-sobre" className="space-y-8 py-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          type="button"
          onClick={onVoltarHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 hover:border-teal-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao Simulador
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Institucional · Atualizado em {ULTIMA_ATUALIZACAO}
        </span>
      </div>

      <article className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-10 space-y-8">
        <header className="max-w-3xl space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="text-xs font-semibold text-teal-700 dark:text-teal-400">
            Sobre a Plataforma · Horas Trabalhadas
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 text-balance">
            Transparência e precisão no cálculo das escalas da Emenda Constitucional nº 141/2026
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            O <strong>Horas Trabalhadas</strong> nasceu para traduzir, em menos de 30 segundos, as regras de transição da Emenda Constitucional nº 141/2026 (originada da PEC 221/2019 e da PEC 8/2025 e promulgada pelo Congresso Nacional em 16 de outubro de 2026) para trabalhadores, profissionais de RH, contadores e pequenos empresários.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-2">
            <Calculator className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Cálculo Instantâneo e Aberto
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Todas as fórmulas — divisores 220, 210 e 200, horas extras, adicional noturno, valor por hora efetiva e ganho de tempo livre anual — seguem estritamente os parâmetros constitucionais e trabalhistas de 2026.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-2">
            <Users className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Feito para Todos os Perfis
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Atende desde o trabalhador em escala 6x1 ou plantão 12x36 até departamentos pessoais, escritórios de contabilidade e micro e pequenas empresas (MEI, ME e EPP) que planejam suas escalas.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 space-y-2">
            <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Privacidade desde a Origem
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Sem cadastro, sem coleta de salários e sem armazenamento em banco de dados externo. Todo o processamento ocorre 100% localmente no dispositivo do usuário.
            </p>
          </div>
        </div>

        <section className="space-y-4 pt-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Nossa Metodologia de Cálculo
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            O simulador utiliza o salário mínimo oficial de 2026 (R$ {SALARIO_MINIMO_2026.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, conforme Decreto nº 12.797/2025) e modela cada escala a partir do ciclo de dias de trabalho ($W$), dias de folga ($R$) e horas efetivas por turno ($H$). A partir desses dados, verifica automaticamente as seis regras de alerta da EC 141/2026: limite semanal da etapa (44 h, 42 h ou 40 h), mínimo de dois repousos semanais remunerados a partir de dezembro de 2026, limite diário de 8 horas e particularidades do regime 12x36.
          </p>
        </section>
      </article>
    </div>
  );
};

export const PaginaPoliticaUso: React.FC<PaginaInstitucionalProps> = ({ onVoltarHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const prev = document.title;
    document.title = 'Política de Uso e Privacidade — Horas Trabalhadas';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div data-testid="pagina-politica-uso" className="space-y-8 py-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          type="button"
          onClick={onVoltarHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 hover:border-teal-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao Simulador
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Termos de Uso e LGPD · Vigência: Outubro de 2026
        </span>
      </div>

      <article className="bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-10 space-y-7">
        <header className="max-w-3xl space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="text-xs font-semibold text-teal-700 dark:text-teal-400">
            Transparência Legal e Proteção de Dados
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Política de Uso, Isenção de Responsabilidade e Privacidade (LGPD)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Ao utilizar o simulador e o portal de notícias <strong>Horas Trabalhadas</strong>, você concorda com os termos descritos abaixo.
          </p>
        </header>

        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              1. Caráter Educativo e Informativo (Estimativa Bruta)
            </h2>
            <p>
              Todos os cálculos realizados pela ferramenta possuem finalidade estritamente educativa, informativa e de simulação prévia. Os valores apresentados correspondem a estimativas brutas fundamentadas na Emenda Constitucional nº 141/2026 e nas regras gerais da Consolidação das Leis do Trabalho (CLT).
            </p>
            <p>
              O resultado do simulador <strong>não constitui parecer jurídico, laudo pericial contábil nem recibo oficial de folha de pagamento</strong>. Convenções Coletivas de Trabalho (CCT) e Acordos Coletivos (ACT) de cada categoria profissional podem estabelecer divisores, adicionais e regimes de compensação específicos.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              2. Privacidade e Conformidade com a LGPD (Lei nº 13.709/2018)
            </h2>
            <p>
              O <strong>Horas Trabalhadas</strong> opera sob o princípio de privacidade máxima (<em>Privacy by Design</em>):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Processamento 100% local:</strong> Os valores de salário, escalas e horas extras digitados no formulário são processados exclusivamente na memória do seu navegador.
              </li>
              <li>
                <strong>Sem banco de dados de salários:</strong> Não coletamos, não transmitimos e não armazenamos dados salariais ou trabalhistas individuais em servidores externos.
              </li>
              <li>
                <strong>Links compartilháveis:</strong> Quando você utiliza o botão "Compartilhar Simulação", os parâmetros numéricos são codificados apenas no endereço (hash) do próprio link copiado por você.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              3. Atualização Legislativa e Fontes
            </h2>
            <p>
              As regras de transição da EC 141/2026 (incluindo leis complementares futuras sobre regimes diferenciados e medidas transitórias para MEI, ME e EPP) estão sujeitas a regulamentação infraconstitucional e interpretação dos tribunais trabalhistas. Recomendamos sempre consultar o sindicato da sua categoria, um profissional de contabilidade ou advogado trabalhista antes de tomar decisões contratuais definitivas.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export const PaginaContato: React.FC<PaginaInstitucionalProps> = ({ onVoltarHome }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('Trabalhador');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const prev = document.title;
    document.title = 'Contato — Horas Trabalhadas (EC 141/2026)';
    return () => {
      document.title = prev;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      setErro('Por favor, preencha seu nome, e-mail e mensagem antes de enviar.');
      return;
    }
    setErro('');
    setEnviado(true);
  };

  return (
    <div data-testid="pagina-contato" className="space-y-8 py-2">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          type="button"
          onClick={onVoltarHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 hover:border-teal-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar ao Simulador
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Canal de Atendimento e Sugestões
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-teal-700 dark:text-teal-400">
              Fale Conosco
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Entre em Contato com a Equipe Horas Trabalhadas
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Envie sugestões de novas escalas, dúvidas sobre as fórmulas da Emenda Constitucional nº 141/2026 ou solicitações de parceria editorial e contábil.
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-slate-900 dark:text-slate-100">
                  E-mail institucional
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  contato@horastrabalhadas.com.br
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-100 block mb-1">
                Nota importante:
              </strong>
              Não realizamos consultoria jurídica individualizada nem cálculos de rescisão trabalhista. Para casos concretos, procure o sindicato da sua categoria ou um advogado trabalhista.
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-[#112024] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8">
          {enviado ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Mensagem enviada com sucesso!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Obrigado pelo seu contato, <strong>{nome}</strong>. Recebemos sua mensagem e nossa equipe técnica analisará sua contribuição em breve.
              </p>
              <button
                type="button"
                onClick={() => {
                  setNome('');
                  setEmail('');
                  setMensagem('');
                  setEnviado(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Formulário de Contato e Sugestões
              </h2>

              {erro && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-200"
                >
                  {erro}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contato-nome"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
                  >
                    Seu nome
                  </label>
                  <input
                    id="contato-nome"
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex.: Maria Silva"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contato-email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
                  >
                    Seu e-mail
                  </label>
                  <input
                    id="contato-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com.br"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contato-perfil"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
                >
                  Qual é o seu perfil?
                </label>
                <select
                  id="contato-perfil"
                  value={perfil}
                  onChange={(e) => setPerfil(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="Trabalhador">Trabalhador (Comércio, Serviços, Indústria, Saúde)</option>
                  <option value="Profissional de RH / DP">Analista de RH / Departamento Pessoal</option>
                  <option value="Contador / Consultor">Contador / Consultor Trabalhista</option>
                  <option value="Empresário (MEI / ME / EPP)">Empresário (MEI / ME / EPP)</option>
                  <option value="Imprensa / Outros">Imprensa / Outros</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contato-mensagem"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1"
                >
                  Mensagem ou sugestão
                </label>
                <textarea
                  id="contato-mensagem"
                  rows={4}
                  required
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Descreva sua dúvida sobre o simulador ou sugestão de melhoria..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
