// supabaseNotas.js
// Módulo de persistência e controle de notas usando Supabase (padrão MVC)
// Model: acesso ao banco | Controller: lógica de negócio | View: integrada na UI principal

// ===================== MODEL ===================== //

// Busca todas as notas do usuário
async function getNotas(userId) {
  return await window.supabase
    .from('notas')
    .select('*')
    .eq('owner_id', userId)
    .order('criada_em', { ascending: false });
}

// Cria uma nova nota
async function addNota(texto, userId) {
  return await window.supabase
    .from('notas')
    .insert([{ texto, owner_id: userId }]);
}

// Remove uma nota
async function deleteNota(notaId, userId) {
  return await window.supabase
    .from('notas')
    .delete()
    .eq('id', notaId)
    .eq('owner_id', userId);
}

// ===================== CONTROLLER ===================== //

// Orquestrador para buscar notas e tratar erros
async function buscarNotasController(userId) {
  const { data, error } = await getNotas(userId);
  if (error) {
    console.error('Erro ao buscar notas:', error.message);
    return { data: [], error };
  }
  return { data, error: null };
}

// Orquestrador para adicionar nota
async function adicionarNotaController(texto, userId) {
  const { data, error } = await addNota(texto, userId);
  if (error) {
    console.error('Erro ao adicionar nota:', error.message);
  }
  return { data, error };
}

// Orquestrador para remover nota
async function removerNotaController(notaId, userId) {
  const { data, error } = await deleteNota(notaId, userId);
  if (error) {
    console.error('Erro ao remover nota:', error.message);
  }
  return { data, error };
}

// Exporta funções principais para uso na View/UI
window.supabaseNotas = {
  buscarNotasController,
  adicionarNotaController,
  removerNotaController
}; 