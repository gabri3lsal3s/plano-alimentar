import TarefaModel from '../models/TarefaModel.js';

describe('TarefaModel', () => {
  const model = new TarefaModel();

  it('valida dados obrigatórios corretamente', () => {
    const valid = model.validate({ titulo: 'Tarefa', descricao: 'Descrição' });
    expect(valid.isValid).toBe(true);
  });

  it('detecta dados inválidos', () => {
    const invalid = model.validate({ titulo: '' });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.length).toBeGreaterThan(0);
  });

  it('formata dados para exibição', () => {
    const tarefa = {
      titulo: 'Tarefa',
      descricao: 'Descrição',
      criada_em: '2024-01-01T12:00:00Z',
      concluida: false
    };
    const formatada = model.formatForDisplay(tarefa);
    expect(formatada.titulo).toBe('Tarefa');
    expect(formatada.descricao).toBe('Descrição');
    expect(formatada.criada_em instanceof Date).toBe(true);
    expect(typeof formatada.concluida).toBe('boolean');
  });
}); 