import {
  getRefeicaoAtual,
  getExercicioAtual,
  formatarData,
  formatarHora,
  isEmpty,
  generateId,
  sanitizeString
} from '../utils/helpers.js';

describe('Helpers utilitários', () => {
  it('getRefeicaoAtual retorna uma chave válida', () => {
    const refeicao = getRefeicaoAtual();
    expect([
      'cafe', 'lancheM', 'almoco', 'lancheT', 'janta', 'ceia'
    ]).toContain(refeicao);
  });

  it('getExercicioAtual retorna uma chave válida', () => {
    const exercicio = getExercicioAtual();
    expect([
      'segunda', 'terca', 'quarta', 'quinta', 'adicional'
    ]).toContain(exercicio);
  });

  it('formata data corretamente', () => {
    const data = new Date('2024-01-01T12:00:00Z');
    expect(formatarData(data)).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  it('formata hora corretamente', () => {
    const data = new Date('2024-01-01T12:34:00Z');
    expect(formatarHora(data)).toMatch(/\d{2}:\d{2}/);
  });

  it('isEmpty retorna true para objeto vazio', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('generateId gera IDs únicos', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
    expect(typeof id1).toBe('string');
  });

  // Este teste depende de ambiente DOM (jsdom)
  (typeof document !== 'undefined' ? it : it.skip)('sanitizeString remove HTML perigoso', () => {
    const str = '<script>alert(1)</script>Olá';
    const sanitized = sanitizeString(str);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('Olá');
  });
}); 