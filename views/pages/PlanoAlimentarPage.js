import ReceitaController from '../../controllers/ReceitaController.js';
import { REFEICOES_HORARIOS, MESSAGES } from '../../utils/constants.js';

class PlanoAlimentarPage {
    constructor() {
        this.controller = new ReceitaController();
        this.secoes = Object.keys(REFEICOES_HORARIOS);
        this.init();
    }

    async init() {
        await this.renderTodasSecoes();
        this.bindGlobalEvents();
    }

    async renderTodasSecoes() {
        for (const secao of this.secoes) {
            await this.renderSecao(secao);
        }
    }

    async renderSecao(secao) {
        const container = document.getElementById(`receitas-${secao}`);
        if (!container) return;
        container.innerHTML = `<div class="loading">${MESSAGES.LOADING}</div>`;
        try {
            // Carrega todas as receitas da seção
            const result = await this.controller.carregarReceitasPorSecao(secao);
            if (!result.success) {
                container.innerHTML = `<div class="error">${result.error || MESSAGES.ERROR_GENERIC}</div>`;
                return;
            }
            const receitas = result.data;
            // Busca receita preferida
            const preferidaResult = await this.controller.obterReceitaPreferida(secao);
            const preferidaId = (preferidaResult.success && preferidaResult.data) ? preferidaResult.data.id : null;

            let html = '';
            if (receitas.length === 0) {
                html += `<div class="empty">Nenhuma receita cadastrada para esta seção.</div>`;
            } else {
                html += `<ul class="lista-receitas">`;
                receitas.forEach(receita => {
                    const isPreferida = receita.id === preferidaId;
                    html += `
                        <li class="receita-item${isPreferida ? ' preferida' : ''}" data-id="${receita.id}">
                            <div class="receita-header">
                                <h4>${receita.titulo}</h4>
                                <button class="btn-preferencia" data-id="${receita.id}" data-secao="${secao}" title="${isPreferida ? 'Desmarcar preferência' : 'Marcar como preferida'}">
                                    ${isPreferida ? '★' : '☆'}
                                </button>
                                <button class="btn-editar" data-id="${receita.id}" data-secao="${secao}" title="Editar">✏️</button>
                                <button class="btn-excluir" data-id="${receita.id}" data-secao="${secao}" title="Excluir">🗑️</button>
                            </div>
                            <div class="receita-detalhes">
                                <p><strong>Ingredientes:</strong></p>
                                <ul>${receita.ingredientes.map(ing => `<li>${ing}</li>`).join('')}</ul>
                                <p><strong>Preparo:</strong> ${receita.preparo}</p>
                                ${receita.calorias ? `<p><strong>Valores nutricionais:</strong> ${receita.calorias}</p>` : ''}
                            </div>
                        </li>
                    `;
                });
                html += `</ul>`;
            }
            html += `<button class="btn-adicionar" data-secao="${secao}">➕ Nova Receita</button>`;
            container.innerHTML = html;
            this.bindSecaoEvents(container, secao);
        } catch (err) {
            container.innerHTML = `<div class="error">${MESSAGES.ERROR_GENERIC}</div>`;
        }
    }

    bindSecaoEvents(container, secao) {
        // Preferência
        container.querySelectorAll('.btn-preferencia').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const receitaId = btn.getAttribute('data-id');
                await this.controller.alternarPreferencia(receitaId, secao);
                await this.renderSecao(secao);
            });
        });
        // Editar (placeholder)
        container.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                alert('Função de edição será implementada em breve.');
            });
        });
        // Excluir
        container.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if (confirm('Tem certeza que deseja excluir esta receita?')) {
                    const receitaId = btn.getAttribute('data-id');
                    await this.controller.removerReceita(receitaId);
                    await this.renderSecao(secao);
                }
            });
        });
        // Adicionar (placeholder)
        container.querySelectorAll('.btn-adicionar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                alert('Função de adicionar receita será implementada em breve.');
            });
        });
    }

    bindGlobalEvents() {
        // Futuro: escuta de storage/eventos para atualização em tempo real
        window.addEventListener('focus', () => this.renderTodasSecoes());
    }
}

// Inicializa a página ao carregar
window.addEventListener('DOMContentLoaded', () => {
    new PlanoAlimentarPage();
}); 