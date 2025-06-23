// ===================== MODELO DE RECEITAS ===================== //

import supabaseService from '../services/SupabaseService.js';

class ReceitaModel {
    constructor() {
        this.tableName = 'receitas';
    }

    /**
     * Busca todas as receitas do usuário
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
                throw new Error(result.error?.message || 'Erro ao buscar receitas');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo ReceitaModel.getAllByUser:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca uma receita específica
     * @param {string} receitaId - ID da receita
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getById(receitaId, userId) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { id: receitaId, owner_id: userId }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar receita');
            }
            
            return { success: true, data: result.data?.[0] || null };
        } catch (error) {
            console.error('Erro no modelo ReceitaModel.getById:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Cria uma nova receita
     * @param {Object} receitaData - Dados da receita
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da criação
     */
    async create(receitaData, userId) {
        try {
            const dataToInsert = {
                ...receitaData,
                owner_id: userId,
                criada_em: new Date().toISOString()
            };
            
            const result = await supabaseService.insert(this.tableName, dataToInsert);
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao criar receita');
            }
            
            return { success: true, data: result.data?.[0] };
        } catch (error) {
            console.error('Erro no modelo ReceitaModel.create:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Atualiza uma receita existente
     * @param {string} receitaId - ID da receita
     * @param {Object} receitaData - Dados atualizados
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da atualização
     */
    async update(receitaId, receitaData, userId) {
        try {
            const dataToUpdate = {
                ...receitaData,
                atualizada_em: new Date().toISOString()
            };
            
            const result = await supabaseService.update(
                this.tableName, 
                dataToUpdate, 
                { id: receitaId, owner_id: userId }
            );
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao atualizar receita');
            }
            
            return { success: true, data: result.data?.[0] };
        } catch (error) {
            console.error('Erro no modelo ReceitaModel.update:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Remove uma receita
     * @param {string} receitaId - ID da receita
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da remoção
     */
    async delete(receitaId, userId) {
        try {
            const result = await supabaseService.delete(this.tableName, {
                id: receitaId,
                owner_id: userId
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao remover receita');
            }
            
            return { success: true };
        } catch (error) {
            console.error('Erro no modelo ReceitaModel.delete:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca receitas por seção
     * @param {string} secao - Seção da receita (cafe, almoco, etc.)
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getBySecao(secao, userId) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { secao, owner_id: userId },
                orderBy: { column: 'criada_em', ascending: false }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar receitas por seção');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo ReceitaModel.getBySecao:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Valida dados da receita
     * @param {Object} receitaData - Dados da receita
     * @returns {Object} Resultado da validação
     */
    validate(receitaData) {
        const errors = [];
        
        if (!receitaData.titulo || receitaData.titulo.trim().length === 0) {
            errors.push('Título é obrigatório');
        }
        
        if (!receitaData.secao || receitaData.secao.trim().length === 0) {
            errors.push('Seção é obrigatória');
        }
        
        if (!receitaData.ingredientes || !Array.isArray(receitaData.ingredientes) || receitaData.ingredientes.length === 0) {
            errors.push('Pelo menos um ingrediente é obrigatório');
        }
        
        if (!receitaData.preparo || receitaData.preparo.trim().length === 0) {
            errors.push('Modo de preparo é obrigatório');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Formata dados da receita para exibição
     * @param {Object} receita - Dados da receita
     * @returns {Object} Receita formatada
     */
    formatForDisplay(receita) {
        return {
            ...receita,
            titulo: receita.titulo?.trim() || '',
            ingredientes: Array.isArray(receita.ingredientes) ? receita.ingredientes : [],
            preparo: receita.preparo?.trim() || '',
            calorias: receita.calorias?.trim() || '',
            criada_em: receita.criada_em ? new Date(receita.criada_em) : new Date(),
            atualizada_em: receita.atualizada_em ? new Date(receita.atualizada_em) : null
        };
    }
}

export default ReceitaModel; 