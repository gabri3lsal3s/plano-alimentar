// ===================== CONTROLLER DE TAREFAS ===================== //

import TarefaModel from '../models/TarefaModel.js';
import supabaseService from '../services/SupabaseService.js';
import { MESSAGES } from '../utils/constants.js';

class TarefaController {
    constructor() {
        this.model = new TarefaModel();
    }

    /**
     * Carrega todas as tarefas do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async carregarTarefas() {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getAllByUser(userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            // Formata as tarefas para exibição
            const tarefasFormatadas = result.data.map(tarefa => 
                this.model.formatForDisplay(tarefa)
            );

            return { 
                success: true, 
                data: tarefasFormatadas,
                message: `Carregadas ${tarefasFormatadas.length} tarefas`
            };
        } catch (error) {
            console.error('Erro no controller TarefaController.carregarTarefas:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Carrega tarefas por status
     * @param {boolean} concluida - Status das tarefas
     * @returns {Promise<Object>} Resultado da operação
     */
    async carregarTarefasPorStatus(concluida = false) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getByStatus(userId, concluida);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const tarefasFormatadas = result.data.map(tarefa => 
                this.model.formatForDisplay(tarefa)
            );

            const statusText = concluida ? 'concluídas' : 'pendentes';
            return { 
                success: true, 
                data: tarefasFormatadas,
                message: `Carregadas ${tarefasFormatadas.length} tarefas ${statusText}`
            };
        } catch (error) {
            console.error('Erro no controller TarefaController.carregarTarefasPorStatus:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Cria uma nova tarefa
     * @param {Object} tarefaData - Dados da tarefa
     * @returns {Promise<Object>} Resultado da operação
     */
    async criarTarefa(tarefaData) {
        try {
            // Valida os dados
            const validation = this.model.validate(tarefaData);
            if (!validation.isValid) {
                return { 
                    success: false, 
                    error: 'Dados inválidos',
                    details: validation.errors 
                };
            }

            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.create(tarefaData, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            // Verificar se result.data existe antes de formatar
            if (!result.data) {
                return { success: false, error: 'Erro ao criar tarefa: dados não retornados' };
            }

            const tarefaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: tarefaFormatada,
                message: MESSAGES.SUCCESS_SAVE
            };
        } catch (error) {
            console.error('Erro no controller TarefaController.criarTarefa:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Atualiza uma tarefa existente
     * @param {string} tarefaId - ID da tarefa
     * @param {Object} tarefaData - Dados atualizados
     * @returns {Promise<Object>} Resultado da operação
     */
    async atualizarTarefa(tarefaId, tarefaData) {
        try {
            // Valida os dados
            const validation = this.model.validate(tarefaData);
            if (!validation.isValid) {
                return { 
                    success: false, 
                    error: 'Dados inválidos',
                    details: validation.errors 
                };
            }

            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.update(tarefaId, tarefaData, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const tarefaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: tarefaFormatada,
                message: MESSAGES.SUCCESS_SAVE
            };
        } catch (error) {
            console.error('Erro no controller TarefaController.atualizarTarefa:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Remove uma tarefa
     * @param {string} tarefaId - ID da tarefa
     * @returns {Promise<Object>} Resultado da operação
     */
    async removerTarefa(tarefaId) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.delete(tarefaId, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            return { 
                success: true, 
                message: MESSAGES.SUCCESS_DELETE
            };
        } catch (error) {
            console.error('Erro no controller TarefaController.removerTarefa:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Marca/desmarca tarefa como concluída
     * @param {string} tarefaId - ID da tarefa
     * @param {boolean} concluida - Status da conclusão
     * @returns {Promise<Object>} Resultado da operação
     */
    async toggleConcluida(tarefaId, concluida) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.toggleConcluida(tarefaId, concluida, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const tarefaFormatada = this.model.formatForDisplay(result.data);
            const statusText = concluida ? 'marcada como concluída' : 'desmarcada como concluída';

            return { 
                success: true, 
                data: tarefaFormatada,
                message: `Tarefa ${statusText}`
            };
        } catch (error) {
            console.error('Erro no controller TarefaController.toggleConcluida:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca uma tarefa específica
     * @param {string} tarefaId - ID da tarefa
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarTarefa(tarefaId) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getById(tarefaId, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            if (!result.data) {
                return { success: false, error: 'Tarefa não encontrada' };
            }

            const tarefaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: tarefaFormatada
            };
        } catch (error) {
            console.error('Erro no controller TarefaController.buscarTarefa:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca tarefas por data
     * @param {string} data - Data no formato YYYY-MM-DD
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarTarefasPorData(data) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getByDate(userId, data);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const tarefasFormatadas = result.data.map(tarefa => 
                this.model.formatForDisplay(tarefa)
            );

            const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
            return { 
                success: true, 
                data: tarefasFormatadas,
                message: `Carregadas ${tarefasFormatadas.length} tarefas para ${dataFormatada}`
            };
        } catch (error) {
            console.error('Erro no controller TarefaController.buscarTarefasPorData:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Organiza tarefas por status
     * @param {Array} tarefas - Lista de tarefas
     * @returns {Object} Tarefas organizadas por status
     */
    organizarPorStatus(tarefas) {
        return {
            pendentes: tarefas.filter(tarefa => !tarefa.feita),
            concluidas: tarefas.filter(tarefa => tarefa.feita)
        };
    }

    /**
     * Filtra tarefas por critérios
     * @param {Array} tarefas - Lista de tarefas
     * @param {Object} filtros - Critérios de filtro
     * @returns {Array} Tarefas filtradas
     */
    filtrarTarefas(tarefas, filtros = {}) {
        return tarefas.filter(tarefa => {
            // Filtro por status
            if (filtros.concluida !== undefined && tarefa.feita !== filtros.concluida) {
                return false;
            }

            // Filtro por título (busca parcial)
            if (filtros.titulo && !tarefa.descricao.toLowerCase().includes(filtros.titulo.toLowerCase())) {
                return false;
            }

            // Filtro por descrição (busca parcial)
            if (filtros.descricao && !tarefa.descricao.toLowerCase().includes(filtros.descricao.toLowerCase())) {
                return false;
            }

            // Filtro por data
            if (filtros.data) {
                const tarefaData = new Date(tarefa.criada_em).toISOString().split('T')[0];
                if (tarefaData !== filtros.data) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Gera estatísticas das tarefas
     * @param {Array} tarefas - Lista de tarefas
     * @returns {Object} Estatísticas
     */
    gerarEstatisticas(tarefas) {
        const total = tarefas.length;
        const concluidas = tarefas.filter(t => t.feita).length;
        const pendentes = total - concluidas;
        const percentualConcluidas = total > 0 ? Math.round((concluidas / total) * 100) : 0;

        return {
            total,
            concluidas,
            pendentes,
            percentualConcluidas
        };
    }

    /**
     * Gera texto para cópia das tarefas
     * @param {Array} tarefas - Lista de tarefas
     * @param {boolean} apenasConcluidas - Se deve incluir apenas tarefas concluídas
     * @returns {string} Texto formatado
     */
    gerarTextoParaCopia(tarefas, apenasConcluidas = false) {
        return this.model.generateCopyText(tarefas, apenasConcluidas);
    }
}

export default TarefaController; 