// ===================== MODELO DE NOTAS ===================== //

import supabaseService from '../services/SupabaseService.js';

class NotaModel {
    constructor() {
        this.tableName = 'notas';
    }

    /**
     * Busca todas as notas do usuário
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
                throw new Error(result.error?.message || 'Erro ao buscar notas');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo NotaModel.getAllByUser:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca uma nota específica
     * @param {string} notaId - ID da nota
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getById(notaId, userId) {
        try {
            const result = await supabaseService.select(this.tableName, {
                filters: { id: notaId, owner_id: userId }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar nota');
            }
            
            return { success: true, data: result.data?.[0] || null };
        } catch (error) {
            console.error('Erro no modelo NotaModel.getById:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Cria uma nova nota
     * @param {Object} notaData - Dados da nota
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da criação
     */
    async create(notaData, userId) {
        try {
            const dataToInsert = {
                texto: notaData.conteudo || notaData.texto,
                owner_id: userId,
                criada_em: new Date().toISOString()
            };
            const result = await supabaseService.insert(this.tableName, dataToInsert);
            let nota = result.data?.[0];
            // Se não vier a nota, buscar a última criada pelo usuário
            if (!nota) {
                const busca = await supabaseService.select(this.tableName, {
                    filters: { owner_id: userId },
                    orderBy: { column: 'criada_em', ascending: false }
                });
                nota = busca.data?.[0];
            }
            if (!nota) {
                return { success: false, error: 'Erro ao criar nota: dados não retornados' };
            }
            return { success: true, data: nota };
        } catch (error) {
            console.error('Erro no modelo NotaModel.create:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Atualiza uma nota existente
     * @param {string} notaId - ID da nota
     * @param {Object} notaData - Dados atualizados
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da atualização
     */
    async update(notaId, notaData, userId) {
        try {
            const dataToUpdate = {
                texto: notaData.conteudo || notaData.texto
            };
            
            const result = await supabaseService.update(
                this.tableName, 
                dataToUpdate, 
                { id: notaId, owner_id: userId }
            );
            
            // Buscar a nota atualizada pelo id
            const busca = await supabaseService.select(this.tableName, {
                filters: { id: notaId, owner_id: userId }
            });
            
            const nota = busca.data?.[0];
            if (!nota) {
                return { success: false, error: 'Erro ao atualizar nota: dados não retornados' };
            }
            
            return { success: true, data: nota };
        } catch (error) {
            console.error('Erro no modelo NotaModel.update:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Remove uma nota
     * @param {string} notaId - ID da nota
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da remoção
     */
    async delete(notaId, userId) {
        try {
            const result = await supabaseService.delete(this.tableName, {
                id: notaId,
                owner_id: userId
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao remover nota');
            }
            
            return { success: true };
        } catch (error) {
            console.error('Erro no modelo NotaModel.delete:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca notas por data
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
                throw new Error(result.error?.message || 'Erro ao buscar notas por data');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo NotaModel.getByDate:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca notas por período
     * @param {string} userId - ID do usuário
     * @param {Date} dataInicio - Data de início
     * @param {Date} dataFim - Data de fim
     * @returns {Promise<Object>} Resultado da busca
     */
    async getByPeriod(userId, dataInicio, dataFim) {
        try {
            const startDate = new Date(dataInicio);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(dataFim);
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
                throw new Error(result.error?.message || 'Erro ao buscar notas por período');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo NotaModel.getByPeriod:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca notas por conteúdo (busca textual)
     * @param {string} userId - ID do usuário
     * @param {string} termo - Termo de busca
     * @returns {Promise<Object>} Resultado da busca
     */
    async searchByContent(userId, termo) {
        try {
            // Busca apenas por conteúdo (texto)
            const result = await supabaseService.select(this.tableName, {
                filters: { 
                    owner_id: userId,
                    texto: { ilike: `%${termo}%` }
                },
                orderBy: { column: 'criada_em', ascending: false }
            });
            
            if (!result.success) {
                throw new Error(result.error?.message || 'Erro ao buscar notas por conteúdo');
            }
            
            return { success: true, data: result.data || [] };
        } catch (error) {
            console.error('Erro no modelo NotaModel.searchByContent:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Busca nota do dia atual
     * @param {string} userId - ID do usuário
     * @returns {Promise<Object>} Resultado da busca
     */
    async getTodayNote(userId) {
        try {
            const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const result = await this.getByDate(userId, hoje);
            
            if (!result.success) {
                return result;
            }
            
            // Retorna a nota mais recente do dia
            const notaHoje = result.data?.[0] || null;
            return { success: true, data: notaHoje };
        } catch (error) {
            console.error('Erro no modelo NotaModel.getTodayNote:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Valida dados da nota
     * @param {Object} notaData - Dados da nota
     * @returns {Object} Resultado da validação
     */
    validate(notaData) {
        const errors = [];
        
        if (!notaData.conteudo || notaData.conteudo.trim().length === 0) {
            errors.push('Conteúdo é obrigatório');
        }
        
        if (notaData.conteudo && notaData.conteudo.trim().length > 2000) {
            errors.push('Conteúdo deve ter no máximo 2000 caracteres');
        }
        
        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Formata dados da nota para exibição
     * @param {Object} nota - Dados da nota
     * @returns {Object} Nota formatada
     */
    formatForDisplay(nota) {
        return {
            ...nota,
            titulo: '', // Campo não existe na tabela, sempre vazio
            conteudo: nota.texto?.trim() || '',
            criada_em: nota.criada_em ? new Date(nota.criada_em) : new Date(),
            atualizada_em: null // Campo não existe na tabela
        };
    }

    /**
     * Gera texto para cópia das notas
     * @param {Array} notas - Lista de notas
     * @param {boolean} incluirData - Se deve incluir data na formatação
     * @returns {string} Texto formatado
     */
    generateCopyText(notas, incluirData = true) {
        if (notas.length === 0) {
            return 'Nenhuma nota encontrada.';
        }
        
        const dataAtual = new Date().toLocaleDateString('pt-BR');
        let texto = `NOTAS - ${dataAtual}\n\n`;
        
        notas.forEach((nota, index) => {
            if (incluirData) {
                const dataNota = new Date(nota.criada_em).toLocaleDateString('pt-BR');
                const horaNota = new Date(nota.criada_em).toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                texto += `${index + 1}. [${dataNota} às ${horaNota}]\n`;
            } else {
                texto += `${index + 1}. `;
            }
            
            texto += `${nota.texto}\n\n`;
        });
        
        return texto.trim();
    }

    /**
     * Gera resumo das notas
     * @param {Array} notas - Lista de notas
     * @param {number} maxLength - Comprimento máximo do resumo
     * @returns {string} Resumo das notas
     */
    generateSummary(notas, maxLength = 200) {
        if (notas.length === 0) {
            return 'Nenhuma nota para resumir.';
        }
        
        const conteudoCompleto = notas
            .map(nota => nota.texto)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
        
        if (conteudoCompleto.length <= maxLength) {
            return conteudoCompleto;
        }
        
        return conteudoCompleto.substring(0, maxLength) + '...';
    }
}

export default NotaModel; 