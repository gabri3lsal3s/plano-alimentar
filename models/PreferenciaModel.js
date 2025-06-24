// ===================== MODELO DE PREFERÊNCIAS ===================== //

import supabaseService from '../services/SupabaseService.js';

class PreferenciaModel {
    constructor() {
        this.tableName = 'preferencias_receitas';
    }

    /**
     * Busca preferência do usuário para uma seção
     * @param {string} secao - Seção da refeição
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getBySecao(secao, userId) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { secao, owner_id: userId }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar preferência');
            }
            
            return { success: true, data: result.data?.[0] || null };
        } catch (error) {
            console.error('Erro no modelo PreferenciaModel.getBySecao:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca todas as preferências do usuário
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getAllByUser(userId) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { owner_id: userId }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar preferências');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo PreferenciaModel.getAllByUser:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Salva ou atualiza preferência do usuário
     * @param {string} secao - Seção da refeição
     * @param {string} receitaId - ID da receita preferida
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async upsert(secao, receitaId, userId) {
        try {
            const dataToUpsert = {
                owner_id: userId,
                secao,
                receita_id: receitaId,
                criada_em: new Date().toISOString()
            };
            
            const result = await supabaseService.upsert(this.tableName, dataToUpsert, {
                conflictColumns: ['owner_id', 'secao']
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao salvar preferência');
            }
            
            return { success: true, data: result.data?.[0] };
        } catch (error) {
            console.error('Erro no modelo PreferenciaModel.upsert:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Remove preferência do usuário
     * @param {string} secao - Seção da refeição
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async delete(secao, userId) {
        try {
            const result = await supabaseService.delete(this.tableName, {
                secao,
                owner_id: userId
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao remover preferência');
            }
            
            return { success: true };
        } catch (error) {
            console.error('Erro no modelo PreferenciaModel.delete:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca receita preferida com detalhes
     * @param {string} secao - Seção da refeição
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getReceitaPreferida(secao, userId) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { secao, owner_id: userId },
                joins: [
                    {
                        table: 'receitas',
                        on: 'preferencias_receitas.receita_id = receitas.id',
                        select: 'receitas.*'
                    }
                ]
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar receita preferida');
            }
            
            return { success: true, data: result.data?.[0] || null };
        } catch (error) {
            console.error('Erro no modelo PreferenciaModel.getReceitaPreferida:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Valida dados da preferência
     * @param {Object} preferenciaData - Dados da preferência
     * @returns {Object} Resultado da validação
     */
    validate(preferenciaData) {
        const errors = [];
        
        if (!preferenciaData.secao || preferenciaData.secao.trim().length === 0) {
            errors.push('Seção é obrigatória');
        }
        
        if (!preferenciaData.receita_id || preferenciaData.receita_id.trim().length === 0) {
            errors.push('ID da receita é obrigatório');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Formata dados da preferência para exibição
     * @param {Object} preferencia - Dados da preferência
     * @returns {Object} Preferência formatada
     */
    formatForDisplay(preferencia) {
        return {
            ...preferencia,
            secao: preferencia.secao?.trim() || '',
            receita_id: preferencia.receita_id?.trim() || '',
            criada_em: preferencia.criada_em ? new Date(preferencia.criada_em) : new Date()
        };
    }
}

export default PreferenciaModel; 