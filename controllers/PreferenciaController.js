// ===================== CONTROLLER DE PREFERÊNCIAS ===================== //

import PreferenciaModel from '../models/PreferenciaModel.js';
import supabaseService from '../services/SupabaseService.js';
import { MESSAGES } from '../utils/constants.js';

class PreferenciaController {
    constructor() {
        this.model = new PreferenciaModel();
    }

    /**
     * Busca preferência do usuário para uma seção
     * @param {string} secao - Seção da refeição
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarPreferencia(secao) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getBySecao(secao, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            return { 
                success: true, 
                data: result.data?.receita_id || null
            };
        } catch (error) {
            console.error('Erro no controller PreferenciaController.buscarPreferencia:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca todas as preferências do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async carregarPreferencias() {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getAllByUser(userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            // Formata as preferências para exibição
            const preferenciasFormatadas = result.data.map(preferencia => 
                this.model.formatForDisplay(preferencia)
            );

            return { 
                success: true, 
                data: preferenciasFormatadas,
                message: `Carregadas ${preferenciasFormatadas.length} preferências`
            };
        } catch (error) {
            console.error('Erro no controller PreferenciaController.carregarPreferencias:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Salva preferência do usuário
     * @param {string} secao - Seção da refeição
     * @param {string} receitaId - ID da receita preferida
     * @returns {Promise<Object>} Resultado da operação
     */
    async salvarPreferencia(secao, receitaId) {
        try {
            // Valida os dados
            const validation = this.model.validate({ secao, receita_id: receitaId });
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

            const result = await this.model.upsert(secao, receitaId, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const preferenciaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: preferenciaFormatada,
                message: 'Preferência salva com sucesso'
            };
        } catch (error) {
            console.error('Erro no controller PreferenciaController.salvarPreferencia:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Remove preferência do usuário
     * @param {string} secao - Seção da refeição
     * @returns {Promise<Object>} Resultado da operação
     */
    async removerPreferencia(secao) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.delete(secao, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            return { 
                success: true, 
                message: 'Preferência removida com sucesso'
            };
        } catch (error) {
            console.error('Erro no controller PreferenciaController.removerPreferencia:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca receita preferida com detalhes
     * @param {string} secao - Seção da refeição
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarReceitaPreferida(secao) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getReceitaPreferida(secao, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            if (!result.data) {
                return { success: false, error: 'Nenhuma receita preferida encontrada' };
            }

            return { 
                success: true, 
                data: result.data
            };
        } catch (error) {
            console.error('Erro no controller PreferenciaController.buscarReceitaPreferida:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Alterna preferência (salva se não existe, remove se existe)
     * @param {string} secao - Seção da refeição
     * @param {string} receitaId - ID da receita
     * @returns {Promise<Object>} Resultado da operação
     */
    async alternarPreferencia(secao, receitaId) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            // Verifica se já existe preferência para esta seção
            const preferenciaAtual = await this.model.getBySecao(secao, userId);
            
            if (!preferenciaAtual.success) {
                return { success: false, error: preferenciaAtual.error };
            }

            if (preferenciaAtual.data) {
                // Se já existe preferência, remove
                const result = await this.model.delete(secao, userId);
                
                if (!result.success) {
                    return { success: false, error: result.error };
                }

                return { 
                    success: true, 
                    message: 'Preferência removida com sucesso',
                    action: 'removed'
                };
            } else {
                // Se não existe, salva
                const result = await this.model.upsert(secao, receitaId, userId);
                
                if (!result.success) {
                    return { success: false, error: result.error };
                }

                const preferenciaFormatada = this.model.formatForDisplay(result.data);

                return { 
                    success: true, 
                    data: preferenciaFormatada,
                    message: 'Receita marcada como preferida',
                    action: 'added'
                };
            }
        } catch (error) {
            console.error('Erro no controller PreferenciaController.alternarPreferencia:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Organiza preferências por seção
     * @param {Array} preferencias - Lista de preferências
     * @returns {Object} Preferências organizadas por seção
     */
    organizarPorSecao(preferencias) {
        const preferenciasPorSecao = {};
        
        preferencias.forEach(preferencia => {
            const secao = preferencia.secao;
            if (!preferenciasPorSecao[secao]) {
                preferenciasPorSecao[secao] = [];
            }
            preferenciasPorSecao[secao].push(preferencia);
        });

        return preferenciasPorSecao;
    }

    /**
     * Verifica se uma receita é preferida
     * @param {string} secao - Seção da refeição
     * @param {string} receitaId - ID da receita
     * @returns {Promise<Object>} Resultado da verificação
     */
    async verificarPreferencia(secao, receitaId) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getBySecao(secao, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const isPreferida = result.data?.receita_id === receitaId;

            return { 
                success: true, 
                data: { isPreferida }
            };
        } catch (error) {
            console.error('Erro no controller PreferenciaController.verificarPreferencia:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }
}

export default PreferenciaController; 