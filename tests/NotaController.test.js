import NotaController from '../controllers/NotaController.js';
import NotaModel from '../models/NotaModel.js';
import supabaseService from '../services/SupabaseService.js';

jest.mock('../models/NotaModel.js');
jest.mock('../services/SupabaseService.js');

describe('NotaController', () => {
  let controller;
  beforeEach(() => {
    NotaModel.mockClear();
    supabaseService.getCurrentUserId.mockReset();
    controller = new NotaController();
    controller.model.validate = jest.fn(() => ({ isValid: true, errors: [] }));
  });

  it('carrega notas com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.getAllByUser = jest.fn().mockResolvedValue({ success: true, data: [{ conteudo: 'A', criada_em: '2024-01-01T12:00:00Z' }] });
    controller.model.formatForDisplay = jest.fn(nota => ({ ...nota, criada_em: new Date(nota.criada_em) }));
    const result = await controller.carregarNotas();
    expect(result.success).toBe(true);
    expect(result.data[0].conteudo).toBe('A');
    expect(result.data[0].criada_em instanceof Date).toBe(true);
  });

  it('retorna erro se usuário não autenticado ao carregar notas', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue(null);
    const result = await controller.carregarNotas();
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/autenticado/);
  });

  it('cria nota com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.create = jest.fn().mockResolvedValue({ success: true, data: { conteudo: 'Nova', criada_em: '2024-01-01T12:00:00Z' } });
    controller.model.formatForDisplay = jest.fn(nota => ({ ...nota, criada_em: new Date(nota.criada_em) }));
    const result = await controller.criarNota({ conteudo: 'Nova' });
    expect(result.success).toBe(true);
    expect(result.data.conteudo).toBe('Nova');
  });

  it('retorna erro se dados inválidos ao criar nota', async () => {
    controller.model.validate = jest.fn(() => ({ isValid: false, errors: ['erro'] }));
    const result = await controller.criarNota({ conteudo: '' });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/inválidos/);
  });

  it('remove nota com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.delete = jest.fn().mockResolvedValue({ success: true });
    const result = await controller.removerNota('id1');
    expect(result.success).toBe(true);
  });

  it('retorna erro se usuário não autenticado ao remover nota', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue(null);
    const result = await controller.removerNota('id1');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/autenticado/);
  });
}); 