// ===================== FUNÇÕES UTILITÁRIAS ===================== //

import { REFEICOES_HORARIOS, DIAS_SEMANA, MESSAGES, CSS_CLASSES } from './constants.js';

/**
 * Determina a refeição atual baseada no horário
 * @returns {string} Chave da refeição atual
 */
export function getRefeicaoAtual() {
    const agora = new Date();
    const hora = agora.getHours();
    
    if (hora >= 7 && hora < 9) return 'cafe';
    if (hora >= 9 && hora < 11) return 'lancheM';
    if (hora >= 12 && hora < 14) return 'almoco';
    if (hora >= 15 && hora < 17) return 'lancheT';
    if (hora >= 19 && hora < 21) return 'janta';
    if (hora >= 21 || hora < 7) return 'ceia';
    if (hora >= 11 && hora < 12) return 'almoco';
    if (hora >= 14 && hora < 15) return 'lancheT';
    if (hora >= 17 && hora < 19) return 'janta';
    return 'ceia';
}

/**
 * Determina o exercício atual baseado no dia da semana
 * @returns {string} Chave do exercício atual
 */
export function getExercicioAtual() {
    const agora = new Date();
    const diaSemana = agora.getDay();
    
    switch(diaSemana) {
        case 1: return 'segunda';
        case 2: return 'terca';
        case 3: return 'quarta';
        case 4: return 'quinta';
        case 5:
        case 6:
        case 0:
        default: return 'adicional';
    }
}

/**
 * Formata data para exibição
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data formatada
 */
export function formatarData(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}

/**
 * Formata hora para exibição
 * @param {Date} date - Data/hora a ser formatada
 * @returns {string} Hora formatada
 */
export function formatarHora(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

/**
 * Verifica se o dispositivo é mobile
 * @returns {boolean} True se for mobile
 */
export function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Adiciona classe CSS a um elemento
 * @param {HTMLElement} element - Elemento alvo
 * @param {string} className - Classe a ser adicionada
 */
export function addClass(element, className) {
    if (element && element.classList) {
        element.classList.add(className);
    }
}

/**
 * Remove classe CSS de um elemento
 * @param {HTMLElement} element - Elemento alvo
 * @param {string} className - Classe a ser removida
 */
export function removeClass(element, className) {
    if (element && element.classList) {
        element.classList.remove(className);
    }
}

/**
 * Alterna classe CSS em um elemento
 * @param {HTMLElement} element - Elemento alvo
 * @param {string} className - Classe a ser alternada
 */
export function toggleClass(element, className) {
    if (element && element.classList) {
        element.classList.toggle(className);
    }
}

/**
 * Mostra elemento
 * @param {HTMLElement} element - Elemento a ser mostrado
 */
export function showElement(element) {
    if (element) {
        element.style.display = '';
        removeClass(element, CSS_CLASSES.HIDDEN);
    }
}

/**
 * Esconde elemento
 * @param {HTMLElement} element - Elemento a ser escondido
 */
export function hideElement(element) {
    if (element) {
        element.style.display = 'none';
        addClass(element, CSS_CLASSES.HIDDEN);
    }
}

/**
 * Debounce function para otimizar performance
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function para otimizar performance
 * @param {Function} func - Função a ser executada
 * @param {number} limit - Limite de tempo em ms
 * @returns {Function} Função throttled
 */
export function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Valida se um objeto está vazio
 * @param {Object} obj - Objeto a ser validado
 * @returns {boolean} True se estiver vazio
 */
export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Copia texto para clipboard
 * @param {string} text - Texto a ser copiado
 * @returns {Promise<boolean>} True se copiado com sucesso
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Erro ao copiar para clipboard:', err);
        return false;
    }
}

/**
 * Gera ID único
 * @returns {string} ID único
 */
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Sanitiza string para uso seguro em HTML
 * @param {string} str - String a ser sanitizada
 * @returns {string} String sanitizada
 */
export function sanitizeString(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
} 