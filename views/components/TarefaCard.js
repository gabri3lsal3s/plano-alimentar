// ===================== COMPONENTE: TarefaCard ===================== //

/**
 * Componente para exibir uma tarefa individual
 * @param {Object} tarefa - Objeto da tarefa
 * @param {Object} options - Opções de callbacks (onEdit, onDelete, onToggle)
 * @returns {HTMLElement} Elemento do card de tarefa
 */
export default function TarefaCard(tarefa, options = {}) {
    const {
        onEdit = () => {},
        onDelete = () => {},
        onToggle = () => {}
    } = options;

    const card = document.createElement('div');
    card.className = `tarefa-card${tarefa.concluida ? ' concluida' : ''}`;
    card.dataset.id = tarefa.id;

    // Título
    const titulo = document.createElement('h3');
    titulo.textContent = tarefa.descricao || tarefa.titulo || 'Tarefa sem título';
    card.appendChild(titulo);

    // Descrição
    if (tarefa.descricao && tarefa.descricao !== tarefa.titulo) {
        const descricao = document.createElement('p');
        descricao.textContent = tarefa.descricao;
        card.appendChild(descricao);
    }

    // Status
    const status = document.createElement('span');
    status.className = 'tarefa-status';
    status.textContent = tarefa.concluida ? '✅ Concluída' : '⏳ Pendente';
    card.appendChild(status);

    // Datas
    const datas = document.createElement('div');
    datas.className = 'tarefa-datas';
    datas.innerHTML = `
        <small>Criada: ${tarefa.criada_em.toLocaleString('pt-BR')}</small>
        ${tarefa.atualizada_em ? `<small>Atualizada: ${tarefa.atualizada_em.toLocaleString('pt-BR')}</small>` : ''}
        ${tarefa.concluida_em ? `<small>Concluída: ${tarefa.concluida_em.toLocaleString('pt-BR')}</small>` : ''}
    `;
    card.appendChild(datas);

    // Botões de ação
    const actions = document.createElement('div');
    actions.className = 'tarefa-actions';

    // Botão concluir/desfazer
    const btnToggle = document.createElement('button');
    btnToggle.className = 'btn-toggle-tarefa';
    btnToggle.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
    btnToggle.title = tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída';
    btnToggle.onclick = () => onToggle(tarefa);
    actions.appendChild(btnToggle);

    // Botão editar
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn-edit-tarefa';
    btnEdit.textContent = 'Editar';
    btnEdit.onclick = () => onEdit(tarefa);
    actions.appendChild(btnEdit);

    // Botão deletar
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-delete-tarefa';
    btnDelete.textContent = 'Excluir';
    btnDelete.onclick = () => onDelete(tarefa);
    actions.appendChild(btnDelete);

    card.appendChild(actions);

    return card;
} 