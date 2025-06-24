class ExercicioModel {
    constructor() {
        // Dados mockados dos exercícios por dia da semana
        this.exercicios = {
            segunda: {
                nome: 'Segunda-feira - Treino A (Superior)',
                exercicios: [
                    'Supino Reto: 4x8-10',
                    'Desenvolvimento com Halteres: 4x8-10',
                    'Remada Curvada: 4x8-10',
                    'Elevação Lateral: 3x10-12',
                    'Tríceps Corda: 3x10-12',
                    'Bíceps Martelo: 3x10-12'
                ]
            },
            terca: {
                nome: 'Terça-feira - Treino B (Inferior)',
                exercicios: [
                    'Agachamento Livre: 4x8-10',
                    'Leg Press: 4x8-10',
                    'Extensão de Pernas: 3x10-12',
                    'Flexão de Pernas: 3x10-12',
                    'Elevação de Panturrilha: 4x12-15',
                    'Abdominal Crunch: 3x15-20'
                ]
            },
            quarta: {
                nome: 'Quarta-feira - Descanso/Cardio',
                exercicios: [
                    'Cardio leve (caminhada ou bike): 30-45 min',
                    'Alongamento: 15-20 min',
                    'Descanso ativo'
                ]
            },
            quinta: {
                nome: 'Quinta-feira - Treino C (Superior)',
                exercicios: [
                    'Supino Inclinado: 4x8-10',
                    'Puxada na Frente: 4x8-10',
                    'Elevação Frontal: 3x10-12',
                    'Remada Baixa: 4x8-10',
                    'Rosca Direta: 3x10-12',
                    'Tríceps Testa: 3x10-12'
                ]
            },
            sexta: {
                nome: 'Sexta-feira - Treino D (Inferior)',
                exercicios: [
                    'Agachamento Sumô: 4x8-10',
                    'Stiff: 4x8-10',
                    'Avanço: 3x10-12 (cada perna)',
                    'Extensão de Pernas: 3x10-12',
                    'Elevação de Panturrilha Sentado: 4x12-15',
                    'Prancha: 3x30-60 segundos'
                ]
            },
            adicional: {
                nome: 'Fim de Semana - Cardio/Descanso',
                exercicios: [
                    'Cardio moderado: 45-60 min',
                    'Alongamento: 20-30 min',
                    'Descanso e recuperação',
                    'Atividades recreativas'
                ]
            }
        };
    }

    getAll() {
        return Object.entries(this.exercicios).map(([dia, dados]) => ({ dia, ...dados }));
    }

    getByDia(dia) {
        return this.exercicios[dia] || null;
    }

    formatForDisplay(exercicio) {
        return {
            ...exercicio,
            nome: exercicio.nome?.trim() || '',
            exercicios: Array.isArray(exercicio.exercicios) ? exercicio.exercicios : []
        };
    }
}

export default ExercicioModel; 