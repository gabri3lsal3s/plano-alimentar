// supabaseTarefas.js
// Módulo de persistência e controle de tarefas usando Supabase (padrão MVC)
// Model: acesso ao banco | Controller: lógica de negócio | View: integrada na UI principal

// ===================== MODEL ===================== //

// Busca todas as tarefas do usuário
async function getTarefas(userId) {
  return await window.supabase
    .from('tarefas')
    .select('*')
    .eq('owner_id', userId)
    .order('criada_em', { ascending: false });
}

// Cria uma nova tarefa
async function addTarefa(descricao, userId) {
  return await window.supabase
    .from('tarefas')
    .insert([{ descricao, feita: false, owner_id: userId }]);
}

// Atualiza o status (feita/não feita) de uma tarefa
async function updateTarefaStatus(tarefaId, feita, userId) {
  return await window.supabase
    .from('tarefas')
    .update({ feita })
    .eq('id', tarefaId)
    .eq('owner_id', userId);
}

// Remove uma tarefa
async function deleteTarefa(tarefaId, userId) {
  return await window.supabase
    .from('tarefas')
    .delete()
    .eq('id', tarefaId)
    .eq('owner_id', userId);
}

// ===================== CONTROLLER ===================== //

// Orquestrador para buscar tarefas e tratar erros
async function buscarTarefasController(userId) {
  const { data, error } = await getTarefas(userId);
  if (error) {
    console.error('Erro ao buscar tarefas:', error.message);
    return { data: [], error };
  }
  return { data, error: null };
}

// Orquestrador para adicionar tarefa
async function adicionarTarefaController(descricao, userId) {
  const { data, error } = await addTarefa(descricao, userId);
  if (error) {
    console.error('Erro ao adicionar tarefa:', error.message);
  }
  return { data, error };
}

// Orquestrador para atualizar status
async function atualizarStatusTarefaController(tarefaId, feita, userId) {
  const { data, error } = await updateTarefaStatus(tarefaId, feita, userId);
  if (error) {
    console.error('Erro ao atualizar tarefa:', error.message);
  }
  return { data, error };
}

// Orquestrador para remover tarefa
async function removerTarefaController(tarefaId, userId) {
  const { data, error } = await deleteTarefa(tarefaId, userId);
  if (error) {
    console.error('Erro ao remover tarefa:', error.message);
  }
  return { data, error };
}

// Exporta funções principais para uso na View/UI
window.supabaseTarefas = {
  buscarTarefasController,
  adicionarTarefaController,
  atualizarStatusTarefaController,
  removerTarefaController
}; 