import ExercicioModel from '../models/ExercicioModel.js';

describe('ExercicioModel', () => {
    let model;
    beforeEach(() => {
        model = new ExercicioModel();
    });

    it('deve retornar todos os exercícios com getAll()', () => {
        const todos = model.getAll();
        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBeGreaterThan(0);
        expect(todos[0]).toHaveProperty('dia');
        expect(todos[0]).toHaveProperty('nome');
        expect(todos[0]).toHaveProperty('exercicios');
    });

    it('deve retornar exercício correto por dia com getByDia()', () => {
        const segunda = model.getByDia('segunda');
        expect(segunda).toBeTruthy();
        expect(segunda.nome).toMatch(/Segunda/);
        expect(Array.isArray(segunda.exercicios)).toBe(true);
    });

    it('deve retornar null para dia inexistente em getByDia()', () => {
        const invalido = model.getByDia('domingo');
        expect(invalido).toBeNull();
    });

    it('deve formatar corretamente para exibição com formatForDisplay()', () => {
        const raw = { nome: 'Teste', exercicios: ['A', 'B'] };
        const formatado = model.formatForDisplay(raw);
        expect(formatado.nome).toBe('Teste');
        expect(Array.isArray(formatado.exercicios)).toBe(true);
    });

    it('deve garantir array vazio se exercicios não for array em formatForDisplay()', () => {
        const raw = { nome: 'Teste', exercicios: null };
        const formatado = model.formatForDisplay(raw);
        expect(Array.isArray(formatado.exercicios)).toBe(true);
        expect(formatado.exercicios.length).toBe(0);
    });
}); 