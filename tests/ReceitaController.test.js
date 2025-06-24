import ReceitaController from '../controllers/ReceitaController.js';
import ReceitaModel from '../models/ReceitaModel.js';
import supabaseService from '../services/SupabaseService.js';

jest.mock('../models/ReceitaModel.js');
jest.mock('../services/SupabaseService.js');

describe('ReceitaController', () => {
  let controller;
  beforeEach(() => {
    ReceitaModel.mockClear();
    supabaseService.getCurrentUserId.mockReset();
    controller = new ReceitaController();
    controller.model.validate = jest.fn(() => ({ isValid: true, errors: [] }));
  });

  it('carrega receitas com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.getAllByUser = jest.fn().mockResolvedValue({ success: true, data: [{ titulo: 'Receita', criada_em: '2024-01-01T12:00:00Z' }] });
    controller.model.formatForDisplay = jest.fn(receita => ({ ...receita, criada_em: new Date(receita.criada_em) }));
    const result = await controller.carregarReceitas();
    expect(result.success).toBe(true);
    expect(result.data[0].titulo).toBe('Receita');
    expect(result.data[0].criada_em instanceof Date).toBe(true);
  });

  it('retorna erro se usuário não autenticado ao carregar receitas', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue(null);
    const result = await controller.carregarReceitas();
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/autenticado/);
  });

  it('cria receita com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.create = jest.fn().mockResolvedValue({ success: true, data: { titulo: 'Nova', criada_em: '2024-01-01T12:00:00Z' } });
    controller.model.formatForDisplay = jest.fn(receita => ({ ...receita, criada_em: new Date(receita.criada_em) }));
    const result = await controller.criarReceita({ titulo: 'Nova', secao: 'almoco', ingredientes: ['a'], preparo: 'b' });
    expect(result.success).toBe(true);
    expect(result.data.titulo).toBe('Nova');
  });

  it('retorna erro se dados inválidos ao criar receita', async () => {
    controller.model.validate = jest.fn(() => ({ isValid: false, errors: ['erro'] }));
    const result = await controller.criarReceita({ titulo: '' });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/inválidos/);
  });

  it('remove receita com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.delete = jest.fn().mockResolvedValue({ success: true });
    const result = await controller.removerReceita('id1');
    expect(result.success).toBe(true);
  });

  it('retorna erro se usuário não autenticado ao remover receita', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue(null);
    const result = await controller.removerReceita('id1');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/autenticado/);
  });

  it('alterna preferência de receita com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.preferenciaController = { alternarPreferencia: jest.fn().mockResolvedValue({ success: true, data: { id: 'id1' } }) };
    const result = await controller.alternarPreferencia('id1', 'almoco');
    expect(result.success).toBe(true);
    expect(result.data.id).toBe('id1');
  });
}); 