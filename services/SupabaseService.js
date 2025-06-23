// ===================== SERVIÇO SUPABASE ===================== //

import { SUPABASE_CONFIG } from '../utils/constants.js';

class SupabaseService {
    constructor() {
        this.client = null;
        this.initialized = false;
    }

    /**
     * Inicializa o cliente Supabase
     */
    initialize() {
        try {
            if (!window.supabase || !window.supabase.createClient) {
                throw new Error('Supabase SDK não carregado corretamente!');
            }
            
            this.client = window.supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.KEY);
            this.initialized = true;
            console.log('Supabase inicializado com sucesso');
        } catch (error) {
            console.error('Erro ao inicializar Supabase:', error);
            throw error;
        }
    }

    /**
     * Obtém o cliente Supabase
     * @returns {Object} Cliente Supabase
     */
    getClient() {
        if (!this.initialized) {
            this.initialize();
        }
        return this.client;
    }

    /**
     * Obtém o usuário atual
     * @returns {Promise<Object>} Dados do usuário
     */
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await this.getClient().auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.error('Erro ao obter usuário atual:', error);
            return null;
        }
    }

    /**
     * Obtém o ID do usuário atual
     * @returns {Promise<string>} ID do usuário
     */
    async getCurrentUserId() {
        const user = await this.getCurrentUser();
        return user?.id;
    }

    /**
     * Verifica se o usuário está autenticado
     * @returns {Promise<boolean>} True se autenticado
     */
    async isAuthenticated() {
        const user = await this.getCurrentUser();
        return !!user;
    }

    /**
     * Executa logout
     * @returns {Promise<Object>} Resultado do logout
     */
    async logout() {
        try {
            const { error } = await this.getClient().auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Erro no logout:', error);
            return { success: false, error };
        }
    }

    /**
     * Executa login com email e senha
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     * @returns {Promise<Object>} Resultado do login
     */
    async login(email, password) {
        try {
            const { data, error } = await this.getClient().auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, error };
        }
    }

    /**
     * Executa operação genérica no banco
     * @param {string} table - Nome da tabela
     * @param {string} operation - Operação (select, insert, update, delete)
     * @param {Object} options - Opções da operação
     * @returns {Promise<Object>} Resultado da operação
     */
    async executeOperation(table, operation, options = {}) {
        try {
            let query = this.getClient().from(table);
            
            switch (operation) {
                case 'select':
                    query = query.select(options.columns || '*');
                    if (options.filters) {
                        Object.entries(options.filters).forEach(([key, value]) => {
                            query = query.eq(key, value);
                        });
                    }
                    if (options.orderBy) {
                        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
                    }
                    break;
                    
                case 'insert':
                    query = query.insert(options.data);
                    break;
                    
                case 'update':
                    query = query.update(options.data);
                    if (options.filters) {
                        Object.entries(options.filters).forEach(([key, value]) => {
                            query = query.eq(key, value);
                        });
                    }
                    break;
                    
                case 'delete':
                    if (options.filters) {
                        Object.entries(options.filters).forEach(([key, value]) => {
                            query = query.eq(key, value);
                        });
                    }
                    break;
                    
                default:
                    throw new Error(`Operação não suportada: ${operation}`);
            }
            
            const { data, error } = await query;
            if (error) throw error;
            
            return { success: true, data };
        } catch (error) {
            console.error(`Erro na operação ${operation} na tabela ${table}:`, error);
            return { success: false, error };
        }
    }

    /**
     * Insere dados em uma tabela
     * @param {string} table - Nome da tabela
     * @param {Object} data - Dados a serem inseridos
     * @returns {Promise<Object>} Resultado da inserção
     */
    async insert(table, data) {
        try {
            const { data: resultData, error } = await this.getClient()
                .from(table)
                .insert(data, { returning: 'representation' });
            if (error) throw error;
            return { success: true, data: resultData };
        } catch (error) {
            console.error(`Erro ao inserir na tabela ${table}:`, error);
            return { success: false, error };
        }
    }

    /**
     * Busca dados de uma tabela
     * @param {string} table - Nome da tabela
     * @param {Object} options - Opções da busca
     * @returns {Promise<Object>} Resultado da busca
     */
    async select(table, options = {}) {
        return this.executeOperation(table, 'select', options);
    }

    /**
     * Atualiza dados em uma tabela
     * @param {string} table - Nome da tabela
     * @param {Object} data - Dados a serem atualizados
     * @param {Object} filters - Filtros para a atualização
     * @returns {Promise<Object>} Resultado da atualização
     */
    async update(table, data, filters = {}) {
        try {
            let query = this.getClient()
                .from(table)
                .update(data, { returning: 'representation' });
            
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });
            
            const { data: resultData, error } = await query;
            if (error) throw error;
            return { success: true, data: resultData };
        } catch (error) {
            console.error(`Erro ao atualizar na tabela ${table}:`, error);
            return { success: false, error };
        }
    }

    /**
     * Remove dados de uma tabela
     * @param {string} table - Nome da tabela
     * @param {Object} filters - Filtros para a remoção
     * @returns {Promise<Object>} Resultado da remoção
     */
    async delete(table, filters = {}) {
        try {
            let query = this.getClient().from(table).delete();
            Object.entries(filters).forEach(([key, value]) => {
                query = query.eq(key, value);
            });
            const { data, error } = await query;
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error(`Erro ao remover da tabela ${table}:`, error);
            return { success: false, error };
        }
    }
}

// Instância singleton
const supabaseService = new SupabaseService();

// Exporta a instância e a classe
export default supabaseService;
export { SupabaseService }; 