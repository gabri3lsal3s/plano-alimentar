// ===================== COMPONENTE RECEITA CARD ===================== //

import { sanitizeString } from '../../utils/helpers.js';

class ReceitaCard {
    constructor() {
        this.template = this.createTemplate();
    }

    /**
     * Cria o template HTML do card
     * @returns {string} Template HTML
     */
    createTemplate() {
        return `
            <li class="receita-card" data-receita-id="">
                <div class="receita-header">
                    <h4 class="receita-titulo"></h4>
                    <div class="receita-acoes">
                        <button class="btn-editar" title="Editar receita">
                            <span class="icon">✏️</span>
                        </button>
                        <button class="btn-remover" title="Remover receita">
                            <span class="icon">🗑️</span>
                        </button>
                    </div>
                </div>
                <div class="receita-content">
                    <div class="receita-ingredientes">
                        <p><strong>Ingredientes:</strong></p>
                        <ol class="ingredientes-lista"></ol>
                    </div>
                    <div class="receita-preparo">
                        <p><strong>Preparo:</strong></p>
                        <p class="preparo-texto"></p>
                    </div>
                    <div class="receita-calorias">
                        <p><strong>Valores nutricionais:</strong></p>
                        <p class="calorias-texto"></p>
                    </div>
                </div>
                <div class="marcador-preferencia" data-secao="" data-index=""></div>
            </li>
        `;
    }

    /**
     * Renderiza um card de receita
     * @param {Object} receita - Dados da receita
     * @param {number} index - Índice da receita
     * @param {string} secao - Seção da receita
     * @returns {HTMLElement} Elemento HTML do card
     */
    render(receita, index, secao) {
        const template = document.createElement('template');
        template.innerHTML = this.template.trim();
        const card = template.content.firstElementChild;

        // Define o ID da receita
        card.setAttribute('data-receita-id', receita.id);
        card.classList.add('receita-preferencia');

        // Preenche os dados da receita
        this.fillCardData(card, receita, index, secao);

        // Adiciona eventos
        this.addEventListeners(card, receita);

        return card;
    }

    /**
     * Preenche os dados do card
     * @param {HTMLElement} card - Elemento do card
     * @param {Object} receita - Dados da receita
     * @param {number} index - Índice da receita
     * @param {string} secao - Seção da receita
     */
    fillCardData(card, receita, index, secao) {
        // Título
        const titulo = card.querySelector('.receita-titulo');
        titulo.textContent = sanitizeString(receita.titulo);

        // Ingredientes
        const ingredientesLista = card.querySelector('.ingredientes-lista');
        ingredientesLista.innerHTML = '';
        if (Array.isArray(receita.ingredientes)) {
            receita.ingredientes.forEach(ingrediente => {
                const li = document.createElement('li');
                li.textContent = sanitizeString(ingrediente);
                ingredientesLista.appendChild(li);
            });
        }

        // Preparo
        const preparoTexto = card.querySelector('.preparo-texto');
        preparoTexto.textContent = sanitizeString(receita.preparo);

        // Calorias
        const caloriasTexto = card.querySelector('.calorias-texto');
        caloriasTexto.textContent = sanitizeString(receita.calorias || '');

        // Marcador de preferência
        const marcador = card.querySelector('.marcador-preferencia');
        marcador.setAttribute('data-secao', secao);
        marcador.setAttribute('data-index', index);
    }

    /**
     * Adiciona event listeners ao card
     * @param {HTMLElement} card - Elemento do card
     * @param {Object} receita - Dados da receita
     */
    addEventListeners(card, receita) {
        // Botão editar
        const btnEditar = card.querySelector('.btn-editar');
        btnEditar.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onEdit(receita);
        });

        // Botão remover
        const btnRemover = card.querySelector('.btn-remover');
        btnRemover.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onRemove(receita);
        });

        // Marcador de preferência
        const marcador = card.querySelector('.marcador-preferencia');
        marcador.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onTogglePreferencia(receita);
        });
    }

    /**
     * Callback para edição da receita
     * @param {Object} receita - Dados da receita
     */
    onEdit(receita) {
        // Dispara evento customizado
        const event = new CustomEvent('receitaEdit', {
            detail: { receita },
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    /**
     * Callback para remoção da receita
     * @param {Object} receita - Dados da receita
     */
    onRemove(receita) {
        if (confirm('Tem certeza que deseja remover esta receita?')) {
            // Dispara evento customizado
            const event = new CustomEvent('receitaRemove', {
                detail: { receita },
                bubbles: true
            });
            document.dispatchEvent(event);
        }
    }

    /**
     * Callback para alternar preferência
     * @param {Object} receita - Dados da receita
     */
    onTogglePreferencia(receita) {
        // Dispara evento customizado
        const event = new CustomEvent('receitaTogglePreferencia', {
            detail: { receita },
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    /**
     * Atualiza o estado visual do marcador de preferência
     * @param {HTMLElement} card - Elemento do card
     * @param {boolean} isPreferida - Se é preferida
     */
    updatePreferenciaState(card, isPreferida) {
        const marcador = card.querySelector('.marcador-preferencia');
        if (isPreferida) {
            marcador.classList.add('ativo');
        } else {
            marcador.classList.remove('ativo');
        }
    }

    /**
     * Mostra estado de loading no card
     * @param {HTMLElement} card - Elemento do card
     */
    showLoading(card) {
        card.classList.add('loading');
        const content = card.querySelector('.receita-content');
        content.innerHTML = '<p>Carregando...</p>';
    }

    /**
     * Mostra estado de erro no card
     * @param {HTMLElement} card - Elemento do card
     * @param {string} message - Mensagem de erro
     */
    showError(card, message) {
        card.classList.add('error');
        const content = card.querySelector('.receita-content');
        content.innerHTML = `<p class="error-message">${sanitizeString(message)}</p>`;
    }

    /**
     * Remove estados especiais do card
     * @param {HTMLElement} card - Elemento do card
     */
    clearStates(card) {
        card.classList.remove('loading', 'error');
    }
}

export default ReceitaCard; 