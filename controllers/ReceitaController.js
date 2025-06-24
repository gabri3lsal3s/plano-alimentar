// ===================== CONTROLLER DE RECEITAS ===================== //

import ReceitaModel from '../models/ReceitaModel.js';
import PreferenciaController from './PreferenciaController.js';
import supabaseService from '../services/SupabaseService.js';
import { MESSAGES } from '../utils/constants.js';

class ReceitaController {
    constructor() {
        this.model = new ReceitaModel();
        this.preferenciaController = new PreferenciaController();
    }

    /**
     * Carrega todas as receitas do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async carregarReceitas() {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getAllByUser(userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            // Formata as receitas para exibição
            const receitasFormatadas = result.data.map(receita => 
                this.model.formatForDisplay(receita)
            );

            return { 
                success: true, 
                data: receitasFormatadas,
                message: `Carregadas ${receitasFormatadas.length} receitas`
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.carregarReceitas:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Carrega receitas por seção
     * @param {string} secao - Seção das receitas
     * @returns {Promise<Object>} Resultado da operação
     */
    async carregarReceitasPorSecao(secao) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getBySecao(secao, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const receitasFormatadas = result.data.map(receita => 
                this.model.formatForDisplay(receita)
            );

            return { 
                success: true, 
                data: receitasFormatadas,
                message: `Carregadas ${receitasFormatadas.length} receitas para ${secao}`
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.carregarReceitasPorSecao:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Cria uma nova receita
     * @param {Object} receitaData - Dados da receita
     * @returns {Promise<Object>} Resultado da operação
     */
    async criarReceita(receitaData) {
        try {
            // Valida os dados
            const validation = this.model.validate(receitaData);
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

            const result = await this.model.create(receitaData, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const receitaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: receitaFormatada,
                message: MESSAGES.SUCCESS_SAVE
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.criarReceita:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Atualiza uma receita existente
     * @param {string} receitaId - ID da receita
     * @param {Object} receitaData - Dados atualizados
     * @returns {Promise<Object>} Resultado da operação
     */
    async atualizarReceita(receitaId, receitaData) {
        try {
            // Valida os dados
            const validation = this.model.validate(receitaData);
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

            const result = await this.model.update(receitaId, receitaData, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const receitaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: receitaFormatada,
                message: MESSAGES.SUCCESS_SAVE
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.atualizarReceita:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Remove uma receita
     * @param {string} receitaId - ID da receita
     * @returns {Promise<Object>} Resultado da operação
     */
    async removerReceita(receitaId) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.delete(receitaId, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            return { 
                success: true, 
                message: MESSAGES.SUCCESS_DELETE
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.removerReceita:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca uma receita específica
     * @param {string} receitaId - ID da receita
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarReceita(receitaId) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getById(receitaId, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            if (!result.data) {
                return { success: false, error: 'Receita não encontrada' };
            }

            const receitaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: receitaFormatada
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.buscarReceita:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Organiza receitas por seção
     * @param {Array} receitas - Lista de receitas
     * @returns {Object} Receitas organizadas por seção
     */
    organizarPorSecao(receitas) {
        const receitasPorSecao = {};
        
        receitas.forEach(receita => {
            const secao = receita.secao;
            if (!receitasPorSecao[secao]) {
                receitasPorSecao[secao] = [];
            }
            receitasPorSecao[secao].push(receita);
        });

        return receitasPorSecao;
    }

    /**
     * Filtra receitas por critérios
     * @param {Array} receitas - Lista de receitas
     * @param {Object} filtros - Critérios de filtro
     * @returns {Array} Receitas filtradas
     */
    filtrarReceitas(receitas, filtros = {}) {
        return receitas.filter(receita => {
            // Filtro por seção
            if (filtros.secao && receita.secao !== filtros.secao) {
                return false;
            }

            // Filtro por título (busca parcial)
            if (filtros.titulo && !receita.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())) {
                return false;
            }

            // Filtro por ingrediente (busca parcial)
            if (filtros.ingrediente) {
                const temIngrediente = receita.ingredientes.some(ingrediente =>
                    ingrediente.toLowerCase().includes(filtros.ingrediente.toLowerCase())
                );
                if (!temIngrediente) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Carrega receitas com informações de preferência
     * @returns {Promise<Object>} Resultado da operação
     */
    async carregarReceitasComPreferencias() {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            // Carrega receitas
            const resultReceitas = await this.model.getAllByUser(userId);
            if (!resultReceitas.success) {
                return { success: false, error: resultReceitas.error };
            }

            // Carrega preferências
            const resultPreferencias = await this.preferenciaController.carregarPreferencias();
            if (!resultPreferencias.success) {
                return { success: false, error: resultPreferencias.error };
            }

            // Formata receitas
            const receitasFormatadas = resultReceitas.data.map(receita => 
                this.model.formatForDisplay(receita)
            );

            // Adiciona informação de preferência a cada receita
            const preferenciasPorSecao = {};
            resultPreferencias.data.forEach(preferencia => {
                preferenciasPorSecao[preferencia.secao] = preferencia.receita_id;
            });

            const receitasComPreferencias = receitasFormatadas.map(receita => ({
                ...receita,
                isPreferida: preferenciasPorSecao[receita.secao] === receita.id
            }));

            return { 
                success: true, 
                data: receitasComPreferencias,
                message: `Carregadas ${receitasComPreferencias.length} receitas com preferências`
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.carregarReceitasComPreferencias:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Alterna preferência de uma receita
     * @param {string} receitaId - ID da receita
     * @param {string} secao - Seção da receita
     * @returns {Promise<Object>} Resultado da operação
     */
    async alternarPreferencia(receitaId, secao) {
        try {
            const result = await this.preferenciaController.alternarPreferencia(secao, receitaId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            return { 
                success: true, 
                data: result.data,
                message: result.message,
                action: result.action
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.alternarPreferencia:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Verifica se uma receita é preferida
     * @param {string} receitaId - ID da receita
     * @param {string} secao - Seção da receita
     * @returns {Promise<Object>} Resultado da verificação
     */
    async verificarPreferencia(receitaId, secao) {
        try {
            const result = await this.preferenciaController.verificarPreferencia(secao, receitaId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            return { 
                success: true, 
                data: result.data
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.verificarPreferencia:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Obtém receita preferida para uma seção
     * @param {string} secao - Seção da refeição
     * @returns {Promise<Object>} Resultado da operação
     */
    async obterReceitaPreferida(secao) {
        try {
            const result = await this.preferenciaController.buscarReceitaPreferida(secao);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            return { 
                success: true, 
                data: result.data
            };
        } catch (error) {
            console.error('Erro no controller ReceitaController.obterReceitaPreferida:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }
}

export default ReceitaController; 