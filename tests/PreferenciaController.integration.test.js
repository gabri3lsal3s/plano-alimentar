import PreferenciaController from '../controllers/PreferenciaController.js';
import supabaseService from '../services/SupabaseService.js';

jest.mock('../services/SupabaseService.js');

describe('PreferenciaController (integração)', () => {
  let controller;
  const userId = 'user1';
  const preferenciaBase = {
    secao: 'almoco',
    receita_id: 'r1',
  };
  let preferenciaCriada = null;

  beforeEach(() => {
    controller = new PreferenciaController();
    supabaseService.getCurrentUserId.mockResolvedValue(userId);
  });

  it('deve salvar, listar e remover uma preferência', async () => {
    // Mock upsert (salvar)
    supabaseService.insert = undefined; // garantir que não será chamado
    supabaseService.upsert = jest.fn().mockResolvedValue({ success: true, data: [{ ...preferenciaBase, id: 'p1', owner_id: userId, criada_em: '2024-01-01T12:00:00Z' }] });
    controller.model.upsert = async (secao, receitaId, userId) => ({ success: true, data: { ...preferenciaBase, secao, receita_id: receitaId, id: 'p1', owner_id: userId, criada_em: '2024-01-01T12:00:00Z' } });
    controller.model.formatForDisplay = pref => ({ ...pref, criada_em: new Date(pref.criada_em) });
    const saveResult = await controller.salvarPreferencia(preferenciaBase.secao, preferenciaBase.receita_id);
    expect(saveResult.success).toBe(true);
    preferenciaCriada = saveResult.data;
    expect(preferenciaCriada.secao).toBe('almoco');

    // Mock getAllByUser (listar)
    controller.model.getAllByUser = async (userId) => ({ success: true, data: [preferenciaCriada] });
    const listResult = await controller.carregarPreferencias();
    expect(listResult.success).toBe(true);
    expect(listResult.data.length).toBeGreaterThan(0);
    expect(listResult.data[0].secao).toBe('almoco');

    // Mock delete (remover)
    controller.model.delete = async (secao, userId) => ({ success: true });
    const deleteResult = await controller.removerPreferencia(preferenciaBase.secao);
    expect(deleteResult.success).toBe(true);
  });
}); 