import ReceitaController from '../controllers/ReceitaController.js';
import supabaseService from '../services/SupabaseService.js';

jest.mock('../services/SupabaseService.js');

describe('ReceitaController (integração)', () => {
  let controller;
  const userId = 'user1';
  const receitaBase = {
    titulo: 'Arroz Integral',
    secao: 'almoco',
    ingredientes: ['arroz', 'água'],
    preparo: 'Cozinhe tudo',
    calorias: '100'
  };
  let receitaCriada = null;

  beforeEach(() => {
    controller = new ReceitaController();
    supabaseService.getCurrentUserId.mockResolvedValue(userId);
  });

  it('deve criar, listar, atualizar e remover uma receita', async () => {
    // Mock insert
    supabaseService.insert.mockResolvedValue({ success: true, data: [{ ...receitaBase, id: 'r1', owner_id: userId, criada_em: '2024-01-01T12:00:00Z' }] });
    // Criar receita
    const createResult = await controller.criarReceita(receitaBase);
    expect(createResult.success).toBe(true);
    receitaCriada = createResult.data;
    expect(receitaCriada.titulo).toBe('Arroz Integral');

    // Mock select (listar)
    supabaseService.select.mockResolvedValue({ success: true, data: [receitaCriada] });
    const listResult = await controller.carregarReceitas();
    expect(listResult.success).toBe(true);
    expect(listResult.data.length).toBeGreaterThan(0);
    expect(listResult.data[0].titulo).toBe('Arroz Integral');

    // Mock update
    supabaseService.update.mockResolvedValue({ success: true, data: [{ ...receitaCriada, titulo: 'Arroz Integral Light', atualizada_em: '2024-01-02T12:00:00Z' }] });
    supabaseService.select.mockResolvedValue({ success: true, data: [{ ...receitaCriada, titulo: 'Arroz Integral Light', atualizada_em: '2024-01-02T12:00:00Z' }] });
    const updateResult = await controller.atualizarReceita(receitaCriada.id, { ...receitaBase, titulo: 'Arroz Integral Light' });
    expect(updateResult.success).toBe(true);
    expect(updateResult.data.titulo).toBe('Arroz Integral Light');

    // Mock delete
    supabaseService.delete.mockResolvedValue({ success: true });
    const deleteResult = await controller.removerReceita(receitaCriada.id);
    expect(deleteResult.success).toBe(true);
  });
}); 