// ===================== PÁGINA: NotasPage ===================== //

import NotaController from '../../controllers/NotaController.js';
import NotaCard from '../components/NotaCard.js';

const controller = new NotaController();

/**
 * Renderiza a página de notas
 * @param {HTMLElement} container - Elemento onde a página será renderizada
 */
export default function NotasPage(container) {
    container.innerHTML = '';

    // Header
    const header = document.createElement('header');
    header.innerHTML = '<h2>Minhas Notas</h2>';
    container.appendChild(header);

    // Formulário de nova nota
    const form = document.createElement('form');
    form.className = 'nota-form';
    form.innerHTML = `
        <textarea name="conteudo" placeholder="Escreva sua nota aqui..." maxlength="2000" required></textarea>
        <button type="submit">Adicionar</button>
    `;
    container.appendChild(form);

    // Mensagem de feedback
    const feedback = document.createElement('div');
    feedback.className = 'nota-feedback';
    container.appendChild(feedback);

    // Lista de notas
    const lista = document.createElement('div');
    lista.className = 'notas-lista';
    container.appendChild(lista);

    // Função para exibir feedback
    function showFeedback(msg, isError = false) {
        feedback.textContent = msg;
        feedback.style.color = isError ? 'red' : 'green';
        setTimeout(() => { feedback.textContent = ''; }, 3000);
    }

    // Função para renderizar notas
    async function renderNotas() {
        lista.innerHTML = '<p>Carregando notas...</p>';
        const result = await controller.carregarNotas();
        lista.innerHTML = '';
        if (!result.success) {
            lista.innerHTML = `<p class="erro">${result.error}</p>`;
            return;
        }
        if (result.data.length === 0) {
            lista.innerHTML = '<p>Nenhuma nota encontrada.</p>';
            return;
        }
        result.data.forEach(nota => {
            const card = NotaCard(nota, {
                onEdit: handleEdit,
                onDelete: handleDelete
            });
            lista.appendChild(card);
        });
    }

    // Handler para criar nota
    form.onsubmit = async (e) => {
        e.preventDefault();
        const conteudo = form.conteudo.value.trim();
        if (!conteudo) {
            showFeedback('Conteúdo é obrigatório', true);
            return;
        }
        const result = await controller.criarNota({ conteudo });
        if (result.success) {
            showFeedback('Nota criada com sucesso!');
            form.reset();
            renderNotas();
        } else {
            showFeedback(result.error || 'Erro ao criar nota', true);
        }
    };

    // Handler para editar nota
    async function handleEdit(nota) {
        const novoConteudo = prompt('Editar conteúdo da nota:', nota.texto || nota.conteudo || '');
        if (novoConteudo === null) return;
        if (!novoConteudo.trim()) {
            showFeedback('Conteúdo não pode ser vazio', true);
            return;
        }
        
        const result = await controller.atualizarNota(nota.id, {
            conteudo: novoConteudo.trim()
        });
        
        if (result.success) {
            showFeedback('Nota atualizada!');
            renderNotas();
        } else {
            showFeedback(result.error || 'Erro ao atualizar nota', true);
        }
    }

    // Handler para deletar nota
    async function handleDelete(nota) {
        if (!confirm('Deseja realmente excluir esta nota?')) return;
        const result = await controller.removerNota(nota.id);
        if (result.success) {
            showFeedback('Nota removida!');
            renderNotas();
        } else {
            showFeedback(result.error || 'Erro ao remover nota', true);
        }
    }

    // Inicializa a página
    renderNotas();
} 