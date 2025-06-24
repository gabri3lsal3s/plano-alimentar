import PreferenciaModel from '../models/PreferenciaModel.js';

describe('PreferenciaModel', () => {
  const model = new PreferenciaModel();

  it('valida dados obrigatórios corretamente', () => {
    const valid = model.validate({ secao: 'almoco', receita_id: '123' });
    expect(valid.isValid).toBe(true);
  });

  it('detecta dados inválidos', () => {
    const invalid = model.validate({ secao: '', receita_id: '' });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.length).toBeGreaterThan(0);
  });

  it('formata dados para exibição', () => {
    const preferencia = {
      secao: 'almoco',
      receita_id: '123',
      criada_em: '2024-01-01T12:00:00Z',
    };
    const formatada = model.formatForDisplay(preferencia);
    expect(formatada.secao).toBe('almoco');
    expect(formatada.receita_id).toBe('123');
    expect(formatada.criada_em instanceof Date).toBe(true);
  });
}); 