import ExercicioController from '../../controllers/ExercicioController.js';

class ExerciciosPage {
    constructor() {
        this.controller = new ExercicioController();
    }

    render() {
        // Renderiza o exercício do dia e todos os dias
        this.renderExercicioAtual();
        this.renderTodos();
    }

    renderExercicioAtual() {
        const exercicio = this.controller.carregarExercicioAtual();
        const container = document.getElementById('exercicio-atual');
        if (!container || !exercicio) return;
        container.innerHTML = `
            <h4>Exercício do Dia</h4>
            <div class="exercicio-info">
                <h5>${exercicio.nome}</h5>
                <ul>
                    ${exercicio.exercicios.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    renderTodos() {
        const todos = this.controller.carregarExercicios();
        const container = document.getElementById('todos-exercicios');
        if (!container) return;
        container.innerHTML = todos.map(ex => `
            <section id="${ex.dia}">
                <h4>${ex.dia.charAt(0).toUpperCase() + ex.dia.slice(1)}</h4>
                <div class="exercicio-info">
                    <h5>${ex.nome}</h5>
                    <ul>
                        ${ex.exercicios.map(e => `<li>${e}</li>`).join('')}
                    </ul>
                </div>
            </section>
        `).join('');
    }
}

export default ExerciciosPage; 