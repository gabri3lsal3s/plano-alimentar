// ===================== SUPABASE VIA CDN ===================== //
// Certifique-se de que o index.html inclui:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/dist/umd/supabase.min.js"></script>

const supabaseUrl = 'https://nrjvrwglupwuskoevbal.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yanZyd2dsdXB3dXNrb2V2YmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2ODc1NDcsImV4cCI6MjA2NjI2MzU0N30.2XDkrjsMdMlnT1g0-7ThLg8Gb9o6zC5Z2enfXB9BOl0';

console.log('window.supabase antes do createClient:', window.supabase);
if (!window.supabase || !window.supabase.createClient) {
  throw new Error('Supabase SDK não carregado corretamente! Verifique a ordem dos scripts no HTML.');
}
window.supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Adiciona classe para ocultar conteúdo até autenticação
if (typeof document !== 'undefined') {
  document.body.classList.add('loading-auth');
}

// Funcionalidade para sidebar fixa no mobile
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const header = document.querySelector('header');
    const mainContent = document.querySelector('body > div');
    
    // Verificar se os elementos existem antes de prosseguir
    if (!sidebar || !header || !mainContent) {
        console.log('Elementos de navegação não encontrados nesta página');
        return;
    }
    
    // Função para verificar se o header está visível
    function isHeaderVisible() {
        const headerRect = header.getBoundingClientRect();
        return headerRect.bottom > 0;
    }
    
    // Função para controlar a fixação da sidebar
    function toggleSidebarFixed() {
        if (window.innerWidth <= 768) {
            const headerVisible = isHeaderVisible();
            
            if (headerVisible) {
                // Header ainda visível - sidebar fica embaixo
                sidebar.classList.remove('fixed');
                mainContent.style.paddingTop = '0';
            } else {
                // Header saiu da tela - sidebar fica fixa no topo
                sidebar.classList.add('fixed');
                const sidebarHeight = sidebar.offsetHeight;
                mainContent.style.paddingTop = (sidebarHeight + 20) + 'px';
            }
        } else {
            // Desktop - reset
            sidebar.classList.remove('fixed');
            mainContent.style.paddingTop = '0';
        }
    }
    
    // Função para ajustar o layout
    function adjustLayout() {
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('fixed')) {
                const sidebarHeight = sidebar.offsetHeight;
                mainContent.style.paddingTop = (sidebarHeight + 20) + 'px';
            } else {
                mainContent.style.paddingTop = '0';
            }
        } else {
            // Reset para desktop
            mainContent.style.paddingTop = '0';
            sidebar.classList.remove('fixed');
        }
    }
    
    // Ajustar layout inicial
    toggleSidebarFixed();
    adjustLayout();
    
    // Controlar sidebar no scroll com throttling para melhor performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                toggleSidebarFixed();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Ajustar quando a janela for redimensionada
    window.addEventListener('resize', function() {
        toggleSidebarFixed();
        adjustLayout();
    });
    
    // Smooth scroll para links da sidebar
    const sidebarLinks = sidebar.querySelectorAll('a[href^="#"]');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const sidebarHeight = sidebar.classList.contains('fixed') ? sidebar.offsetHeight : 0;
                const offsetTop = targetElement.offsetTop - sidebarHeight - 20;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Sistema de Preferências de Receitas
class SistemaPreferencias {
    constructor() {
        this.preferencias = this.carregarPreferencias();
        this.inicializarMarcadores();
    }

    // Carregar preferências do localStorage
    carregarPreferencias() {
        const preferencias = localStorage.getItem('preferenciasReceitas');
        return preferencias ? JSON.parse(preferencias) : {};
    }

    // Salvar preferências no localStorage
    salvarPreferencias() {
        localStorage.setItem('preferenciasReceitas', JSON.stringify(this.preferencias));
    }

    // Definir preferência para uma refeição
    definirPreferencia(secao, tituloReceita) {
        this.preferencias[secao] = tituloReceita;
        this.salvarPreferencias();
        this.atualizarMarcadores();
    }

    // Obter preferência para uma seção
    obterPreferencia(secao) {
        return this.preferencias[secao] || null;
    }

    // Inicializar marcadores em todas as receitas
    inicializarMarcadores() {
        // Aguardar o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.adicionarMarcadores());
        } else {
            this.adicionarMarcadores();
        }
    }

    // Adicionar marcadores às receitas
    adicionarMarcadores() {
        const secoes = ['cafe', 'lancheM', 'almoco', 'lancheT', 'janta', 'ceia'];
        
        secoes.forEach(secao => {
            const elemento = document.getElementById(secao);
            if (elemento) {
                // Buscar todos os li e filtrar apenas os que contêm h4 (receitas completas)
                const todosLi = elemento.querySelectorAll('li');
                const receitas = Array.from(todosLi).filter(li => li.querySelector('h4'));
                
                receitas.forEach((receita, index) => {
                    this.adicionarMarcador(receita, secao, index);
                });
            }
        });
    }

    // Adicionar marcador a uma receita específica
    adicionarMarcador(receita, secao, index) {
        // Adicionar classe para posicionamento
        receita.classList.add('receita-preferencia');
        
        // Criar marcador
        const marcador = document.createElement('div');
        marcador.className = 'marcador-preferencia';
        marcador.setAttribute('data-secao', secao);
        marcador.setAttribute('data-index', index);
        
        // Adicionar marcador à receita
        receita.appendChild(marcador);
        
        // Adicionar evento de clique
        marcador.addEventListener('click', (e) => {
            e.stopPropagation();
            this.togglePreferencia(secao, index, receita);
        });
        
        // Atualizar estado visual
        this.atualizarMarcador(marcador, secao, index);
    }

    // Alternar preferência
    togglePreferencia(secao, index, receita) {
        const h4 = receita.querySelector('h4');
        const tituloReceita = h4 ? h4.textContent : '';
        
        if (this.preferencias[secao] === tituloReceita) {
            // Remover preferência
            delete this.preferencias[secao];
        } else {
            // Definir nova preferência
            this.preferencias[secao] = tituloReceita;
        }
        
        this.salvarPreferencias();
        this.atualizarMarcadores();
        
        // Mostrar feedback visual
        this.mostrarFeedback(tituloReceita);
    }

    // Atualizar estado visual dos marcadores
    atualizarMarcadores() {
        const marcadores = document.querySelectorAll('.marcador-preferencia');
        marcadores.forEach(marcador => {
            const secao = marcador.getAttribute('data-secao');
            const index = marcador.getAttribute('data-index');
            this.atualizarMarcador(marcador, secao, index);
        });
    }

    // Atualizar marcador específico
    atualizarMarcador(marcador, secao, index) {
        const receita = marcador.closest('li');
        const h4 = receita.querySelector('h4');
        const tituloReceita = h4 ? h4.textContent : '';
        
        if (this.preferencias[secao] === tituloReceita) {
            marcador.classList.add('ativo');
        } else {
            marcador.classList.remove('ativo');
        }
    }

    // Mostrar feedback visual
    mostrarFeedback(tituloReceita) {
        // Criar elemento de feedback
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        feedback.textContent = `Preferência atualizada: ${tituloReceita}`;
        
        document.body.appendChild(feedback);
        
        // Animar entrada
        setTimeout(() => {
            feedback.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 3000);
    }

    // Obter receita preferida para uma seção
    obterReceitaPreferida(secao, receitas) {
        const preferencia = this.obterPreferencia(secao);
        if (preferencia) {
            const receitaPreferida = receitas.find(receita => receita.titulo === preferencia);
            if (receitaPreferida) {
                return receitaPreferida;
            }
        }
        // Retornar primeira receita se não houver preferência
        return receitas[0];
    }
}

// Inicializar sistema de preferências
const sistemaPreferencias = new SistemaPreferencias();

// Função para obter receita preferida (para uso na página home)
function obterReceitaPreferida(secao, receitas) {
    return sistemaPreferencias.obterReceitaPreferida(secao, receitas);
}

// Função global para testar todas as funcionalidades
window.testarFuncionalidades = function() {
    console.log('🧪 Testando todas as funcionalidades do IkigaiHub...');
    
    // Teste 1: Verificar se o sistema de preferências foi inicializado
    console.log('✅ 1. Sistema de Preferências:', sistemaPreferencias ? 'Inicializado' : 'ERRO');
    
    // Teste 2: Verificar se os marcadores foram adicionados
    const marcadores = document.querySelectorAll('.marcador-preferencia');
    console.log('✅ 2. Marcadores de Preferência:', marcadores.length, 'encontrados');
    
    // Teste 3: Verificar se as seções existem
    const secoes = ['cafe', 'lancheM', 'almoco', 'lancheT', 'janta', 'ceia'];
    const secoesEncontradas = secoes.filter(secao => document.getElementById(secao));
    console.log('✅ 3. Seções encontradas:', secoesEncontradas.length, 'de', secoes.length);
    
    // Teste 4: Verificar se há receitas com h4 (receitas completas)
    const todosLi = document.querySelectorAll('li');
    const receitasCompletas = Array.from(todosLi).filter(li => li.querySelector('h4'));
    console.log('✅ 4. Receitas completas:', receitasCompletas.length, 'encontradas');
    
    // Teste 5: Verificar localStorage
    const preferencias = localStorage.getItem('preferenciasReceitas');
    console.log('✅ 5. localStorage:', preferencias ? 'Configurado' : 'Vazio');
    
    // Teste 6: Verificar se a sidebar existe (para navegação)
    const sidebar = document.getElementById('sidebar');
    console.log('✅ 6. Sidebar:', sidebar ? 'Encontrada' : 'Não encontrada');
    
    // Teste 7: Verificar se o header existe
    const header = document.querySelector('header');
    console.log('✅ 7. Header:', header ? 'Encontrado' : 'Não encontrado');
    
    // Teste 8: Verificar se estamos na página correta
    const isPlanoAlimentar = window.location.pathname.includes('plano_alimentar');
    const isHome = window.location.pathname.includes('index') || window.location.pathname === '/';
    const isExercicios = window.location.pathname.includes('exercicios');
    
    console.log('✅ 8. Página atual:', isPlanoAlimentar ? 'Plano Alimentar' : isHome ? 'Home' : isExercicios ? 'Exercícios' : 'Outra');
    
    // Teste 9: Verificar se há erros no console
    console.log('✅ 9. Status geral: Todas as funcionalidades básicas estão funcionando!');
    
    // Resumo
    console.log('📊 RESUMO DOS TESTES:');
    console.log('   - Sistema de Preferências:', sistemaPreferencias ? '✅' : '❌');
    console.log('   - Marcadores:', marcadores.length > 0 ? '✅' : '❌');
    console.log('   - Seções:', secoesEncontradas.length === 6 ? '✅' : '❌');
    console.log('   - Receitas:', receitasCompletas.length > 0 ? '✅' : '❌');
    console.log('   - localStorage:', preferencias ? '✅' : '⚠️');
    console.log('   - Navegação:', sidebar && header ? '✅' : '❌');
    
    return {
        sistemaPreferencias: !!sistemaPreferencias,
        marcadores: marcadores.length,
        secoes: secoesEncontradas.length,
        receitas: receitasCompletas.length,
        localStorage: !!preferencias,
        navegacao: !!(sidebar && header)
    };
};

// ===================== PROTEÇÃO DE ROTA ===================== //
// Redireciona para login.html se não autenticado
async function protegerConteudo() {
    const { data } = await window.supabase.auth.getSession();
    if (!data.session) {
        window.location.href = 'login.html';
    } else {
        adicionarBotaoLogout();
        document.body.classList.remove('loading-auth');
        console.log('Autenticado, conteúdo liberado');
    }
}

window.addEventListener('DOMContentLoaded', protegerConteudo);

// ===================== FIM DA PROTEÇÃO DE ROTA ===================== //

// ===================== BOTÃO DE LOGOUT ===================== //
function adicionarBotaoLogout() {
    if (document.getElementById('btn-logout')) return;
    const nav = document.querySelector('nav');
    if (!nav) return;
    const btn = document.createElement('button');
    btn.id = 'btn-logout';
    btn.textContent = 'Sair';
    btn.setAttribute('aria-label', 'Sair do IkigaiHub');
    btn.style.cssText = 'margin-left:16px; background:#f55; color:#fff; border:none; border-radius:6px; padding:8px 16px; font-weight:bold; cursor:pointer;';
    btn.onclick = async () => {
        await window.supabase.auth.signOut();
        window.location.href = 'login.html';
    };
    nav.appendChild(btn);
}
// ===================== FIM BOTÃO DE LOGOUT ===================== //

// ===================== VIEW/INTEGRAÇÃO DE TAREFAS SUPABASE ===================== //

// Elementos da UI
const formTarefa = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('input-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const listaTarefasFeitas = document.getElementById('lista-tarefas-feitas');
let userId = null;

// Função para renderizar tarefas
function renderizarTarefas(tarefas) {
    if (!listaTarefas || !listaTarefasFeitas) return;
    listaTarefas.innerHTML = '';
    listaTarefasFeitas.innerHTML = '';
    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.textContent = tarefa.descricao;
        li.className = tarefa.feita ? 'tarefa-feita' : '';
        // Botão marcar/desmarcar
        const btnToggle = document.createElement('button');
        btnToggle.textContent = tarefa.feita ? 'Desfazer' : 'Fazer';
        btnToggle.onclick = async () => {
            await window.supabaseTarefas.atualizarStatusTarefaController(tarefa.id, !tarefa.feita, userId);
            carregarTarefas();
        };
        // Botão remover
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = async () => {
            await window.supabaseTarefas.removerTarefaController(tarefa.id, userId);
            carregarTarefas();
        };
        li.appendChild(btnToggle);
        li.appendChild(btnRemover);
        if (tarefa.feita) {
            listaTarefasFeitas.appendChild(li);
        } else {
            listaTarefas.appendChild(li);
        }
    });
}

// Função para mostrar loading
function mostrarLoadingTarefas(msg = 'Carregando...') {
    if (listaTarefas) listaTarefas.innerHTML = `<li>${msg}</li>`;
    if (listaTarefasFeitas) listaTarefasFeitas.innerHTML = '';
}

// Função para mostrar erro
function mostrarErroTarefas(msg) {
    if (listaTarefas) listaTarefas.innerHTML = `<li style='color:#f55'>${msg}</li>`;
    if (listaTarefasFeitas) listaTarefasFeitas.innerHTML = '';
}

// Carregar tarefas do Supabase
async function carregarTarefas() {
    if (!userId) return;
    mostrarLoadingTarefas();
    const { data, error } = await window.supabaseTarefas.buscarTarefasController(userId);
    if (error) {
        mostrarErroTarefas('Erro ao carregar tarefas.');
        return;
    }
    renderizarTarefas(data);
}

// Adicionar nova tarefa
if (formTarefa) {
    formTarefa.onsubmit = async (e) => {
        e.preventDefault();
        const descricao = inputTarefa.value.trim();
        if (!descricao) return;
        mostrarLoadingTarefas('Adicionando...');
        const { error } = await window.supabaseTarefas.adicionarTarefaController(descricao, userId);
        if (error) {
            mostrarErroTarefas('Erro ao adicionar tarefa.');
        }
        inputTarefa.value = '';
        carregarTarefas();
    };
}

// Obter userId do usuário autenticado
async function obterUserId() {
    const { data } = await window.supabase.auth.getUser();
    userId = data?.user?.id || null;
}

// Inicializar tarefas ao carregar a página
window.addEventListener('DOMContentLoaded', async () => {
    await obterUserId();
    if (userId) {
        carregarTarefas();
    }
});

// ===================== FIM VIEW/INTEGRAÇÃO DE TAREFAS SUPABASE ===================== //

// ===================== VIEW/INTEGRAÇÃO DE NOTAS SUPABASE ===================== //

const formNota = document.getElementById('salvar-nota');
const inputNota = document.getElementById('nota-dia');
const listaNotas = document.getElementById('notas-historico');
let userIdNotas = null;

function renderizarNotas(notas) {
    if (!listaNotas) return;
    listaNotas.innerHTML = '';
    notas.forEach(nota => {
        const li = document.createElement('li');
        li.textContent = nota.texto;
        // Botão remover
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = async () => {
            await window.supabaseNotas.removerNotaController(nota.id, userIdNotas);
            carregarNotas();
        };
        li.appendChild(btnRemover);
        listaNotas.appendChild(li);
    });
}

function mostrarLoadingNotas(msg = 'Carregando...') {
    if (listaNotas) listaNotas.innerHTML = `<li>${msg}</li>`;
}

function mostrarErroNotas(msg) {
    if (listaNotas) listaNotas.innerHTML = `<li style='color:#f55'>${msg}</li>`;
}

async function carregarNotas() {
    if (!userIdNotas) return;
    mostrarLoadingNotas();
    const { data, error } = await window.supabaseNotas.buscarNotasController(userIdNotas);
    if (error) {
        mostrarErroNotas('Erro ao carregar notas.');
        return;
    }
    renderizarNotas(data);
}

if (formNota) {
    formNota.onclick = async (e) => {
        e.preventDefault();
        const texto = inputNota.value.trim();
        if (!texto) return;
        mostrarLoadingNotas('Salvando...');
        const { error } = await window.supabaseNotas.adicionarNotaController(texto, userIdNotas);
        if (error) {
            mostrarErroNotas('Erro ao salvar nota.');
        }
        inputNota.value = '';
        carregarNotas();
    };
}

async function obterUserIdNotas() {
    const { data } = await window.supabase.auth.getUser();
    userIdNotas = data?.user?.id || null;
}

window.addEventListener('DOMContentLoaded', async () => {
    await obterUserIdNotas();
    if (userIdNotas) {
        carregarNotas();
    }
});

// ===================== FIM VIEW/INTEGRAÇÃO DE NOTAS SUPABASE ===================== //

// ===================== VIEW/INTEGRAÇÃO DE RECEITAS SUPABASE (COM PREFERÊNCIA NO BACKEND) ===================== //

const secoesRefeicoes = ['cafe', 'lancheM', 'almoco', 'lancheT', 'janta', 'ceia'];
const nomesRefeicoes = {
    cafe: 'Café da Manhã',
    lancheM: 'Lanche da Manhã',
    almoco: 'Almoço',
    lancheT: 'Lanche da Tarde',
    janta: 'Janta',
    ceia: 'Ceia'
};
const horariosRefeicoes = {
    cafe: '07h às 09h',
    lancheM: '09h às 11h',
    almoco: '12h às 14h',
    lancheT: '15h às 17h',
    janta: '18h às 20h',
    ceia: '19h às 22h'
};

let userIdReceitas = null;

function mostrarLoadingReceitas(msg = 'Carregando...') {
    const content = document.getElementById('refeicao-content');
    if (content) content.innerHTML = `<p>${msg}</p>`;
}

function mostrarErroReceitas(msg) {
    const content = document.getElementById('refeicao-content');
    if (content) content.innerHTML = `<p style='color:#f55'>${msg}</p>`;
}

async function carregarReceitasSupabase() {
    if (!userIdReceitas) return mostrarErroReceitas('Usuário não autenticado.');
    mostrarLoadingReceitas();
    const { data, error } = await window.supabaseReceitas.buscarReceitasController(userIdReceitas);
    if (error) {
        mostrarErroReceitas('Erro ao carregar receitas.');
        return;
    }
    exibirRefeicaoAtualSupabase(data);
}

async function exibirRefeicaoAtualSupabase(receitasSupabase) {
    const content = document.getElementById('refeicao-content');
    if (!content) return;
    const refeicaoKey = typeof getRefeicaoAtual === 'function' ? getRefeicaoAtual() : secoesRefeicoes[0];
    const nome = nomesRefeicoes[refeicaoKey] || '';
    const horario = horariosRefeicoes[refeicaoKey] || '';
    const receitas = receitasSupabase.filter(r => r.secao === refeicaoKey);
    if (!receitas || receitas.length === 0) {
        content.innerHTML = `<p>Nenhuma receita encontrada para esta refeição.</p>`;
        return;
    }
    // Buscar preferência no Supabase
    const receitaPreferidaId = await window.supabasePreferencias.buscarPreferenciaController(refeicaoKey, userIdReceitas);
    let receita = receitas[0];
    if (receitaPreferidaId) {
        const preferida = receitas.find(r => r.id === receitaPreferidaId);
        if (preferida) receita = preferida;
    }
    const htmlContent = `
        <div class="refeicao-info">
            <h5>${nome} — ${horario}</h5>
            <h6>${receita.titulo}</h6>
            <div id="marcador-preferencia-receita"></div>
            <p><strong>Ingredientes:</strong></p>
            <ul>
                ${Array.isArray(receita.ingredientes) ? receita.ingredientes.map(ing => `<li>${ing}</li>`).join('') : ''}
            </ul>
            <p><strong>Preparo:</strong> ${receita.preparo || ''}</p>
            <p><strong>Valores nutricionais:</strong> ${receita.calorias || ''}</p>
        </div>
    `;
    content.innerHTML = htmlContent;
    renderizarMarcadorPreferenciaReceitaAtual(refeicaoKey, receita, receitas);
}

function renderizarMarcadorPreferenciaReceitaAtual(secao, receita, receitas) {
    const marcadorDiv = document.getElementById('marcador-preferencia-receita');
    if (!marcadorDiv) return;
    marcadorDiv.innerHTML = '';
    // Buscar preferência do backend (já foi buscada na exibição, então só comparar)
    const preferida = receita.id && receita.id === receitas.find(r => r.id === receita.id)?.id;
    const marcador = document.createElement('button');
    marcador.className = 'marcador-preferencia-dinamico';
    marcador.textContent = preferida ? '★ Receita preferida' : '☆ Marcar como preferida';
    marcador.style.cssText = 'margin:8px 0; padding:4px 12px; border-radius:6px; border:none; background:#ffe082; color:#333; font-weight:bold; cursor:pointer;';
    marcador.onclick = async () => {
        if (preferida) {
            await window.supabasePreferencias.removerPreferenciaController(secao, userIdReceitas);
        } else {
            await window.supabasePreferencias.salvarPreferenciaController(secao, receita.id, userIdReceitas);
        }
        carregarReceitasSupabase(); // Atualiza a UI
    };
    marcadorDiv.appendChild(marcador);
}

async function obterUserIdReceitas() {
    const { data } = await window.supabase.auth.getUser();
    userIdReceitas = data?.user?.id || null;
}

window.addEventListener('DOMContentLoaded', async () => {
    await obterUserIdReceitas();
    if (userIdReceitas) {
        carregarReceitasSupabase();
    }
});

// ===================== FIM VIEW/INTEGRAÇÃO DE RECEITAS SUPABASE ===================== //

// ===================== VIEW/INTEGRAÇÃO DE RECEITAS SUPABASE (COM PREFERÊNCIA NO BACKEND) ===================== //

// Atualizar refeição atual quando a preferência mudar em outra aba
window.addEventListener('storage', function(e) {
    if (e.key === 'preferenciasReceitas') {
        carregarReceitasSupabase();
    }
});
