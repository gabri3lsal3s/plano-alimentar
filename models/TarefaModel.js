// ===================== MODELO DE TAREFAS ===================== //

import supabaseService from '../services/SupabaseService.js';

class TarefaModel {
    constructor() {
        this.tableName = 'tarefas';
    }

    /**
     * Busca todas as tarefas do usuário
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getAllByUser(userId) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { owner_id: userId },
                orderBy: { column: 'criada_em', ascending: false }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar tarefas');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo TarefaModel.getAllByUser:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca tarefas por status
     * @param {string} userId - ID do usuário
     * @param {boolean} concluida - Status da tarefa
     * @returns {Promise<Object>} Resultado da busca
     */
    async getByStatus(userId, concluida = false) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { owner_id: userId, feita: concluida },
                orderBy: { column: 'criada_em', ascending: false }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar tarefas por status');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo TarefaModel.getByStatus:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca uma tarefa específica
     * @param {string} tarefaId - ID da tarefa
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getById(tarefaId, userId) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { id: tarefaId, owner_id: userId }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar tarefa');
            }
            
            return { success: true, data: result.data?.[0] || null };
        } catch (error) {
            console.error('Erro no modelo TarefaModel.getById:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Cria uma nova tarefa
     * @param {Object} tarefaData - Dados da tarefa
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da criação
     */
    async create(tarefaData, userId) {
        try {
            const dataToInsert = {
                descricao: tarefaData.titulo || tarefaData.descricao,
                owner_id: userId,
                feita: false,
                criada_em: new Date().toISOString()
            };
            const result = await supabaseService.insert(this.tableName, dataToInsert);
            let tarefa = result.data?.[0];
            // Se não vier a tarefa, buscar pelo id mais recente do usuário
            if (!tarefa) {
                // Buscar a última tarefa criada pelo usuário
                const busca = await supabaseService.select(this.tableName, {
                    filters: { owner_id: userId },
                    orderBy: { column: 'criada_em', ascending: false }
                });
                tarefa = busca.data?.[0];
            }
            if (!tarefa) {
                return { success: false, error: 'Erro ao criar tarefa: dados não retornados' };
            }
            return { success: true, data: tarefa };
        } catch (error) {
            console.error('Erro no modelo TarefaModel.create:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Atualiza uma tarefa existente
     * @param {string} tarefaId - ID da tarefa
     * @param {Object} tarefaData - Dados atualizados
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da atualização
     */
    async update(tarefaId, tarefaData, userId) {
        try {
            const dataToUpdate = {
                descricao: tarefaData.titulo || tarefaData.descricao,
                atualizada_em: new Date().toISOString()
            };
            const result = await supabaseService.update(
                this.tableName, 
                dataToUpdate, 
                { id: tarefaId, owner_id: userId }
            );
            // Buscar a tarefa atualizada pelo id
            const busca = await supabaseService.select(this.tableName, {
                filters: { id: tarefaId, owner_id: userId }
            });
            const tarefa = busca.data?.[0];
            if (!tarefa) {
                return { success: false, error: 'Erro ao atualizar tarefa: dados não retornados' };
            }
            return { success: true, data: tarefa };
        } catch (error) {
            console.error('Erro no modelo TarefaModel.update:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Remove uma tarefa
     * @param {string} tarefaId - ID da tarefa
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da remoção
     */
    async delete(tarefaId, userId) {
        try {
            const result = await supabaseService.delete(this.tableName, {
                id: tarefaId,
                owner_id: userId
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao remover tarefa');
            }
            
            return { success: true };
        } catch (error) {
            console.error('Erro no modelo TarefaModel.delete:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Marca/desmarca tarefa como concluída
     * @param {string} tarefaId - ID da tarefa
     * @param {boolean} concluida - Status da conclusão
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async toggleConcluida(tarefaId, concluida, userId) {
        try {
            const dataToUpdate = {
                feita: concluida,
                concluida_em: concluida ? new Date().toISOString() : null,
                atualizada_em: new Date().toISOString()
            };
            const result = await supabaseService.update(
                this.tableName, 
                dataToUpdate, 
                { id: tarefaId, owner_id: userId }
            );
            // Buscar a tarefa atualizada pelo id
            const busca = await supabaseService.select(this.tableName, {
                filters: { id: tarefaId, owner_id: userId }
            });
            const tarefa = busca.data?.[0];
            if (!tarefa) {
                return { success: false, error: 'Erro ao atualizar status da tarefa: dados não retornados' };
            }
            return { success: true, data: tarefa };
        } catch (error) {
            console.error('Erro no modelo TarefaModel.toggleConcluida:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca tarefas por data
     * @param {string} userId - ID do usuário
     * @param {string} data - Data no formato YYYY-MM-DD
     * @returns {Promise<Object>} Resultado da busca
     */
    async getByDate(userId, data) {
        try {
            const startDate = new Date(data);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(data);
            endDate.setHours(23, 59, 59, 999);
            
            const result = await supabaseService.select(this.tableName, {
                filters: { 
                    owner_id: userId,
                    criada_em: {
                        gte: startDate.toISOString(),
                        lte: endDate.toISOString()
                    }
                },
                orderBy: { column: 'criada_em', ascending: false }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar tarefas por data');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo TarefaModel.getByDate:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Valida dados da tarefa
     * @param {Object} tarefaData - Dados da tarefa
     * @returns {Object} Resultado da validação
     */
    validate(tarefaData) {
        const errors = [];
        
        if (!tarefaData.titulo || tarefaData.titulo.trim().length === 0) {
            errors.push('Título é obrigatório');
        }
        
        if (tarefaData.titulo && tarefaData.titulo.trim().length > 80) {
            errors.push('Título deve ter no máximo 80 caracteres');
        }
        
        if (tarefaData.descricao && tarefaData.descricao.trim().length > 500) {
            errors.push('Descrição deve ter no máximo 500 caracteres');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Formata dados da tarefa para exibição
     * @param {Object} tarefa - Dados da tarefa
     * @returns {Object} Tarefa formatada
     */
    formatForDisplay(tarefa) {
        return {
            ...tarefa,
            titulo: tarefa.titulo?.trim() || '',
            descricao: tarefa.descricao?.trim() || '',
            concluida: Boolean(tarefa.feita),
            criada_em: tarefa.criada_em ? new Date(tarefa.criada_em) : new Date(),
            atualizada_em: tarefa.atualizada_em ? new Date(tarefa.atualizada_em) : null,
            concluida_em: tarefa.concluida_em ? new Date(tarefa.concluida_em) : null
        };
    }

    /**
     * Gera texto para cópia das tarefas
     * @param {Array} tarefas - Lista de tarefas
     * @param {boolean} apenasConcluidas - Se deve incluir apenas tarefas concluídas
     * @returns {string} Texto formatado
     */
    generateCopyText(tarefas, apenasConcluidas = false) {
        const tarefasFiltradas = apenasConcluidas 
            ? tarefas.filter(t => t.feita)
            : tarefas.filter(t => !t.feita);
        
        if (tarefasFiltradas.length === 0) {
            return apenasConcluidas ? 'Nenhuma tarefa concluída.' : 'Nenhuma tarefa pendente.';
        }
        
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        const titulo = apenasConcluidas ? 'TAREFAS CONCLUÍDAS' : 'TAREFAS PENDENTES';
        
        let texto = `${titulo} - ${dataAtual}\n\n`;
        
        tarefasFiltradas.forEach((tarefa, index) => {
            const status = tarefa.feita ? '✅' : '⏳';
            const hora = tarefa.concluida_em 
                ? ` (${new Date(tarefa.concluida_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })})`
                : '';
            
            texto += `${index + 1}. ${status} ${tarefa.titulo}${hora}\n`;
            
            if (tarefa.descricao) {
                texto += `   ${tarefa.descricao}\n`;
            }
        });
        
        return texto;
    }
}

export default TarefaModel; 