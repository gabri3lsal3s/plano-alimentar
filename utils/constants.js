// ===================== CONSTANTES GLOBAIS ===================== //

// Configurações do Supabase
export const SUPABASE_CONFIG = {
    URL: 'https://nrjvrwglupwuskoevbal.supabase.co',
    KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yanZyd2dsdXB3dXNrb2V2YmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2ODc1NDcsImV4cCI6MjA2NjI2MzU0N30.2XDkrjsMdMlnT1g0-7ThLg8Gb9o6zC5Z2enfXB9BOl0'
};

// Horários das refeições
export const REFEICOES_HORARIOS = {
    cafe: { nome: 'Café da Manhã', horario: '07h às 09h' },
    lancheM: { nome: 'Lanche da Manhã', horario: '09h às 11h' },
    almoco: { nome: 'Almoço', horario: '12h às 14h' },
    lancheT: { nome: 'Lanche da Tarde', horario: '15h às 17h' },
    janta: { nome: 'Janta', horario: '19h às 21h' },
    ceia: { nome: 'Ceia', horario: '21h às 23h' }
};

// Dias da semana para exercícios
export const DIAS_SEMANA = {
    0: 'domingo',
    1: 'segunda',
    2: 'terca',
    3: 'quarta',
    4: 'quinta',
    5: 'sexta',
    6: 'sabado'
};

// Classes CSS para estados
export const CSS_CLASSES = {
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success',
    ACTIVE: 'active',
    HIDDEN: 'hidden',
    FIXED: 'fixed'
};

// Mensagens padrão
export const MESSAGES = {
    LOADING: 'Carregando...',
    ERROR_GENERIC: 'Ocorreu um erro. Tente novamente.',
    SUCCESS_SAVE: 'Salvo com sucesso!',
    SUCCESS_DELETE: 'Removido com sucesso!',
    CONFIRM_DELETE: 'Tem certeza que deseja remover?'
};

// Configurações de notificação
export const NOTIFICATION_CONFIG = {
    PERMISSION_GRANTED: 'granted',
    PERMISSION_DENIED: 'denied',
    PERMISSION_DEFAULT: 'default'
};

// Breakpoints para responsividade
export const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200
}; 