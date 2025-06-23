// supabasePreferencias.js
// Módulo de persistência e controle de preferências de receitas usando Supabase (padrão MVC)
// Model: acesso ao banco | Controller: lógica de negócio | View: integrada na UI principal

// ===================== MODEL ===================== //

// Busca preferência do usuário para uma seção
async function getPreferencia(secao, userId) {
  return await window.supabase
    .from('preferencias_receitas')
    .select('receita_id')
    .eq('owner_id', userId)
    .eq('secao', secao)
    .single();
}

// Salva (upsert) preferência do usuário para uma seção
async function upsertPreferencia(secao, receitaId, userId) {
  return await window.supabase
    .from('preferencias_receitas')
    .upsert([
      { owner_id: userId, secao, receita_id: receitaId }
    ], { onConflict: ['owner_id', 'secao'] });
}

// Remove preferência do usuário para uma seção
async function deletePreferencia(secao, userId) {
  return await window.supabase
    .from('preferencias_receitas')
    .delete()
    .eq('owner_id', userId)
    .eq('secao', secao);
}

// ===================== CONTROLLER ===================== //

async function buscarPreferenciaController(secao, userId) {
  const { data, error } = await getPreferencia(secao, userId);
  if (error && error.code !== 'PGRST116') { // PGRST116: row not found
    console.error('Erro ao buscar preferência:', error.message);
    return null;
  }
  return data ? data.receita_id : null;
}

async function salvarPreferenciaController(secao, receitaId, userId) {
  const { error } = await upsertPreferencia(secao, receitaId, userId);
  if (error) {
    console.error('Erro ao salvar preferência:', error.message);
    return false;
  }
  return true;
}

async function removerPreferenciaController(secao, userId) {
  const { error } = await deletePreferencia(secao, userId);
  if (error) {
    console.error('Erro ao remover preferência:', error.message);
    return false;
  }
  return true;
}

// Exporta funções principais para uso na View/UI
window.supabasePreferencias = {
  buscarPreferenciaController,
  salvarPreferenciaController,
  removerPreferenciaController
}; 