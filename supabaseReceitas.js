// supabaseReceitas.js
// Módulo de persistência e controle de receitas usando Supabase (padrão MVC)
// Model: acesso ao banco | Controller: lógica de negócio | View: integrada na UI principal

// ===================== MODEL ===================== //

// Busca todas as receitas do usuário
async function getReceitas(userId) {
  return await window.supabase
    .from('receitas')
    .select('*')
    .eq('owner_id', userId)
    .order('criada_em', { ascending: false });
}

// Cria uma nova receita
async function addReceita(receitaObj, userId) {
  return await window.supabase
    .from('receitas')
    .insert([{ ...receitaObj, owner_id: userId }]);
}

// Atualiza uma receita existente
async function updateReceita(receitaId, receitaObj, userId) {
  return await window.supabase
    .from('receitas')
    .update({ ...receitaObj })
    .eq('id', receitaId)
    .eq('owner_id', userId);
}

// Remove uma receita
async function deleteReceita(receitaId, userId) {
  return await window.supabase
    .from('receitas')
    .delete()
    .eq('id', receitaId)
    .eq('owner_id', userId);
}

// ===================== CONTROLLER ===================== //

// Orquestrador para buscar receitas e tratar erros
async function buscarReceitasController(userId) {
  const { data, error } = await getReceitas(userId);
  if (error) {
    console.error('Erro ao buscar receitas:', error.message);
    return { data: [], error };
  }
  return { data, error: null };
}

// Orquestrador para adicionar receita
async function adicionarReceitaController(receitaObj, userId) {
  const { data, error } = await addReceita(receitaObj, userId);
  if (error) {
    console.error('Erro ao adicionar receita:', error.message);
  }
  return { data, error };
}

// Orquestrador para atualizar receita
async function atualizarReceitaController(receitaId, receitaObj, userId) {
  const { data, error } = await updateReceita(receitaId, receitaObj, userId);
  if (error) {
    console.error('Erro ao atualizar receita:', error.message);
  }
  return { data, error };
}

// Orquestrador para remover receita
async function removerReceitaController(receitaId, userId) {
  const { data, error } = await deleteReceita(receitaId, userId);
  if (error) {
    console.error('Erro ao remover receita:', error.message);
  }
  return { data, error };
}

// Exporta funções principais para uso na View/UI
window.supabaseReceitas = {
  buscarReceitasController,
  adicionarReceitaController,
  atualizarReceitaController,
  removerReceitaController
}; 