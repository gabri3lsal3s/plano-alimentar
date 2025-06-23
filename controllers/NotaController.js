// ===================== CONTROLLER DE NOTAS ===================== //

import NotaModel from '../models/NotaModel.js';
import supabaseService from '../services/SupabaseService.js';
import { MESSAGES } from '../utils/constants.js';

class NotaController {
    constructor() {
        this.model = new NotaModel();
    }

    /**
     * Carrega todas as notas do usuário
     * @returns {Promise<Object>} Resultado da operação
     */
    async carregarNotas() {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getAllByUser(userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            // Formata as notas para exibição
            const notasFormatadas = result.data.map(nota => 
                this.model.formatForDisplay(nota)
            );

            return { 
                success: true, 
                data: notasFormatadas,
                message: `Carregadas ${notasFormatadas.length} notas`
            };
        } catch (error) {
            console.error('Erro no controller NotaController.carregarNotas:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Carrega nota do dia atual
     * @returns {Promise<Object>} Resultado da operação
     */
    async carregarNotaHoje() {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getTodayNote(userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            if (result.data) {
                const notaFormatada = this.model.formatForDisplay(result.data);
                return { 
                    success: true, 
                    data: notaFormatada,
                    message: 'Nota do dia carregada'
                };
            } else {
                return { 
                    success: true, 
                    data: null,
                    message: 'Nenhuma nota encontrada para hoje'
                };
            }
        } catch (error) {
            console.error('Erro no controller NotaController.carregarNotaHoje:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Cria uma nova nota
     * @param {Object} notaData - Dados da nota
     * @returns {Promise<Object>} Resultado da operação
     */
    async criarNota(notaData) {
        try {
            // Valida os dados
            const validation = this.model.validate(notaData);
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

            const result = await this.model.create(notaData, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const notaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: notaFormatada,
                message: MESSAGES.SUCCESS_SAVE
            };
        } catch (error) {
            console.error('Erro no controller NotaController.criarNota:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Atualiza uma nota existente
     * @param {string} notaId - ID da nota
     * @param {Object} notaData - Dados atualizados
     * @returns {Promise<Object>} Resultado da operação
     */
    async atualizarNota(notaId, notaData) {
        try {
            // Valida os dados
            const validation = this.model.validate(notaData);
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

            const result = await this.model.update(notaId, notaData, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const notaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: notaFormatada,
                message: MESSAGES.SUCCESS_SAVE
            };
        } catch (error) {
            console.error('Erro no controller NotaController.atualizarNota:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Remove uma nota
     * @param {string} notaId - ID da nota
     * @returns {Promise<Object>} Resultado da operação
     */
    async removerNota(notaId) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.delete(notaId, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            return { 
                success: true, 
                message: MESSAGES.SUCCESS_DELETE
            };
        } catch (error) {
            console.error('Erro no controller NotaController.removerNota:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca uma nota específica
     * @param {string} notaId - ID da nota
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarNota(notaId) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getById(notaId, userId);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            if (!result.data) {
                return { success: false, error: 'Nota não encontrada' };
            }

            const notaFormatada = this.model.formatForDisplay(result.data);

            return { 
                success: true, 
                data: notaFormatada
            };
        } catch (error) {
            console.error('Erro no controller NotaController.buscarNota:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca notas por data
     * @param {string} data - Data no formato YYYY-MM-DD
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarNotasPorData(data) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getByDate(userId, data);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const notasFormatadas = result.data.map(nota => 
                this.model.formatForDisplay(nota)
            );

            const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
            return { 
                success: true, 
                data: notasFormatadas,
                message: `Carregadas ${notasFormatadas.length} notas para ${dataFormatada}`
            };
        } catch (error) {
            console.error('Erro no controller NotaController.buscarNotasPorData:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca notas por período
     * @param {Date} dataInicio - Data de início
     * @param {Date} dataFim - Data de fim
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarNotasPorPeriodo(dataInicio, dataFim) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.getByPeriod(userId, dataInicio, dataFim);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const notasFormatadas = result.data.map(nota => 
                this.model.formatForDisplay(nota)
            );

            const inicioFormatado = dataInicio.toLocaleDateString('pt-BR');
            const fimFormatado = dataFim.toLocaleDateString('pt-BR');
            return { 
                success: true, 
                data: notasFormatadas,
                message: `Carregadas ${notasFormatadas.length} notas de ${inicioFormatado} a ${fimFormatado}`
            };
        } catch (error) {
            console.error('Erro no controller NotaController.buscarNotasPorPeriodo:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Busca notas por conteúdo
     * @param {string} termo - Termo de busca
     * @returns {Promise<Object>} Resultado da operação
     */
    async buscarNotasPorConteudo(termo) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            const result = await this.model.searchByContent(userId, termo);
            
            if (!result.success) {
                return { success: false, error: result.error };
            }

            const notasFormatadas = result.data.map(nota => 
                this.model.formatForDisplay(nota)
            );

            return { 
                success: true, 
                data: notasFormatadas,
                message: `Encontradas ${notasFormatadas.length} notas com "${termo}"`
            };
        } catch (error) {
            console.error('Erro no controller NotaController.buscarNotasPorConteudo:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Salva ou atualiza nota do dia
     * @param {string} conteudo - Conteúdo da nota
     * @returns {Promise<Object>} Resultado da operação
     */
    async salvarNotaHoje(conteudo) {
        try {
            const userId = await supabaseService.getCurrentUserId();
            if (!userId) {
                return { success: false, error: 'Usuário não autenticado' };
            }

            // Verifica se já existe uma nota para hoje
            const notaHoje = await this.model.getTodayNote(userId);
            
            if (notaHoje.success && notaHoje.data) {
                // Atualiza nota existente
                const result = await this.model.update(notaHoje.data.id, { conteudo }, userId);
                
                if (!result.success) {
                    return { success: false, error: result.error };
                }

                const notaFormatada = this.model.formatForDisplay(result.data);
                return { 
                    success: true, 
                    data: notaFormatada,
                    message: 'Nota do dia atualizada'
                };
            } else {
                // Cria nova nota
                const result = await this.model.create({ conteudo }, userId);
                
                if (!result.success) {
                    return { success: false, error: result.error };
                }

                const notaFormatada = this.model.formatForDisplay(result.data);
                return { 
                    success: true, 
                    data: notaFormatada,
                    message: 'Nota do dia criada'
                };
            }
        } catch (error) {
            console.error('Erro no controller NotaController.salvarNotaHoje:', error);
            return { success: false, error: MESSAGES.ERROR_GENERIC };
        }
    }

    /**
     * Organiza notas por data
     * @param {Array} notas - Lista de notas
     * @returns {Object} Notas organizadas por data
     */
    organizarPorData(notas) {
        const notasPorData = {};
        
        notas.forEach(nota => {
            const data = new Date(nota.criada_em).toISOString().split('T')[0]; // YYYY-MM-DD
            if (!notasPorData[data]) {
                notasPorData[data] = [];
            }
            notasPorData[data].push(nota);
        });

        return notasPorData;
    }

    /**
     * Filtra notas por critérios
     * @param {Array} notas - Lista de notas
     * @param {Object} filtros - Critérios de filtro
     * @returns {Array} Notas filtradas
     */
    filtrarNotas(notas, filtros = {}) {
        return notas.filter(nota => {
            // Filtro por conteúdo
            if (filtros.conteudo && !nota.texto.toLowerCase().includes(filtros.conteudo.toLowerCase())) {
                return false;
            }
            
            // Filtro por data de criação
            if (filtros.dataInicio) {
                const dataNota = new Date(nota.criada_em);
                const dataInicio = new Date(filtros.dataInicio);
                if (dataNota < dataInicio) {
                    return false;
                }
            }
            
            if (filtros.dataFim) {
                const dataNota = new Date(nota.criada_em);
                const dataFim = new Date(filtros.dataFim);
                dataFim.setHours(23, 59, 59, 999);
                if (dataNota > dataFim) {
                    return false;
                }
            }
            
            return true;
        });
    }

    /**
     * Gera estatísticas das notas
     * @param {Array} notas - Lista de notas
     * @returns {Object} Estatísticas
     */
    gerarEstatisticas(notas) {
        const total = notas.length;
        const hoje = new Date().toISOString().split('T')[0];
        const notasHoje = notas.filter(nota => 
            new Date(nota.criada_em).toISOString().split('T')[0] === hoje
        ).length;

        // Calcula média de caracteres por nota
        const totalCaracteres = notas.reduce((total, nota) => total + nota.conteudo.length, 0);
        const mediaCaracteres = total > 0 ? Math.round(totalCaracteres / total) : 0;

        return {
            total,
            notasHoje,
            mediaCaracteres,
            totalCaracteres
        };
    }

    /**
     * Gera texto para cópia das notas
     * @param {Array} notas - Lista de notas
     * @param {boolean} incluirData - Se deve incluir data na formatação
     * @returns {string} Texto formatado
     */
    gerarTextoParaCopia(notas, incluirData = true) {
        return this.model.generateCopyText(notas, incluirData);
    }

    /**
     * Gera resumo das notas
     * @param {Array} notas - Lista de notas
     * @param {number} maxLength - Comprimento máximo do resumo
     * @returns {string} Resumo das notas
     */
    gerarResumo(notas, maxLength = 200) {
        return this.model.generateSummary(notas, maxLength);
    }
}

export default NotaController; 