import PreferenciaController from '../controllers/PreferenciaController.js';
import PreferenciaModel from '../models/PreferenciaModel.js';
import supabaseService from '../services/SupabaseService.js';

jest.mock('../models/PreferenciaModel.js');
jest.mock('../services/SupabaseService.js');

describe('PreferenciaController', () => {
  let controller;
  beforeEach(() => {
    PreferenciaModel.mockClear();
    supabaseService.getCurrentUserId.mockReset();
    controller = new PreferenciaController();
    controller.model.validate = jest.fn(() => ({ isValid: true, errors: [] }));
  });

  it('carrega preferências com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.getAllByUser = jest.fn().mockResolvedValue({ success: true, data: [{ secao: 'almoco', receita_id: '1', criada_em: '2024-01-01T12:00:00Z' }] });
    controller.model.formatForDisplay = jest.fn(pref => ({ ...pref, criada_em: new Date(pref.criada_em) }));
    const result = await controller.carregarPreferencias();
    expect(result.success).toBe(true);
    expect(result.data[0].secao).toBe('almoco');
    expect(result.data[0].criada_em instanceof Date).toBe(true);
  });

  it('retorna erro se usuário não autenticado ao carregar preferências', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue(null);
    const result = await controller.carregarPreferencias();
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/autenticado/);
  });

  it('salva preferência com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.upsert = jest.fn().mockResolvedValue({ success: true, data: { secao: 'almoco', receita_id: '1', criada_em: '2024-01-01T12:00:00Z' } });
    controller.model.formatForDisplay = jest.fn(pref => ({ ...pref, criada_em: new Date(pref.criada_em) }));
    const result = await controller.salvarPreferencia('almoco', '1');
    expect(result.success).toBe(true);
    expect(result.data.secao).toBe('almoco');
  });

  it('retorna erro se dados inválidos ao salvar preferência', async () => {
    controller.model.validate = jest.fn(() => ({ isValid: false, errors: ['erro'] }));
    const result = await controller.salvarPreferencia('', '');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/inválidos/);
  });

  it('remove preferência com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.delete = jest.fn().mockResolvedValue({ success: true });
    const result = await controller.removerPreferencia('almoco');
    expect(result.success).toBe(true);
  });

  it('retorna erro se usuário não autenticado ao remover preferência', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue(null);
    const result = await controller.removerPreferencia('almoco');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/autenticado/);
  });
}); 