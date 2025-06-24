// ===================== APLICAÇÃO PRINCIPAL ===================== //

import supabaseService from './services/SupabaseService.js';
import ReceitasPage from './views/pages/ReceitasPage.js';
import TarefasPage from './views/pages/TarefasPage.js';
import NotasPage from './views/pages/NotasPage.js';
import PreferenciasPage from './views/pages/PreferenciasPage.js';
import { addClass, removeClass, showElement, hideElement } from './utils/helpers.js';
import { MESSAGES } from './utils/constants.js';
import ReceitaController from './controllers/ReceitaController.js';

class App {
    constructor() {
        this.currentPage = null;
        this.isAuthenticated = false;
        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            // Adiciona classe de loading
            addClass(document.body, 'loading-auth');
            
            // Aguarda um pouco para garantir que o SDK do Supabase esteja carregado
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Verifica autenticação
            await this.checkAuth();
            
            // Inicializa funcionalidades comuns
            this.initCommonFeatures();
            
            // Inicializa página específica
            this.initCurrentPage();
            
        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
            this.handleInitError(error);
        } finally {
            // Remove classe de loading
            removeClass(document.body, 'loading-auth');
        }
    }

    /**
     * Verifica autenticação do usuário
     */
    async checkAuth() {
        try {
            this.isAuthenticated = await supabaseService.isAuthenticated();
            
            if (!this.isAuthenticated) {
                // Redireciona para login se não estiver autenticado
                if (window.location.pathname !== '/login.html') {
                    window.location.href = 'login.html';
                    return;
                }
            } else {
                // Se estiver na página de login e autenticado, redireciona para home
                if (window.location.pathname === '/login.html') {
                    window.location.href = 'index.html';
                    return;
                }
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            throw error;
        }
    }

    /**
     * Inicializa funcionalidades comuns a todas as páginas
     */
    initCommonFeatures() {
        // Sidebar fixa no mobile
        this.initSidebar();
        
        // Botão de logout
        this.initLogout();
        
        // Proteção de conteúdo
        this.protectContent();
    }

    /**
     * Inicializa a página atual
     */
    initCurrentPage() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('receitas.html')) {
            this.initReceitasPage();
        } else if (currentPath.includes('plano_alimentar.html')) {
            this.initReceitasPage();
        } else if (currentPath.includes('index.html') || currentPath === '/') {
            this.initDashboardPage();
        } else if (currentPath.includes('exercicios.html')) {
            this.initExerciciosPage();
        } else if (currentPath.includes('tarefas.html')) {
            this.initTarefasPage();
        } else if (currentPath.includes('notas.html')) {
            this.initNotasPage();
        } else if (currentPath.includes('preferencias.html')) {
            this.initPreferenciasPage();
        }
    }

    /**
     * Inicializa página de receitas
     */
    initReceitasPage() {
        try {
            this.currentPage = new ReceitasPage();
            console.log('Página de receitas inicializada');
        } catch (error) {
            console.error('Erro ao inicializar página de receitas:', error);
            this.showError('Erro ao carregar página de receitas');
        }
    }

    /**
     * Inicializa página de tarefas
     */
    initTarefasPage() {
        try {
            const container = document.getElementById('app-content') || document.body;
            TarefasPage(container);
            console.log('Página de tarefas inicializada');
        } catch (error) {
            console.error('Erro ao inicializar página de tarefas:', error);
            this.showError('Erro ao carregar página de tarefas');
        }
    }

    /**
     * Inicializa página de notas
     */
    initNotasPage() {
        try {
            const container = document.getElementById('app-content') || document.body;
            NotasPage(container);
            console.log('Página de notas inicializada');
        } catch (error) {
            console.error('Erro ao inicializar página de notas:', error);
            this.showError('Erro ao carregar página de notas');
        }
    }

    /**
     * Inicializa página do dashboard
     */
    initDashboardPage() {
        try {
            // Aqui você pode inicializar o dashboard
            console.log('Dashboard inicializado');
            
            // Carrega dados do dashboard
            this.carregarDadosDashboard();
        } catch (error) {
            console.error('Erro ao inicializar dashboard:', error);
            this.showError('Erro ao carregar dashboard');
        }
    }

    /**
     * Inicializa página de exercícios
     */
    initExerciciosPage() {
        try {
            // Aqui você pode inicializar a página de exercícios
            console.log('Página de exercícios inicializada');
        } catch (error) {
            console.error('Erro ao inicializar página de exercícios:', error);
            this.showError('Erro ao carregar página de exercícios');
        }
    }

    /**
     * Inicializa página de preferências
     */
    initPreferenciasPage() {
        try {
            const container = document.getElementById('app-content') || document.body;
            PreferenciasPage(container);
            console.log('Página de preferências inicializada');
        } catch (error) {
            console.error('Erro ao inicializar página de preferências:', error);
            this.showError('Erro ao carregar página de preferências');
        }
    }

    /**
     * Carrega dados do dashboard
     */
    async carregarDadosDashboard() {
        try {
            // Carrega refeição atual
            await this.carregarRefeicaoAtual();
            
            // Carrega exercício atual
            await this.carregarExercicioAtual();
            
            // Carrega tarefas e notas
            await this.carregarTarefasENotas();
            
        } catch (error) {
            console.error('Erro ao carregar dados do dashboard:', error);
        }
    }

    /**
     * Carrega refeição atual
     */
    async carregarRefeicaoAtual() {
        try {
            const refeicaoContent = document.getElementById('refeicao-content');
            if (!refeicaoContent) return;

            // Determina a refeição atual
            const agora = new Date();
            const hora = agora.getHours();
            let refeicaoKey = 'cafe';
            
            if (hora >= 7 && hora < 9) refeicaoKey = 'cafe';
            else if (hora >= 9 && hora < 11) refeicaoKey = 'lancheM';
            else if (hora >= 12 && hora < 14) refeicaoKey = 'almoco';
            else if (hora >= 15 && hora < 17) refeicaoKey = 'lancheT';
            else if (hora >= 19 && hora < 21) refeicaoKey = 'janta';
            else if (hora >= 21 || hora < 7) refeicaoKey = 'ceia';
            else if (hora >= 11 && hora < 12) refeicaoKey = 'almoco';
            else if (hora >= 14 && hora < 15) refeicaoKey = 'lancheT';
            else if (hora >= 17 && hora < 19) refeicaoKey = 'janta';
            else refeicaoKey = 'ceia';

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

            // Carrega receitas da seção atual
            const receitaController = new ReceitaController();
            const result = await receitaController.carregarReceitasPorSecao(refeicaoKey);
            
            if (!result.success || result.data.length === 0) {
                // Fallback para dados estáticos
                refeicaoContent.innerHTML = `
                    <div class="refeicao-info">
                        <h5>${nomesRefeicoes[refeicaoKey]} — ${horariosRefeicoes[refeicaoKey]}</h5>
                        <p>Nenhuma receita cadastrada para esta refeição.</p>
                        <p><a href="receitas.html" style="color: #007bff;">Gerenciar receitas</a></p>
                    </div>
                `;
                return;
            }

            // Busca receita preferida
            const receitaPreferida = await receitaController.obterReceitaPreferida(refeicaoKey);
            let receita = result.data[0]; // Primeira receita como padrão
            
            if (receitaPreferida.success && receitaPreferida.data) {
                // Se há receita preferida, usa ela
                receita = receitaPreferida.data;
            }

            const htmlContent = `
                <div class="refeicao-info">
                    <h5>${nomesRefeicoes[refeicaoKey]} — ${horariosRefeicoes[refeicaoKey]}</h5>
                    <h6>${receita.titulo}</h6>
                    ${receitaPreferida.success && receitaPreferida.data ? 
                        '<div style="color: #ffc107; font-size: 14px; margin: 5px 0;">★ Receita preferida</div>' : 
                        ''
                    }
                    <p><strong>Ingredientes:</strong></p>
                    <ul>
                        ${Array.isArray(receita.ingredientes) ? 
                            receita.ingredientes.map(ing => `<li>${ing}</li>`).join('') : 
                            '<li>Ingredientes não informados</li>'
                        }
                    </ul>
                    <p><strong>Preparo:</strong> ${receita.preparo || 'Modo de preparo não informado'}</p>
                    ${receita.calorias ? 
                        `<p><strong>Valores nutricionais:</strong> ${receita.calorias}</p>` : 
                        ''
                    }
                    <p style="margin-top: 15px;">
                        <a href="receitas.html" style="color: #007bff; text-decoration: none;">
                            📖 Ver todas as receitas
                        </a>
                    </p>
                </div>
            `;
            
            refeicaoContent.innerHTML = htmlContent;
            
        } catch (error) {
            console.error('Erro ao carregar refeição atual:', error);
            const refeicaoContent = document.getElementById('refeicao-content');
            if (refeicaoContent) {
                refeicaoContent.innerHTML = `
                    <div class="refeicao-info">
                        <p>Erro ao carregar refeição atual.</p>
                        <p><a href="receitas.html" style="color: #007bff;">Gerenciar receitas</a></p>
                    </div>
                `;
            }
        }
    }

    /**
     * Carrega exercício atual
     */
    async carregarExercicioAtual() {
        try {
            const exercicioContent = document.getElementById('exercicio-content');
            if (!exercicioContent) return;

            exercicioContent.innerHTML = '<p>Carregando exercício atual...</p>';
            
            // Implementar lógica de carregamento do exercício atual
            
        } catch (error) {
            console.error('Erro ao carregar exercício atual:', error);
        }
    }

    /**
     * Carrega tarefas e notas
     */
    async carregarTarefasENotas() {
        try {
            // Aqui você pode integrar com os sistemas de tarefas e notas existentes
            console.log('Carregando tarefas e notas...');
            
        } catch (error) {
            console.error('Erro ao carregar tarefas e notas:', error);
        }
    }

    /**
     * Inicializa sidebar responsiva
     */
    initSidebar() {
        const sidebar = document.getElementById('sidebar');
        const header = document.querySelector('header');
        const mainContent = document.querySelector('body > div');
        
        if (!sidebar || !header || !mainContent) {
            console.log('Elementos de navegação não encontrados nesta página');
            return;
        }
        
        // Função para verificar se o header está visível
        const isHeaderVisible = () => {
            const headerRect = header.getBoundingClientRect();
            return headerRect.bottom > 0;
        };
        
        // Função para controlar a fixação da sidebar
        const toggleSidebarFixed = () => {
            if (window.innerWidth <= 768) {
                const headerVisible = isHeaderVisible();
                
                if (headerVisible) {
                    // Header ainda visível - sidebar fica embaixo
                    removeClass(sidebar, 'fixed');
                    mainContent.style.paddingTop = '0';
                } else {
                    // Header saiu da tela - sidebar fica fixa no topo
                    addClass(sidebar, 'fixed');
                    const sidebarHeight = sidebar.offsetHeight;
                    mainContent.style.paddingTop = (sidebarHeight + 20) + 'px';
                }
            } else {
                // Desktop - reset
                removeClass(sidebar, 'fixed');
                mainContent.style.paddingTop = '0';
            }
        };
        
        // Função para ajustar o layout
        const adjustLayout = () => {
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
                removeClass(sidebar, 'fixed');
            }
        };
        
        // Ajustar layout inicial
        toggleSidebarFixed();
        adjustLayout();
        
        // Controlar sidebar no scroll com throttling para melhor performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    toggleSidebarFixed();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Ajustar quando a janela for redimensionada
        window.addEventListener('resize', () => {
            toggleSidebarFixed();
            adjustLayout();
        });
    }

    /**
     * Inicializa botão de logout
     */
    initLogout() {
        // Adiciona botão de logout se não existir
        const header = document.querySelector('header');
        if (!header) return;

        let logoutBtn = header.querySelector('.btn-logout');
        if (!logoutBtn) {
            logoutBtn = document.createElement('button');
            logoutBtn.className = 'btn-logout';
            logoutBtn.textContent = 'Sair';
            logoutBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 8px 16px;
                background: #dc3545;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            `;
            
            logoutBtn.addEventListener('click', () => this.handleLogout());
            header.appendChild(logoutBtn);
        }
    }

    /**
     * Manipula logout
     */
    async handleLogout() {
        try {
            const result = await supabaseService.logout();
            
            if (result.success) {
                window.location.href = 'login.html';
            } else {
                this.showError('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro no logout:', error);
            this.showError('Erro ao fazer logout');
        }
    }

    /**
     * Protege conteúdo até autenticação
     */
    protectContent() {
        // Remove classe de loading após autenticação
        removeClass(document.body, 'loading-auth');
    }

    /**
     * Manipula erro de inicialização
     */
    handleInitError(error) {
        console.error('Erro crítico na inicialização:', error);
        
        // Mostra mensagem de erro para o usuário
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #dc3545;
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 10000;
            text-align: center;
        `;
        errorDiv.innerHTML = `
            <h3>Erro ao carregar aplicação</h3>
            <p>${MESSAGES.ERROR_GENERIC}</p>
            <button onclick="location.reload()" style="margin-top: 10px; padding: 8px 16px; background: white; color: #dc3545; border: none; border-radius: 4px; cursor: pointer;">
                Tentar Novamente
            </button>
        `;
        
        document.body.appendChild(errorDiv);
    }

    /**
     * Mostra mensagem de erro
     */
    showError(message) {
        console.error('Erro:', message);
        // Implementar sistema de notificação mais elegante
        alert(`Erro: ${message}`);
    }

    /**
     * Mostra mensagem de sucesso
     */
    showSuccess(message) {
        console.log('Sucesso:', message);
        // Implementar sistema de notificação mais elegante
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new App();
    });
} else {
    window.app = new App();
}

export default App; 