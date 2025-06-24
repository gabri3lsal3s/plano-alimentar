import NotaModel from '../models/NotaModel.js';

describe('NotaModel', () => {
  const model = new NotaModel();

  it('valida dados obrigatórios corretamente', () => {
    const valid = model.validate({ conteudo: 'Minha nota' });
    expect(valid.isValid).toBe(true);
  });

  it('detecta dados inválidos', () => {
    const invalid = model.validate({ conteudo: '' });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.length).toBeGreaterThan(0);
  });

  it('formata dados para exibição', () => {
    const nota = {
      conteudo: 'Minha nota',
      criada_em: '2024-01-01T12:00:00Z',
    };
    const formatada = model.formatForDisplay(nota);
    expect(formatada.conteudo).toBe('Minha nota');
    expect(formatada.criada_em instanceof Date).toBe(true);
  });
}); 