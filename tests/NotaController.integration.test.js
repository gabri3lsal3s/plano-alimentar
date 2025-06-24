import NotaController from '../controllers/NotaController.js';
import supabaseService from '../services/SupabaseService.js';

jest.mock('../services/SupabaseService.js');

describe('NotaController (integração)', () => {
  let controller;
  const userId = 'user1';
  const notaBase = {
    conteudo: 'Minha primeira nota',
  };
  let notaCriada = null;

  beforeEach(() => {
    controller = new NotaController();
    supabaseService.getCurrentUserId.mockResolvedValue(userId);
  });

  it('deve criar, listar, atualizar e remover uma nota', async () => {
    // Mock insert
    supabaseService.insert.mockResolvedValue({ success: true, data: [{ ...notaBase, id: 'n1', owner_id: userId, criada_em: '2024-01-01T12:00:00Z' }] });
    // Criar nota
    const createResult = await controller.criarNota(notaBase);
    expect(createResult.success).toBe(true);
    notaCriada = createResult.data;
    expect(notaCriada.conteudo).toBe('Minha primeira nota');

    // Mock select (listar)
    supabaseService.select.mockResolvedValue({ success: true, data: [notaCriada] });
    const listResult = await controller.carregarNotas();
    expect(listResult.success).toBe(true);
    expect(listResult.data.length).toBeGreaterThan(0);
    expect(listResult.data[0].conteudo).toBe('Minha primeira nota');

    // Mock update
    supabaseService.update.mockResolvedValue({ success: true, data: [{ ...notaCriada, conteudo: 'Nota atualizada', atualizada_em: '2024-01-02T12:00:00Z' }] });
    supabaseService.select.mockResolvedValue({ success: true, data: [{ ...notaCriada, conteudo: 'Nota atualizada', atualizada_em: '2024-01-02T12:00:00Z' }] });
    const updateResult = await controller.atualizarNota(notaCriada.id, { conteudo: 'Nota atualizada' });
    expect(updateResult.success).toBe(true);
    expect(updateResult.data.conteudo).toBe('Nota atualizada');

    // Mock delete
    supabaseService.delete.mockResolvedValue({ success: true });
    const deleteResult = await controller.removerNota(notaCriada.id);
    expect(deleteResult.success).toBe(true);
  });
}); 