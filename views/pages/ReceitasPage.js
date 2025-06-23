// ===================== PÁGINA DE RECEITAS ===================== //

import ReceitaController from '../../controllers/ReceitaController.js';
import ReceitaCard from '../components/ReceitaCard.js';
import { REFEICOES_HORARIOS, MESSAGES } from '../../utils/constants.js';
import { showElement, hideElement, addClass, removeClass } from '../../utils/helpers.js';

class ReceitasPage {
    constructor() {
        this.controller = new ReceitaController();
        this.cardComponent = new ReceitaCard();
        this.receitas = [];
        this.preferencias = {};
        this.currentSecao = null;
        
        this.init();
    }

    /**
     * Inicializa a página
     */
    init() {
        this.bindEvents();
        this.carregarReceitas();
        this.carregarPreferencias();
    }

    /**
     * Vincula eventos da página
     */
    bindEvents() {
        // Eventos de receitas
        document.addEventListener('receitaEdit', (e) => this.handleReceitaEdit(e.detail.receita));
        document.addEventListener('receitaRemove', (e) => this.handleReceitaRemove(e.detail.receita));
        document.addEventListener('receitaTogglePreferencia', (e) => this.handleTogglePreferencia(e.detail.receita));

        // Eventos de navegação da sidebar
        const sidebarLinks = document.querySelectorAll('#sidebar a[href^="#"]');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = this.getTargetId(e.target.getAttribute('href'));
                this.navegarParaSecao(targetId);
            });
        });

        // Eventos de formulário (se existir)
        const formNovaReceita = document.getElementById('form-nova-receita');
        if (formNovaReceita) {
            formNovaReceita.addEventListener('submit', (e) => this.handleNovaReceita(e));
        }
    }

    /**
     * Carrega todas as receitas
     */
    async carregarReceitas() {
        try {
            this.showLoading();
            
            const result = await this.controller.carregarReceitas();
            
            if (!result.success) {
                this.showError(result.error);
                return;
            }

            this.receitas = result.data;
            this.renderizarReceitas();
            this.showSuccess(result.message);
            
        } catch (error) {
            console.error('Erro ao carregar receitas:', error);
            this.showError(MESSAGES.ERROR_GENERIC);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Carrega preferências do usuário
     */
    async carregarPreferencias() {
        try {
            // Aqui você pode integrar com o sistema de preferências existente
            // Por enquanto, vamos usar localStorage como fallback
            const preferencias = localStorage.getItem('preferenciasReceitas');
            this.preferencias = preferencias ? JSON.parse(preferencias) : {};
        } catch (error) {
            console.error('Erro ao carregar preferências:', error);
            this.preferencias = {};
        }
    }

    /**
     * Renderiza todas as receitas
     */
    renderizarReceitas() {
        const receitasPorSecao = this.controller.organizarPorSecao(this.receitas);
        
        Object.keys(REFEICOES_HORARIOS).forEach(secao => {
            this.renderizarSecao(secao, receitasPorSecao[secao] || []);
        });
    }

    /**
     * Renderiza uma seção específica
     * @param {string} secao - Nome da seção
     * @param {Array} receitas - Lista de receitas da seção
     */
    renderizarSecao(secao, receitas) {
        const secaoElement = document.getElementById(secao);
        if (!secaoElement) return;

        const listaElement = secaoElement.querySelector('ul');
        if (!listaElement) return;

        // Limpa a lista
        listaElement.innerHTML = '';

        if (receitas.length === 0) {
            // Mostra mensagem de "nenhuma receita"
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'receita-empty';
            emptyMessage.innerHTML = '<p>Nenhuma receita cadastrada para esta seção.</p>';
            listaElement.appendChild(emptyMessage);
            return;
        }

        // Renderiza cada receita
        receitas.forEach((receita, index) => {
            const card = this.cardComponent.render(receita, index, secao);
            
            // Atualiza estado de preferência
            const isPreferida = this.preferencias[secao] === receita.titulo;
            this.cardComponent.updatePreferenciaState(card, isPreferida);
            
            listaElement.appendChild(card);
        });
    }

    /**
     * Navega para uma seção específica
     * @param {string} secaoId - ID da seção
     */
    navegarParaSecao(secaoId) {
        const secaoElement = document.getElementById(secaoId);
        if (!secaoElement) return;

        // Atualiza estado ativo na sidebar
        this.updateSidebarActive(secaoId);

        // Scroll suave para a seção
        const sidebar = document.getElementById('sidebar');
        const sidebarHeight = sidebar.classList.contains('fixed') ? sidebar.offsetHeight : 0;
        const offsetTop = secaoElement.offsetTop - sidebarHeight - 20;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });

        this.currentSecao = secaoId;
    }

    /**
     * Atualiza estado ativo na sidebar
     * @param {string} secaoId - ID da seção ativa
     */
    updateSidebarActive(secaoId) {
        const sidebarLinks = document.querySelectorAll('#sidebar a');
        sidebarLinks.forEach(link => {
            removeClass(link, 'active');
            if (link.getAttribute('href') === `#${secaoId}`) {
                addClass(link, 'active');
            }
        });
    }

    /**
     * Obtém ID do target a partir do href
     * @param {string} href - Href do link
     * @returns {string} ID do target
     */
    getTargetId(href) {
        return href.replace('#', '');
    }

    /**
     * Manipula edição de receita
     * @param {Object} receita - Dados da receita
     */
    handleReceitaEdit(receita) {
        // Aqui você pode abrir um modal ou navegar para página de edição
        console.log('Editar receita:', receita);
        
        // Dispara evento para abrir modal de edição
        const event = new CustomEvent('abrirModalEdicao', {
            detail: { receita },
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    /**
     * Manipula remoção de receita
     * @param {Object} receita - Dados da receita
     */
    async handleReceitaRemove(receita) {
        try {
            this.showLoading();
            
            const result = await this.controller.removerReceita(receita.id);
            
            if (!result.success) {
                this.showError(result.error);
                return;
            }

            // Remove o card da interface
            const card = document.querySelector(`[data-receita-id="${receita.id}"]`);
            if (card) {
                card.remove();
            }

            // Remove da lista local
            this.receitas = this.receitas.filter(r => r.id !== receita.id);
            
            this.showSuccess(result.message);
            
        } catch (error) {
            console.error('Erro ao remover receita:', error);
            this.showError(MESSAGES.ERROR_GENERIC);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Manipula alternância de preferência
     * @param {Object} receita - Dados da receita
     */
    async handleTogglePreferencia(receita) {
        try {
            const secao = receita.secao;
            const isPreferida = this.preferencias[secao] === receita.titulo;
            
            if (isPreferida) {
                // Remove preferência
                delete this.preferencias[secao];
            } else {
                // Define preferência
                this.preferencias[secao] = receita.titulo;
            }

            // Salva preferências
            localStorage.setItem('preferenciasReceitas', JSON.stringify(this.preferencias));
            
            // Atualiza interface
            this.atualizarMarcadoresPreferencia();
            
            // Mostra feedback
            const message = isPreferida ? 'Preferência removida' : 'Receita marcada como preferida';
            this.showSuccess(message);
            
        } catch (error) {
            console.error('Erro ao alternar preferência:', error);
            this.showError(MESSAGES.ERROR_GENERIC);
        }
    }

    /**
     * Atualiza marcadores de preferência na interface
     */
    atualizarMarcadoresPreferencia() {
        const cards = document.querySelectorAll('.receita-card');
        cards.forEach(card => {
            const receitaId = card.getAttribute('data-receita-id');
            const receita = this.receitas.find(r => r.id === receitaId);
            
            if (receita) {
                const isPreferida = this.preferencias[receita.secao] === receita.titulo;
                this.cardComponent.updatePreferenciaState(card, isPreferida);
            }
        });
    }

    /**
     * Manipula criação de nova receita
     * @param {Event} event - Evento do formulário
     */
    async handleNovaReceita(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const receitaData = {
            titulo: formData.get('titulo'),
            secao: formData.get('secao'),
            ingredientes: formData.get('ingredientes').split('\n').filter(i => i.trim()),
            preparo: formData.get('preparo'),
            calorias: formData.get('calorias')
        };

        try {
            this.showLoading();
            
            const result = await this.controller.criarReceita(receitaData);
            
            if (!result.success) {
                this.showError(result.error);
                return;
            }

            // Adiciona à lista local
            this.receitas.unshift(result.data);
            
            // Re-renderiza a seção
            this.renderizarSecao(receitaData.secao, this.receitas.filter(r => r.secao === receitaData.secao));
            
            // Limpa formulário
            event.target.reset();
            
            this.showSuccess(result.message);
            
        } catch (error) {
            console.error('Erro ao criar receita:', error);
            this.showError(MESSAGES.ERROR_GENERIC);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Mostra estado de loading
     */
    showLoading() {
        const loadingElement = document.getElementById('loading-receitas');
        if (loadingElement) {
            showElement(loadingElement);
        }
    }

    /**
     * Esconde estado de loading
     */
    hideLoading() {
        const loadingElement = document.getElementById('loading-receitas');
        if (loadingElement) {
            hideElement(loadingElement);
        }
    }

    /**
     * Mostra mensagem de erro
     * @param {string} message - Mensagem de erro
     */
    showError(message) {
        // Implementar sistema de notificação
        console.error('Erro:', message);
        alert(`Erro: ${message}`);
    }

    /**
     * Mostra mensagem de sucesso
     * @param {string} message - Mensagem de sucesso
     */
    showSuccess(message) {
        // Implementar sistema de notificação
        console.log('Sucesso:', message);
        // alert(`Sucesso: ${message}`);
    }
}

export default ReceitasPage; 