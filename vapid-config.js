// Configuração VAPID para notificações push
// Para gerar suas próprias chaves VAPID, use: https://web-push-codelab.glitch.me/

const VAPID_CONFIG = {
    // Chave pública VAPID (exemplo - você deve gerar suas próprias chaves)
    publicKey: 'BEl62iUYgUivxIkv69yViEuiBIa1HI0FyKZ0aPoaQZ3_EWuRB5vmpnPkKqeviCjZ9koQbcgK8cxjWlaVR0FpuHDI',
    
    // Chave privada VAPID (mantenha segura no servidor)
    privateKey: 'YOUR_PRIVATE_KEY_HERE',
    
    // Email de contato para notificações push
    email: 'contato@ikigaihub.com'
};

// Função para obter a chave pública VAPID
function getVapidPublicKey() {
    return VAPID_CONFIG.publicKey;
}

// Função para converter chave base64 para Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Exportar funções se estiver usando módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VAPID_CONFIG,
        getVapidPublicKey,
        urlBase64ToUint8Array
    };
} 