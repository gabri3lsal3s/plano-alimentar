import ExercicioController from '../controllers/ExercicioController.js';
import * as helpers from '../utils/helpers.js';

describe('ExercicioController', () => {
    let controller;
    beforeEach(() => {
        controller = new ExercicioController();
    });

    it('deve carregar todos os exercícios formatados', () => {
        const todos = controller.carregarExercicios();
        expect(Array.isArray(todos)).toBe(true);
        expect(todos[0]).toHaveProperty('nome');
        expect(Array.isArray(todos[0].exercicios)).toBe(true);
    });

    it('deve carregar exercício de um dia específico', () => {
        const ex = controller.carregarExercicioPorDia('quinta');
        expect(ex).toBeTruthy();
        expect(ex.nome).toMatch(/Quinta/);
    });

    it('deve retornar null para dia inexistente', () => {
        const ex = controller.carregarExercicioPorDia('domingo');
        expect(ex).toBeNull();
    });

    it('deve carregar o exercício atual usando o helper', () => {
        jest.spyOn(helpers, 'getExercicioAtual').mockReturnValue('sexta');
        const ex = controller.carregarExercicioAtual();
        expect(ex).toBeTruthy();
        expect(ex.nome).toMatch(/Sexta/);
        helpers.getExercicioAtual.mockRestore();
    });
}); 