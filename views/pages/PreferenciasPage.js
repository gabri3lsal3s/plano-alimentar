// ===================== PÁGINA: PreferenciasPage ===================== //

import PreferenciaController from '../../controllers/PreferenciaController.js';
import ReceitaModel from '../../models/ReceitaModel.js';
import { REFEICOES_HORARIOS, MESSAGES } from '../../utils/constants.js';

const preferenciaController = new PreferenciaController();
const receitaModel = new ReceitaModel();

/**
 * Renderiza a página de preferências alimentares
 * @param {HTMLElement} container - Elemento onde a página será renderizada
 */
export default async function PreferenciasPage(container) {
    container.innerHTML = '';

    // Header
    const header = document.createElement('header');
    header.innerHTML = '<h2>Minhas Preferências Alimentares</h2>';
    container.appendChild(header);

    // Mensagem de feedback
    const feedback = document.createElement('div');
    feedback.className = 'preferencia-feedback';
    container.appendChild(feedback);

    // Lista de preferências por seção
    const lista = document.createElement('div');
    lista.className = 'preferencias-lista';
    container.appendChild(lista);

    // Função para exibir feedback
    function showFeedback(msg, isError = false) {
        feedback.textContent = msg;
        feedback.style.color = isError ? 'red' : 'green';
        setTimeout(() => { feedback.textContent = ''; }, 3000);
    }

    // Função para renderizar preferências
    async function renderPreferencias() {
        lista.innerHTML = `<p>${MESSAGES.LOADING}</p>`;
        const userId = await receitaModel.getAllByUser.toString().includes('userId')
            ? await receitaModel.getAllByUser.length > 0 ? await receitaModel.getAllByUser() : null
            : null;
        const preferenciasResult = await preferenciaController.carregarPreferencias();
        if (!preferenciasResult.success) {
            lista.innerHTML = `<p class="erro">${preferenciasResult.error}</p>`;
            return;
        }
        const preferencias = preferenciasResult.data;
        lista.innerHTML = '';

        // Para cada seção de refeição
        for (const secaoKey of Object.keys(REFEICOES_HORARIOS)) {
            const secaoInfo = REFEICOES_HORARIOS[secaoKey];
            const secaoDiv = document.createElement('div');
            secaoDiv.className = 'preferencia-secao';

            // Título da seção
            const titulo = document.createElement('h3');
            titulo.textContent = `${secaoInfo.nome} (${secaoInfo.horario})`;
            secaoDiv.appendChild(titulo);

            // Buscar receitas disponíveis para a seção
            const receitasResult = await receitaModel.getBySecao(secaoKey, null);
            let receitas = [];
            if (receitasResult.success) {
                receitas = receitasResult.data;
            }

            // Preferência atual
            const preferenciaAtual = preferencias.find(p => p.secao === secaoKey);

            // Select de receitas
            const select = document.createElement('select');
            select.className = 'preferencia-select';
            select.dataset.secao = secaoKey;
            const optionPadrao = document.createElement('option');
            optionPadrao.value = '';
            optionPadrao.textContent = 'Selecione uma receita preferida';
            select.appendChild(optionPadrao);
            receitas.forEach(receita => {
                const option = document.createElement('option');
                option.value = receita.id;
                option.textContent = receita.titulo;
                if (preferenciaAtual && preferenciaAtual.receita_id === receita.id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });

            // Botão para salvar preferência
            const btnSalvar = document.createElement('button');
            btnSalvar.textContent = 'Salvar';
            btnSalvar.onclick = async () => {
                const receitaId = select.value;
                if (!receitaId) {
                    showFeedback('Selecione uma receita para salvar.', true);
                    return;
                }
                const result = await preferenciaController.salvarPreferencia(secaoKey, receitaId);
                if (result.success) {
                    showFeedback('Preferência salva com sucesso!');
                    renderPreferencias();
                } else {
                    showFeedback(result.error || 'Erro ao salvar preferência', true);
                }
            };

            // Botão para remover preferência
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = async () => {
                const result = await preferenciaController.removerPreferencia(secaoKey);
                if (result.success) {
                    showFeedback('Preferência removida!');
                    renderPreferencias();
                } else {
                    showFeedback(result.error || 'Erro ao remover preferência', true);
                }
            };

            secaoDiv.appendChild(select);
            secaoDiv.appendChild(btnSalvar);
            if (preferenciaAtual) {
                secaoDiv.appendChild(btnRemover);
            }

            lista.appendChild(secaoDiv);
        }
    }

    // Inicializa a página
    renderPreferencias();
} 