import ExercicioModel from '../models/ExercicioModel.js';
import { getExercicioAtual } from '../utils/helpers.js';

class ExercicioController {
    constructor() {
        this.model = new ExercicioModel();
    }

    carregarExercicios() {
        // Retorna todos os exercícios formatados
        return this.model.getAll().map(ex => this.model.formatForDisplay(ex));
    }

    carregarExercicioPorDia(dia) {
        // Retorna o exercício de um dia específico formatado
        const exercicio = this.model.getByDia(dia);
        if (!exercicio) return null;
        return this.model.formatForDisplay(exercicio);
    }

    carregarExercicioAtual() {
        // Usa helper para pegar o dia atual
        const dia = getExercicioAtual();
        return this.carregarExercicioPorDia(dia);
    }
}

export default ExercicioController; 