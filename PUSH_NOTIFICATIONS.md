# Notificações Push - IkigaiHub

Este documento explica como configurar e usar as notificações push no IkigaiHub.

## O que são Notificações Push?

As notificações push são mensagens que podem ser enviadas para o usuário mesmo quando o aplicativo não está aberto. Elas são diferentes das notificações locais (pop-ups) porque:

- Funcionam mesmo quando o navegador está fechado
- Podem ser enviadas por um servidor
- São mais confiáveis e persistentes
- Seguem padrões web modernos

## Configuração Necessária

### 1. Gerar Chaves VAPID

Para usar notificações push, você precisa gerar chaves VAPID (Voluntary Application Server Identification):

1. Acesse: https://web-push-codelab.glitch.me/
2. Clique em "Generate Keys"
3. Copie as chaves geradas

### 2. Atualizar Configuração

Edite o arquivo `vapid-config.js`:

```javascript
const VAPID_CONFIG = {
    publicKey: 'SUA_CHAVE_PUBLICA_AQUI',
    privateKey: 'SUA_CHAVE_PRIVADA_AQUI',
    email: 'seu-email@exemplo.com'
};
```

### 3. Configurar Servidor (Opcional)

Para notificações push completas, você precisará de um servidor que envie as notificações. O código atual funciona com notificações agendadas localmente.

## Como Funciona

### 1. Registro do Service Worker

O Service Worker é registrado automaticamente quando o usuário acessa o site:

```javascript
const registration = await navigator.serviceWorker.register('/sw.js');
```

### 2. Solicitação de Permissão

O usuário é solicitado a permitir notificações:

```javascript
const permission = await Notification.requestPermission();
```

### 3. Criação da Subscription

Uma subscription push é criada:

```javascript
const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(getVapidPublicKey())
});
```

### 4. Agendamento de Notificações

As notificações são agendadas baseadas nos horários configurados:

- **Refeições**: Baseadas nos horários personalizados
- **Treinos**: Baseadas nos dias e horários configurados

## Tipos de Notificação

### Notificações de Refeição

- **Quando**: Nos horários configurados para cada refeição
- **Conteúdo**: Nome da refeição, receita e valores nutricionais
- **Ações**: "Ver Receita" e "Adiar 15min"

### Notificações de Treino

- **Quando**: Nos dias e horários configurados para treinos
- **Conteúdo**: Lembrete para treinar
- **Ações**: "Ver Treino" e "Adiar 30min"

## Configuração de Horários

### Refeições

Configure os horários de cada refeição:

- Café da Manhã
- Lanche da Manhã
- Almoço
- Lanche da Tarde
- Janta
- Ceia

### Treinos

Configure os dias da semana e horários para treinos:

- Segunda a Domingo
- Horários personalizados por dia
- Ativar/desativar por dia

## Testando Notificações

### Botão de Teste

Use os botões "Testar Notificação" para verificar se as notificações estão funcionando.

### Console do Navegador

Abra o console do navegador (F12) para ver logs detalhados sobre:

- Registro do Service Worker
- Criação de subscriptions
- Agendamento de notificações
- Erros e avisos

## Troubleshooting

### Permissão Negada

Se o usuário negar permissão:

1. Vá nas configurações do navegador
2. Procure por "Notificações"
3. Permita notificações para o site

### Service Worker Não Registrado

Verifique se:

1. O arquivo `sw.js` existe
2. O site está sendo servido via HTTPS (ou localhost)
3. O navegador suporta Service Workers

### Notificações Não Aparecem

Verifique:

1. Permissões do navegador
2. Configuração de horários
3. Console para erros
4. Status do Service Worker

## Recursos Avançados

### Background Sync

O manifest.json inclui suporte para background sync, permitindo sincronização offline.

### Shortcuts

Atalhos rápidos para acessar:
- Plano Alimentar
- Exercícios

### PWA Features

- Instalação como app
- Funcionamento offline
- Notificações push
- Interface nativa

## Segurança

- As chaves VAPID são seguras para uso público
- A chave privada deve ser mantida no servidor
- As notificações são criptografadas
- Permissões são solicitadas explicitamente

## Compatibilidade

- Chrome 42+
- Firefox 44+
- Safari 16+
- Edge 17+

## Próximos Passos

Para implementar notificações push completas:

1. Configure um servidor backend
2. Implemente envio de notificações via servidor
3. Adicione suporte a notificações em tempo real
4. Implemente sincronização entre dispositivos 