import ReceitaModel from '../models/ReceitaModel.js';

describe('ReceitaModel', () => {
  const model = new ReceitaModel();

  it('valida dados obrigatórios corretamente', () => {
    const valid = model.validate({
      titulo: 'Arroz',
      secao: 'almoco',
      ingredientes: ['arroz', 'água'],
      preparo: 'Cozinhe tudo',
    });
    expect(valid.isValid).toBe(true);
  });

  it('detecta dados inválidos', () => {
    const invalid = model.validate({
      titulo: '',
      secao: '',
      ingredientes: [],
      preparo: '',
    });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.length).toBeGreaterThan(0);
  });

  it('formata dados para exibição', () => {
    const receita = {
      titulo: 'Arroz',
      ingredientes: ['arroz', 'água'],
      preparo: 'Cozinhe tudo',
      calorias: '100',
      criada_em: '2024-01-01T12:00:00Z',
    };
    const formatada = model.formatForDisplay(receita);
    expect(formatada.titulo).toBe('Arroz');
    expect(Array.isArray(formatada.ingredientes)).toBe(true);
    expect(formatada.preparo).toBe('Cozinhe tudo');
    expect(formatada.calorias).toBe('100');
    expect(formatada.criada_em instanceof Date).toBe(true);
  });
}); 