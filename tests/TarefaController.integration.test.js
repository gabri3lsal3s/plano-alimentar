import TarefaController from '../controllers/TarefaController.js';
import supabaseService from '../services/SupabaseService.js';

jest.mock('../services/SupabaseService.js');

describe('TarefaController (integração)', () => {
  let controller;
  const userId = 'user1';
  const tarefaBase = {
    titulo: 'Estudar Jest',
    descricao: 'Testes de integração',
  };
  let tarefaCriada = null;

  beforeEach(() => {
    controller = new TarefaController();
    supabaseService.getCurrentUserId.mockResolvedValue(userId);
  });

  it('deve criar, listar, atualizar e remover uma tarefa', async () => {
    // Mock insert
    supabaseService.insert.mockResolvedValue({ success: true, data: [{ ...tarefaBase, id: 't1', owner_id: userId, criada_em: '2024-01-01T12:00:00Z', feita: false }] });
    // Criar tarefa
    const createResult = await controller.criarTarefa(tarefaBase);
    expect(createResult.success).toBe(true);
    tarefaCriada = createResult.data;
    expect(tarefaCriada.titulo).toBe('Estudar Jest');

    // Mock select (listar)
    supabaseService.select.mockResolvedValue({ success: true, data: [tarefaCriada] });
    const listResult = await controller.carregarTarefas();
    expect(listResult.success).toBe(true);
    expect(listResult.data.length).toBeGreaterThan(0);
    expect(listResult.data[0].titulo).toBe('Estudar Jest');

    // Mock update
    supabaseService.update.mockResolvedValue({ success: true, data: [{ ...tarefaCriada, titulo: 'Estudar Jest Avançado', atualizada_em: '2024-01-02T12:00:00Z' }] });
    supabaseService.select.mockResolvedValue({ success: true, data: [{ ...tarefaCriada, titulo: 'Estudar Jest Avançado', atualizada_em: '2024-01-02T12:00:00Z' }] });
    const updateResult = await controller.atualizarTarefa(tarefaCriada.id, { ...tarefaBase, titulo: 'Estudar Jest Avançado' });
    expect(updateResult.success).toBe(true);
    expect(updateResult.data.titulo).toBe('Estudar Jest Avançado');

    // Mock delete
    supabaseService.delete.mockResolvedValue({ success: true });
    const deleteResult = await controller.removerTarefa(tarefaCriada.id);
    expect(deleteResult.success).toBe(true);
  });
}); 