// ===================== COMPONENTE: NotaCard ===================== //

/**
 * Componente para exibir uma nota individual
 * @param {Object} nota - Objeto da nota
 * @param {Object} options - Opções de callbacks (onEdit, onDelete)
 * @returns {HTMLElement} Elemento do card de nota
 */
export default function NotaCard(nota, options = {}) {
    const {
        onEdit = () => {},
        onDelete = () => {}
    } = options;

    const card = document.createElement('div');
    card.className = 'nota-card';
    card.dataset.id = nota.id;

    // Conteúdo
    const conteudo = document.createElement('p');
    conteudo.textContent = nota.texto || nota.conteudo || 'Nota sem conteúdo';
    card.appendChild(conteudo);

    // Datas
    const datas = document.createElement('div');
    datas.className = 'nota-datas';
    datas.innerHTML = `
        <small>Criada: ${nota.criada_em.toLocaleString('pt-BR')}</small>
    `;
    card.appendChild(datas);

    // Botões de ação
    const actions = document.createElement('div');
    actions.className = 'nota-actions';

    // Botão editar
    const btnEdit = document.createElement('button');
    btnEdit.className = 'btn-edit-nota';
    btnEdit.textContent = 'Editar';
    btnEdit.onclick = () => onEdit(nota);
    actions.appendChild(btnEdit);

    // Botão deletar
    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-delete-nota';
    btnDelete.textContent = 'Excluir';
    btnDelete.onclick = () => onDelete(nota);
    actions.appendChild(btnDelete);

    card.appendChild(actions);

    return card;
} 