// ===================== PÁGINA: TarefasPage ===================== //

import TarefaController from '../../controllers/TarefaController.js';
import TarefaCard from '../components/TarefaCard.js';

const controller = new TarefaController();

/**
 * Renderiza a página de tarefas
 * @param {HTMLElement} container - Elemento onde a página será renderizada
 */
export default function TarefasPage(container) {
    container.innerHTML = '';

    // Header
    const header = document.createElement('header');
    header.innerHTML = '<h2>Minhas Tarefas</h2>';
    container.appendChild(header);

    // Formulário de nova tarefa
    const form = document.createElement('form');
    form.className = 'tarefa-form';
    form.innerHTML = `
        <input type="text" name="titulo" placeholder="Título da tarefa" maxlength="80" required />
        <input type="text" name="descricao" placeholder="Descrição (opcional)" maxlength="500" />
        <button type="submit">Adicionar</button>
    `;
    container.appendChild(form);

    // Mensagem de feedback
    const feedback = document.createElement('div');
    feedback.className = 'tarefa-feedback';
    container.appendChild(feedback);

    // Lista de tarefas
    const lista = document.createElement('div');
    lista.className = 'tarefas-lista';
    container.appendChild(lista);

    // Função para exibir feedback
    function showFeedback(msg, isError = false) {
        feedback.textContent = msg;
        feedback.style.color = isError ? 'red' : 'green';
        setTimeout(() => { feedback.textContent = ''; }, 3000);
    }

    // Função para renderizar tarefas
    async function renderTarefas() {
        lista.innerHTML = '<p>Carregando tarefas...</p>';
        const result = await controller.carregarTarefas();
        lista.innerHTML = '';
        if (!result.success) {
            lista.innerHTML = `<p class="erro">${result.error}</p>`;
            return;
        }
        if (result.data.length === 0) {
            lista.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
            return;
        }
        // Ordena pendentes primeiro
        const pendentes = result.data.filter(t => !t.feita);
        const concluidas = result.data.filter(t => t.feita);
        [...pendentes, ...concluidas].forEach(tarefa => {
            const card = TarefaCard(tarefa, {
                onEdit: handleEdit,
                onDelete: handleDelete,
                onToggle: handleToggle
            });
            lista.appendChild(card);
        });
    }

    // Handler para criar tarefa
    form.onsubmit = async (e) => {
        e.preventDefault();
        const titulo = form.titulo.value.trim();
        const descricao = form.descricao.value.trim();
        if (!titulo) {
            showFeedback('Título é obrigatório', true);
            return;
        }
        const result = await controller.criarTarefa({ titulo, descricao });
        if (result.success) {
            showFeedback('Tarefa criada com sucesso!');
            form.reset();
            renderTarefas();
        } else {
            showFeedback(result.error || 'Erro ao criar tarefa', true);
        }
    };

    // Handler para editar tarefa
    async function handleEdit(tarefa) {
        const novoTitulo = prompt('Editar título da tarefa:', tarefa.titulo);
        if (novoTitulo === null) return;
        const novaDescricao = prompt('Editar descrição:', tarefa.descricao || '');
        if (novaDescricao === null) return;
        const result = await controller.atualizarTarefa(tarefa.id, {
            titulo: novoTitulo.trim(),
            descricao: novaDescricao.trim()
        });
        if (result.success) {
            showFeedback('Tarefa atualizada!');
            renderTarefas();
        } else {
            showFeedback(result.error || 'Erro ao atualizar tarefa', true);
        }
    }

    // Handler para deletar tarefa
    async function handleDelete(tarefa) {
        if (!confirm('Deseja realmente excluir esta tarefa?')) return;
        const result = await controller.removerTarefa(tarefa.id);
        if (result.success) {
            showFeedback('Tarefa removida!');
            renderTarefas();
        } else {
            showFeedback(result.error || 'Erro ao remover tarefa', true);
        }
    }

    // Handler para marcar/desmarcar como concluída
    async function handleToggle(tarefa) {
        const result = await controller.toggleConcluida(tarefa.id, !tarefa.feita);
        if (result.success) {
            showFeedback(result.message || 'Status alterado!');
            renderTarefas();
        } else {
            showFeedback(result.error || 'Erro ao alterar status', true);
        }
    }

    // Inicializa a página
    renderTarefas();
} 