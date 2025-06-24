// ===================== PÁGINA DE RECEITAS ===================== //

import ReceitaController from '../../controllers/ReceitaController.js';
import ReceitaCard from '../components/ReceitaCard.js';
import { MESSAGES } from '../../utils/constants.js';
import { showElement, hideElement, addClass, removeClass } from '../../utils/helpers.js';

class ReceitasPage {
    constructor() {
        this.controller = new ReceitaController();
        this.cardComponent = new ReceitaCard();
        this.receitas = [];
        this.receitaEmEdicao = null;
        
        this.init();
    }

    /**
     * Inicializa a página
     */
    init() {
        this.bindEvents();
        this.carregarReceitas();
    }

    /**
     * Vincula eventos da página
     */
    bindEvents() {
        // Botão nova receita
        const btnNovaReceita = document.getElementById('btn-nova-receita');
        if (btnNovaReceita) {
            btnNovaReceita.addEventListener('click', () => this.abrirModalNovaReceita());
        }

        // Modal de receita
        const btnFecharModal = document.getElementById('btn-fechar-modal');
        if (btnFecharModal) {
            btnFecharModal.addEventListener('click', () => this.fecharModal());
        }

        const btnCancelar = document.getElementById('btn-cancelar');
        if (btnCancelar) {
            btnCancelar.addEventListener('click', () => this.fecharModal());
        }

        // Formulário de receita
        const formReceita = document.getElementById('form-receita');
        if (formReceita) {
            formReceita.addEventListener('submit', (e) => this.handleSalvarReceita(e));
        }

        // Modal de confirmação
        const btnFecharConfirmacao = document.getElementById('btn-fechar-confirmacao');
        if (btnFecharConfirmacao) {
            btnFecharConfirmacao.addEventListener('click', () => this.fecharModalConfirmacao());
        }

        const btnCancelarExclusao = document.getElementById('btn-cancelar-exclusao');
        if (btnCancelarExclusao) {
            btnCancelarExclusao.addEventListener('click', () => this.fecharModalConfirmacao());
        }

        const btnConfirmarExclusao = document.getElementById('btn-confirmar-exclusao');
        if (btnConfirmarExclusao) {
            btnConfirmarExclusao.addEventListener('click', () => this.confirmarExclusao());
        }

        // Filtros
        const filtroSecao = document.getElementById('filtro-secao');
        if (filtroSecao) {
            filtroSecao.addEventListener('change', () => this.aplicarFiltros());
        }

        const filtroBusca = document.getElementById('filtro-busca');
        if (filtroBusca) {
            filtroBusca.addEventListener('input', () => this.aplicarFiltros());
        }

        const btnLimparFiltros = document.getElementById('btn-limpar-filtros');
        if (btnLimparFiltros) {
            btnLimparFiltros.addEventListener('click', () => this.limparFiltros());
        }

        // Fechar modal ao clicar fora
        const modalReceita = document.getElementById('modal-receita');
        if (modalReceita) {
            modalReceita.addEventListener('click', (e) => {
                if (e.target === modalReceita) {
                    this.fecharModal();
                }
            });
        }

        const modalConfirmacao = document.getElementById('modal-confirmacao');
        if (modalConfirmacao) {
            modalConfirmacao.addEventListener('click', (e) => {
                if (e.target === modalConfirmacao) {
                    this.fecharModalConfirmacao();
                }
            });
        }
    }

    /**
     * Carrega todas as receitas
     */
    async carregarReceitas() {
        try {
            this.showLoading();
            
            const result = await this.controller.carregarReceitasComPreferencias();
            
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
     * Renderiza todas as receitas
     */
    renderizarReceitas() {
        const container = document.getElementById('receitas-lista');
        if (!container) return;

        if (this.receitas.length === 0) {
            container.innerHTML = `
                <div class="receita-empty">
                    <p>Nenhuma receita cadastrada. Clique em "Nova Receita" para começar!</p>
                </div>
            `;
            return;
        }

        // Organiza receitas por seção
        const receitasPorSecao = this.controller.organizarPorSecao(this.receitas);
        
        let html = '';
        Object.keys(receitasPorSecao).forEach(secao => {
            const receitas = receitasPorSecao[secao];
            const nomeSecao = this.getNomeSecao(secao);
            
            html += `
                <div class="secao-receitas" data-secao="${secao}">
                    <h3>${nomeSecao}</h3>
                    <div class="receitas-grid">
                        ${receitas.map(receita => this.renderizarCardReceita(receita)).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        this.bindCardEvents();
    }

    /**
     * Renderiza um card de receita
     */
    renderizarCardReceita(receita) {
        const isPreferida = receita.isPreferida || false;
        const preferenciaIcon = isPreferida ? '★' : '☆';
        const preferenciaClass = isPreferida ? 'preferida' : '';
        const preferenciaTitle = isPreferida ? 'Remover preferência' : 'Marcar como preferida';
        
        return `
            <div class="receita-card ${preferenciaClass}" data-receita-id="${receita.id}">
                <div class="receita-header">
                    <h4 class="receita-titulo">${receita.titulo}</h4>
                    <div class="receita-acoes">
                        <button class="btn-preferencia" title="${preferenciaTitle}" data-receita-id="${receita.id}" data-secao="${receita.secao}">
                            <span class="icon">${preferenciaIcon}</span>
                        </button>
                        <button class="btn-editar" title="Editar receita" data-receita-id="${receita.id}">
                            <span class="icon">✏️</span>
                        </button>
                        <button class="btn-remover" title="Remover receita" data-receita-id="${receita.id}">
                            <span class="icon">🗑️</span>
                        </button>
                    </div>
                </div>
                <div class="receita-content">
                    <div class="receita-ingredientes">
                        <p><strong>Ingredientes:</strong></p>
                        <ol class="ingredientes-lista">
                            ${Array.isArray(receita.ingredientes) ? 
                                receita.ingredientes.map(ing => `<li>${ing}</li>`).join('') : 
                                '<li>Ingredientes não informados</li>'
                            }
                        </ol>
                    </div>
                    <div class="receita-preparo">
                        <p><strong>Preparo:</strong></p>
                        <p class="preparo-texto">${receita.preparo || 'Modo de preparo não informado'}</p>
                    </div>
                    ${receita.calorias ? `
                        <div class="receita-calorias">
                            <p><strong>Valores nutricionais:</strong></p>
                            <p class="calorias-texto">${receita.calorias}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Vincula eventos dos cards de receita
     */
    bindCardEvents() {
        // Botões de preferência
        document.querySelectorAll('.btn-preferencia').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const receitaId = e.currentTarget.dataset.receitaId;
                const secao = e.currentTarget.dataset.secao;
                
                try {
                    this.showLoading();
                    
                    const result = await this.controller.alternarPreferencia(receitaId, secao);
                    
                    if (!result.success) {
                        this.showError(result.error);
                        return;
                    }

                    // Atualiza a lista local
                    const receita = this.receitas.find(r => r.id === receitaId);
                    if (receita) {
                        receita.isPreferida = result.action === 'added';
                    }
                    
                    // Re-renderiza
                    this.renderizarReceitas();
                    
                    this.showSuccess(result.message);
                    
                } catch (error) {
                    console.error('Erro ao alternar preferência:', error);
                    this.showError(MESSAGES.ERROR_GENERIC);
                } finally {
                    this.hideLoading();
                }
            });
        });

        // Botões editar
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const receitaId = e.currentTarget.dataset.receitaId;
                const receita = this.receitas.find(r => r.id === receitaId);
                if (receita) {
                    this.abrirModalEditarReceita(receita);
                }
            });
        });

        // Botões remover
        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const receitaId = e.currentTarget.dataset.receitaId;
                const receita = this.receitas.find(r => r.id === receitaId);
                if (receita) {
                    this.abrirModalConfirmacao(receita);
                }
            });
        });
    }

    /**
     * Abre modal para nova receita
     */
    abrirModalNovaReceita() {
        this.receitaEmEdicao = null;
        this.limparFormulario();
        document.getElementById('modal-titulo').textContent = 'Nova Receita';
        document.getElementById('modal-receita').style.display = 'flex';
    }

    /**
     * Abre modal para editar receita
     */
    abrirModalEditarReceita(receita) {
        this.receitaEmEdicao = receita;
        this.preencherFormulario(receita);
        document.getElementById('modal-titulo').textContent = 'Editar Receita';
        document.getElementById('modal-receita').style.display = 'flex';
    }

    /**
     * Fecha modal de receita
     */
    fecharModal() {
        document.getElementById('modal-receita').style.display = 'none';
        this.receitaEmEdicao = null;
        this.limparFormulario();
    }

    /**
     * Abre modal de confirmação
     */
    abrirModalConfirmacao(receita) {
        this.receitaEmEdicao = receita;
        document.getElementById('receita-titulo-confirmacao').textContent = receita.titulo;
        document.getElementById('modal-confirmacao').style.display = 'flex';
    }

    /**
     * Fecha modal de confirmação
     */
    fecharModalConfirmacao() {
        document.getElementById('modal-confirmacao').style.display = 'none';
        this.receitaEmEdicao = null;
    }

    /**
     * Confirma exclusão da receita
     */
    async confirmarExclusao() {
        if (!this.receitaEmEdicao) return;

        try {
            this.showLoading();
            
            const result = await this.controller.removerReceita(this.receitaEmEdicao.id);
            
            if (!result.success) {
                this.showError(result.error);
                return;
            }

            // Remove da lista local
            this.receitas = this.receitas.filter(r => r.id !== this.receitaEmEdicao.id);
            
            // Re-renderiza
            this.renderizarReceitas();
            
            this.fecharModalConfirmacao();
            this.showSuccess(result.message);
            
        } catch (error) {
            console.error('Erro ao remover receita:', error);
            this.showError(MESSAGES.ERROR_GENERIC);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Manipula salvamento de receita
     */
    async handleSalvarReceita(event) {
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
            
            let result;
            if (this.receitaEmEdicao) {
                // Atualizar receita existente
                result = await this.controller.atualizarReceita(this.receitaEmEdicao.id, receitaData);
            } else {
                // Criar nova receita
                result = await this.controller.criarReceita(receitaData);
            }
            
            if (!result.success) {
                this.showError(result.error);
                return;
            }

            // Atualiza lista local
            if (this.receitaEmEdicao) {
                // Atualiza receita existente
                const index = this.receitas.findIndex(r => r.id === this.receitaEmEdicao.id);
                if (index !== -1) {
                    this.receitas[index] = result.data;
                }
            } else {
                // Adiciona nova receita
                this.receitas.unshift(result.data);
            }
            
            // Re-renderiza
            this.renderizarReceitas();
            
            this.fecharModal();
            this.showSuccess(result.message);
            
        } catch (error) {
            console.error('Erro ao salvar receita:', error);
            this.showError(MESSAGES.ERROR_GENERIC);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Preenche formulário com dados da receita
     */
    preencherFormulario(receita) {
        document.getElementById('titulo').value = receita.titulo || '';
        document.getElementById('secao').value = receita.secao || '';
        document.getElementById('ingredientes').value = Array.isArray(receita.ingredientes) ? 
            receita.ingredientes.join('\n') : '';
        document.getElementById('preparo').value = receita.preparo || '';
        document.getElementById('calorias').value = receita.calorias || '';
    }

    /**
     * Limpa formulário
     */
    limparFormulario() {
        document.getElementById('form-receita').reset();
    }

    /**
     * Aplica filtros
     */
    aplicarFiltros() {
        const filtroSecao = document.getElementById('filtro-secao').value;
        const filtroBusca = document.getElementById('filtro-busca').value.toLowerCase();

        const receitasFiltradas = this.controller.filtrarReceitas(this.receitas, {
            secao: filtroSecao,
            titulo: filtroBusca
        });

        this.renderizarReceitasFiltradas(receitasFiltradas);
    }

    /**
     * Renderiza receitas filtradas
     */
    renderizarReceitasFiltradas(receitasFiltradas) {
        const container = document.getElementById('receitas-lista');
        if (!container) return;

        if (receitasFiltradas.length === 0) {
            container.innerHTML = `
                <div class="receita-empty">
                    <p>Nenhuma receita encontrada com os filtros aplicados.</p>
                </div>
            `;
            return;
        }

        // Organiza receitas filtradas por seção
        const receitasPorSecao = this.controller.organizarPorSecao(receitasFiltradas);
        
        let html = '';
        Object.keys(receitasPorSecao).forEach(secao => {
            const receitas = receitasPorSecao[secao];
            const nomeSecao = this.getNomeSecao(secao);
            
            html += `
                <div class="secao-receitas" data-secao="${secao}">
                    <h3>${nomeSecao}</h3>
                    <div class="receitas-grid">
                        ${receitas.map(receita => this.renderizarCardReceita(receita)).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        this.bindCardEvents();
    }

    /**
     * Limpa filtros
     */
    limparFiltros() {
        document.getElementById('filtro-secao').value = '';
        document.getElementById('filtro-busca').value = '';
        this.renderizarReceitas();
    }

    /**
     * Obtém nome da seção
     */
    getNomeSecao(secao) {
        const nomes = {
            cafe: 'Café da Manhã',
            lancheM: 'Lanche da Manhã',
            almoco: 'Almoço',
            lancheT: 'Lanche da Tarde',
            janta: 'Janta',
            ceia: 'Ceia'
        };
        return nomes[secao] || secao;
    }

    /**
     * Mostra loading
     */
    showLoading() {
        showElement(document.getElementById('loading'));
        hideElement(document.getElementById('receitas-content'));
    }

    /**
     * Esconde loading
     */
    hideLoading() {
        hideElement(document.getElementById('loading'));
        showElement(document.getElementById('receitas-content'));
    }

    /**
     * Mostra erro
     */
    showError(message) {
        this.showMessage(message, 'error');
    }

    /**
     * Mostra sucesso
     */
    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    /**
     * Mostra mensagem
     */
    showMessage(message, type) {
        const container = document.getElementById('messages');
        if (!container) return;

        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;

        container.appendChild(messageElement);

        // Remove após 5 segundos
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 5000);
    }
}

export default ReceitasPage; 