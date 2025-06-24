import TarefaController from '../controllers/TarefaController.js';
import TarefaModel from '../models/TarefaModel.js';
import supabaseService from '../services/SupabaseService.js';

jest.mock('../models/TarefaModel.js');
jest.mock('../services/SupabaseService.js');

describe('TarefaController', () => {
  let controller;
  beforeEach(() => {
    TarefaModel.mockClear();
    supabaseService.getCurrentUserId.mockReset();
    controller = new TarefaController();
    controller.model.validate = jest.fn(() => ({ isValid: true, errors: [] }));
  });

  it('carrega tarefas com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.getAllByUser = jest.fn().mockResolvedValue({ success: true, data: [{ titulo: 'Tarefa', criada_em: '2024-01-01T12:00:00Z', feita: false }] });
    controller.model.formatForDisplay = jest.fn(tarefa => ({ ...tarefa, criada_em: new Date(tarefa.criada_em) }));
    const result = await controller.carregarTarefas();
    expect(result.success).toBe(true);
    expect(result.data[0].titulo).toBe('Tarefa');
    expect(result.data[0].criada_em instanceof Date).toBe(true);
  });

  it('retorna erro se usuário não autenticado ao carregar tarefas', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue(null);
    const result = await controller.carregarTarefas();
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/autenticado/);
  });

  it('cria tarefa com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.create = jest.fn().mockResolvedValue({ success: true, data: { titulo: 'Nova', criada_em: '2024-01-01T12:00:00Z', feita: false } });
    controller.model.formatForDisplay = jest.fn(tarefa => ({ ...tarefa, criada_em: new Date(tarefa.criada_em) }));
    const result = await controller.criarTarefa({ titulo: 'Nova' });
    expect(result.success).toBe(true);
    expect(result.data.titulo).toBe('Nova');
  });

  it('retorna erro se dados inválidos ao criar tarefa', async () => {
    controller.model.validate = jest.fn(() => ({ isValid: false, errors: ['erro'] }));
    const result = await controller.criarTarefa({ titulo: '' });
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/inválidos/);
  });

  it('remove tarefa com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.delete = jest.fn().mockResolvedValue({ success: true });
    const result = await controller.removerTarefa('id1');
    expect(result.success).toBe(true);
  });

  it('retorna erro se usuário não autenticado ao remover tarefa', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue(null);
    const result = await controller.removerTarefa('id1');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/autenticado/);
  });

  it('toggle de conclusão de tarefa com sucesso', async () => {
    supabaseService.getCurrentUserId.mockResolvedValue('user1');
    controller.model.toggleConcluida = jest.fn().mockResolvedValue({ success: true, data: { titulo: 'Tarefa', feita: true } });
    controller.model.formatForDisplay = jest.fn(tarefa => ({ ...tarefa }));
    const result = await controller.toggleConcluida('id1', true);
    expect(result.success).toBe(true);
    expect(result.data.feita).toBe(true);
  });
}); 