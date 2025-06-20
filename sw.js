const CACHE_NAME = 'plano-alimentar-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/exercicios.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});

// Gerenciar mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'NOTIFICACAO_REFEICAO') {
    const refeicao = event.data.refeicao;
    mostrarNotificacaoRefeicao(refeicao);
  } else if (event.data && event.data.type === 'NOTIFICACAO_TREINO') {
    mostrarNotificacaoTreino();
  } else if (event.data && event.data.type === 'PUSH_SUBSCRIPTION') {
    // Armazenar subscription para uso posterior
    self.pushSubscription = event.data.subscription;
  }
});

// Receber notificações push
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  let notificationData = {
    title: 'IkigaiHub',
    body: 'Nova notificação',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    tag: 'default',
    requireInteraction: true,
    data: {
      url: '/'
    }
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        ...notificationData,
        ...data
      };
    } catch (error) {
      console.error('Erro ao parsear dados da notificação push:', error);
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
  );
});

// Mostrar notificação de refeição
function mostrarNotificacaoRefeicao(refeicao) {
  const receita = refeicao.receitas[0];
  
  const opcoesNotificacao = {
    body: `É hora do ${refeicao.nome}! ${receita.titulo}`,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    tag: 'refeicao',
    requireInteraction: true,
    data: {
      url: '/plano_alimentar.html',
      refeicao: refeicao,
      tipo: 'refeicao'
    },
    actions: [
      {
        action: 'ver',
        title: 'Ver Receita',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'adiar',
        title: 'Adiar 15min',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  return self.registration.showNotification('IkigaiHub - Hora da Refeição!', opcoesNotificacao);
}

// Mostrar notificação de treino
function mostrarNotificacaoTreino() {
  const opcoesNotificacao = {
    body: 'É hora de treinar! Acesse sua rotina de exercícios.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    tag: 'treino',
    requireInteraction: true,
    data: {
      url: '/exercicios.html',
      tipo: 'treino'
    },
    actions: [
      {
        action: 'ver',
        title: 'Ver Treino',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'adiar',
        title: 'Adiar 30min',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  return self.registration.showNotification('IkigaiHub - Hora do Treino!', opcoesNotificacao);
}

// Gerenciar cliques na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'ver') {
    // Abrir a página correspondente
    const url = event.notification.data.url;
    event.waitUntil(
      clients.openWindow(url)
    );
  } else if (event.action === 'adiar') {
    // Adiar a notificação
    const tag = event.notification.tag;
    if (tag === 'refeicao') {
      const refeicao = event.notification.data.refeicao;
      setTimeout(() => {
        mostrarNotificacaoRefeicao(refeicao);
      }, 15 * 60 * 1000);
    } else if (tag === 'treino') {
      setTimeout(() => {
        mostrarNotificacaoTreino();
      }, 30 * 60 * 1000);
    }
  } else {
    // Clique na notificação principal
    const url = event.notification.data.url;
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Gerenciar fechamento da notificação
self.addEventListener('notificationclose', (event) => {
  console.log('Notificação fechada:', event.notification.tag);
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 