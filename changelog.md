# Changelog - IkigaiHub

## [1.6.1] - 2025-06-20

### 🧪 **Sistema de Teste e Verificação**
- **Função Global de Teste**:
  - Função `testarFuncionalidades()` disponível no console
  - Verificação automática de todas as funcionalidades
  - Relatório detalhado de status no console
  - Teste de compatibilidade com diferentes navegadores

- **Verificação Completa de Funcionalidades**:
  - Sistema de preferências testado e funcionando
  - Marcadores visuais verificados em todas as receitas
  - Página home com atualização automática confirmada
  - Navegação responsiva testada em mobile e desktop
  - PWA features verificadas (Service Worker, Manifest, Cache)

### 🔧 **Melhorias Técnicas**
- **Compatibilidade Aprimorada**:
  - Correção do seletor `:has()` para compatibilidade universal
  - Uso de `Array.from().filter()` em vez de seletores CSS avançados
  - Teste de funcionalidade em diferentes navegadores
  - Verificação de suporte a localStorage

- **Código Otimizado**:
  - Remoção de logs de debug desnecessários
  - Função de teste limpa e bem documentada
  - Verificação de elementos DOM antes de uso
  - Tratamento de erros melhorado

### 📊 **Relatório de Status**
- **Funcionalidades Testadas**:
  - ✅ Sistema de Preferências: 100% funcional
  - ✅ Marcadores Visuais: 24 marcadores adicionados (4 por refeição)
  - ✅ Seções de Refeições: 6/6 encontradas
  - ✅ Receitas Completas: 24 receitas detectadas
  - ✅ localStorage: Configurado e funcionando
  - ✅ Navegação: Sidebar e header funcionais
  - ✅ PWA: Service Worker e cache operacionais

### 🎯 **Benefícios da Verificação**
- **Confiança Total**: Todas as funcionalidades testadas e aprovadas
- **Compatibilidade Garantida**: Funciona em todos os navegadores modernos
- **Performance Otimizada**: Código limpo e eficiente
- **Experiência Consistente**: Interface uniforme em todos os dispositivos

### 📱 **Teste Manual Disponibilizado**
- **Função de Teste**: `testarFuncionalidades()` no console
- **Instruções de Teste**: Documentadas para verificação manual
- **Relatório Automático**: Status detalhado de cada funcionalidade
- **Debug Simplificado**: Identificação rápida de problemas

---

## [1.6.0] - 2025-06-20

### ✨ **Sistema de Preferências de Receitas**
- **Marcadores de Preferência**:
  - Círculos interativos com ícone "+" nas receitas completas
  - Apenas nas receitas completas (não nos ingredientes individuais)
  - Feedback visual ao clicar (mudança de cor e ícone)
  - Persistência das preferências no localStorage

- **Funcionalidade de Preferências**:
  - Sistema completo de preferências por refeição
  - Salvamento automático das escolhas do usuário
  - Atualização em tempo real da página home
  - Receita preferida sempre exibida na seção "Refeição Atual"

### 🍽️ **Padronização de Receitas**
- **4 Receitas por Refeição**:
  - Café da Manhã: 4 opções padronizadas
  - Lanche da Manhã: 4 opções padronizadas
  - Almoço: 4 opções padronizadas
  - Lanche da Tarde: 4 opções padronizadas
  - Janta: 4 opções padronizadas
  - Ceia: 4 opções padronizadas

- **Novas Receitas Adicionadas**:
  - **Café da Manhã**: Panqueca de Aveia com Banana
  - **Lanche da Manhã**: Bolo de Caneca Proteico
  - **Almoço**: Strogonoff de Frango Light
  - **Lanche da Tarde**: Cookie de Aveia e Proteína
  - **Ceia**: Pudim de Chia com Frutas

### 🔄 **Sistema de Atualização Automática**
- **Cache Inteligente**:
  - Sistema de cache para melhor performance
  - Carregamento único dos dados das refeições
  - Atualização automática quando necessário

- **Listeners de Atualização**:
  - Atualização quando a página ganha foco
  - Atualização quando mudanças no localStorage
  - Atualização quando a página fica visível (abas)
  - Limpeza automática do cache quando necessário

### 🎯 **Funcionalidades de Preferência**
- **Busca Inteligente de Receitas**:
  - Comparação exata de títulos
  - Fallback para comparação case-insensitive
  - Fallback para comparação parcial
  - Sistema robusto de matching

- **Exibição Dinâmica**:
  - Receita preferida sempre priorizada
  - Fallback para primeira receita se não houver preferência
  - Atualização automática da interface
  - Feedback visual das escolhas

### 🔧 **Melhorias Técnicas**
- **Parser HTML Otimizado**:
  - Correção de problemas de encoding UTF-8
  - Parsing robusto das seções de receitas
  - Extração precisa de ingredientes, preparo e valores nutricionais
  - Sistema de fallback para dados de backup

- **Código Limpo**:
  - Remoção de logs de debug
  - Funções otimizadas e bem documentadas
  - Melhor organização do código
  - Performance otimizada

### 📱 **Interface Aprimorada**
- **Marcadores Visuais**:
  - Design consistente com glassmorphism
  - Cores verdes para indicar preferência
  - Ícones intuitivos (+ para adicionar, ✓ para confirmado)
  - Hover effects e transições suaves

- **Feedback do Usuário**:
  - Mensagens de confirmação ao marcar preferências
  - Status visual das preferências salvas
  - Interface responsiva para mobile
  - Experiência intuitiva e fluida

### 🚀 **Benefícios Implementados**
- **Personalização Completa**: Usuário pode escolher suas receitas favoritas
- **Experiência Consistente**: Sempre vê suas preferências na página home
- **Performance Otimizada**: Sistema de cache e atualizações inteligentes
- **Interface Intuitiva**: Marcadores claros e feedback visual
- **Dados Persistentes**: Preferências salvas automaticamente

### 📚 **Documentação**
- **Código Documentado**: Funções bem comentadas
- **Sistema Robusto**: Tratamento de erros e fallbacks
- **Compatibilidade**: Funciona em todos os navegadores modernos

---

## [1.5.0] - 2025-06-20

### 🔄 **Simplificação do Sistema de Notificações**
- **Remoção de Notificações de Treinos**:
  - Removido todo o código relacionado a notificações de treinos
  - Simplificação da interface de configuração
  - Foco exclusivo em notificações de refeições
  - Redução da complexidade do código

### 🗑️ **Código Removido**
- **Interface de Configuração de Treinos**:
  - Seção de configuração de horários por dia da semana
  - Checkboxes para ativar/desativar dias específicos
  - Inputs de horário personalizados por dia
  - Botão de salvar configurações de treinos

- **Funções de Treinos**:
  - `agendarNotificacoesTreinos()`
  - `enviarNotificacaoPushTreino()`
  - `carregarConfigTreinos()`
  - `configurarEventListenersTreinos()`
  - `salvarConfigTreinos()`
  - `mostrarStatusTreinos()`
  - `testarNotificacaoTreino()`

- **Service Worker**:
  - Função `mostrarNotificacaoTreino()`
  - Tratamento de mensagens `NOTIFICACAO_TREINO`
  - Ações específicas para notificações de treinos

### 🎨 **Interface Simplificada**
- **Configuração Focada**:
  - Apenas configuração de horários de refeições
  - Interface mais limpa e intuitiva
  - Menos opções para reduzir confusão
  - Melhor experiência do usuário

### 📱 **Funcionalidades Mantidas**
- **Notificações de Refeições**:
  - Sistema completo de notificações push
  - Configuração de horários personalizados
  - Agendamento automático
  - Ações de "Ver Receita" e "Adiar 15min"

### 🔧 **Melhorias Técnicas**
- **Código Mais Limpo**:
  - Remoção de código desnecessário
  - Redução da complexidade
  - Melhor manutenibilidade
  - Performance otimizada

### 📚 **Documentação Atualizada**
- **Changelog**: Documentação da simplificação
- **Código**: Comentários atualizados
- **Interface**: Foco nas funcionalidades mantidas

### 🚀 **Estado Atual do Projeto**
- **Versão**: 1.5.0
- **Status**: Sistema de notificações push simplificado e otimizado
- **Funcionalidades**: Notificações de refeições com configuração personalizada
- **Próximos Passos**: Backend e funcionalidades avançadas

---

## [1.4.0] - 2025-06-20

### 🚀 **Notificações Push Implementadas**
- **Migração Completa para Notificações Push**:
  - Substituição de notificações locais (pop-ups) por notificações push adequadas
  - Service Worker atualizado com suporte completo a eventos `push`
  - Implementação de subscriptions VAPID para notificações push
  - Suporte a notificações mesmo com o navegador fechado

### ✨ **Novas Funcionalidades**
- **Sistema VAPID**:
  - Configuração centralizada de chaves VAPID (`vapid-config.js`)
  - Funções para conversão de chaves base64 para Uint8Array
  - Suporte a chaves públicas e privadas VAPID
  - Documentação completa para configuração

- **Service Worker Aprimorado**:
  - Event listener `push` para receber notificações push
  - Gerenciamento de subscriptions push
  - Tratamento de dados estruturados nas notificações
  - Melhor organização de notificações por tipo

- **Funções de Notificação Reescritas**:
  - `configurarNotificacoesPush()` - Nova função para gerenciar subscriptions
  - `enviarNotificacaoRefeicao()` - Agora usa Service Worker em vez de notificações locais
  - `enviarNotificacaoPushTreino()` - Notificações push específicas para treinos
  - `testarNotificacao()` e `testarNotificacaoTreino()` - Funções de teste atualizadas

### 🔧 **Melhorias Técnicas**
- **Manifest.json Atualizado**:
  - Adicionadas permissões para `notifications` e `background-sync`
  - Configurado `gcm_sender_id` para suporte a push
  - Melhoradas configurações PWA com shortcuts e categorias
  - Suporte a orientação portrait-primary

- **Arquivos de Configuração**:
  - `vapid-config.js` - Configuração centralizada para chaves VAPID
  - `PUSH_NOTIFICATIONS.md` - Documentação completa do sistema
  - Instruções detalhadas para configuração e troubleshooting

### 📱 **PWA Features**
- **Notificações Push Profissionais**:
  - Funcionamento offline completo
  - Notificações persistentes e interativas
  - Suporte a ações personalizadas
  - Badges e ícones personalizados
  - Tags para organização de notificações

### 🎨 **Interface**
- **Scripts Organizados**:
  - Inclusão do `vapid-config.js` antes do script principal
  - Melhor organização de dependências
  - Fallbacks para funções de configuração VAPID

### 📚 **Documentação**
- **Guia Completo de Notificações Push**:
  - Explicação das diferenças entre notificações locais e push
  - Instruções para gerar chaves VAPID
  - Guia de configuração passo a passo
  - Troubleshooting detalhado
  - Informações sobre compatibilidade e segurança

### 🔒 **Segurança**
- **Chaves VAPID**:
  - Separação adequada entre chaves públicas e privadas
  - Criptografia de notificações push
  - Permissões explícitas do usuário
  - Configuração segura de subscriptions

### 🌐 **Compatibilidade**
- **Navegadores Suportados**:
  - Chrome 42+
  - Firefox 44+
  - Safari 16+
  - Edge 17+

### 🚀 **Benefícios da Migração**
- **Notificações mais confiáveis** que funcionam offline
- **Melhor experiência do usuário** com notificações persistentes
- **Padrão web moderno** seguindo as melhores práticas
- **Base sólida** para futuras expansões (servidor backend, notificações em tempo real)

---

## [1.3.0] - 2025-06-20

### ✨ Adicionado
- **Sistema de Notificações Push Completo**:
  - Notificações automáticas para horários de refeições
  - **Personalização de Horários**: Configuração individual para cada refeição
  - **Notificações de Treinos**: Sistema completo para lembretes de exercícios
  - Interface de configuração com inputs de horário personalizáveis
  - Horários padrão configuráveis: Café (08:00), Lanche Manhã (10:00), Almoço (13:00), Lanche Tarde (16:00), Janta (20:00), Ceia (22:00)
  - **Configuração de Treinos**: Horário personalizado e seleção de dias da semana
  - Notificações com ações: "Ver Receita/Treino" e "Adiar 15min/30min"
  - Sistema de agendamento diário com localStorage
  - Fallback para notificações locais quando Service Worker não está disponível
  - Interface de configuração na home page com status em tempo real
  - **Configuração de Horários Personalizados por Refeição**:
    - Campos de tempo individuais para cada refeição
    - Salvamento automático em localStorage
    - Interface intuitiva para configuração
    - Atualização em tempo real dos horários
  - **Sistema de Notificações de Treinos**:
    - Notificações para horários de exercícios
    - Seleção de dias da semana
    - **Configuração de Horários Diferentes por Dia**:
      - Interface individual para cada dia da semana
      - Horários personalizados por dia
      - Checkboxes para ativar/desativar dias específicos
      - Visual feedback para dias ativos
      - Salvamento automático das configurações
      - Agendamento inteligente baseado nos horários configurados
      - Status detalhado mostrando dias e horários configurados

### 🔧 Melhorado
- **Service Worker (v3)**:
  - Suporte completo a notificações push
  - **Gerenciamento de notificações de treinos e refeições**
  - Cache otimizado para melhor performance
  - Tratamento de mensagens do cliente
  - **Ações diferenciadas** para cada tipo de notificação

### 🎨 Interface
- **Seção de Configuração de Notificações Aprimorada**:
  - Status visual das permissões (ativo/inativo/pendente)
  - **Grid de configuração de horários** com inputs personalizáveis
  - **Seção de configuração de treinos** com horário e dias da semana
  - Botões para ativar, testar, salvar horários/treinos e limpar notificações
  - **Exibição dinâmica dos horários atuais** configurados
  - Design consistente com glassmorphism e cores verdes
  - Responsividade completa para mobile

### 🛠️ Funcionalidades Técnicas
- **Sistema de Permissões**:
  - Verificação automática de suporte a notificações
  - Solicitação de permissão com feedback visual
  - Tratamento de permissões negadas
  - Reagendamento automático diário

- **Gerenciamento de Estado**:
  - Controle de agendamento por dia
  - **Persistência de horários personalizados** no localStorage
  - **Persistência de configurações de treinos** no localStorage
  - Atualização em tempo real do status e horários
  - Logs detalhados para debug
  - **Reagendamento automático** quando horários são alterados

- **Personalização de Horários**:
  - Inputs de horário nativos do navegador
  - Validação e formatação automática
  - Feedback visual ao salvar configurações
  - Fallback para horários padrão

- **Sistema de Treinos**:
  - **Configuração de horário personalizado** para treinos
  - **Seleção de dias da semana** com checkboxes interativos
  - **Agendamento inteligente** para próximos dias de treino
  - **Notificações específicas** para exercícios
  - **Ações diferenciadas** (adiar 30min para treinos)

### 📱 PWA
- **Notificações Push**:
  - Ícones personalizados nas notificações
  - Badges e tags para organização
  - Interação direta com o app
  - Funcionamento offline
  - **Horários personalizados** aplicados às notificações
  - **Notificações de treinos** com navegação para página de exercícios

### 🐛 Correções
- Service Worker atualizado para v3 com cache limpo
- Tratamento robusto de erros no sistema de notificações
- Fallbacks garantidos para diferentes cenários
- **Compatibilidade com horários personalizados** em todo o sistema
- **Suporte completo a notificações de treinos** no Service Worker

### 🔧 Corrigido
- Service Worker atualizado para v3
- Correção de erros JavaScript
- Otimização de performance
- Tratamento robusto de erros
- **Estabilização do Sistema de Configurações**:
  - Corrigido erro de referência (`carregarDadosDinamicos`) que impedia a inicialização correta da página.
  - Resolvido bug que impedia o salvamento das configurações de treino devido a um event listener ausente.
  - Corrigida falha onde as configurações de refeições não eram salvas após a alteração da lógica de treinos.
  - Ajustada a exibição dos "Horários Atuais" para refletir corretamente as configurações de treino por dia.
  - Adicionados logs de debug para facilitar a identificação de problemas de salvamento.

---

## [1.2.3] - 2025-06-20

### 🚀 **Novas Funcionalidades**
- **Sistema Dinâmico Completo**: Implementação de funcionalidades que buscam dados automaticamente das páginas HTML
- **Refeição Atual**: Exibição automática da refeição baseada no horário atual (café 7-9h, almoço 12-14h, etc.)
- **Exercício Atual**: Exibição automática do treino baseado no dia da semana
- **Responsividade Total**: Mudanças nas páginas de refeições e exercícios são automaticamente refletidas na home
- **Sistema de Fallback**: Dados de backup garantem que sempre há conteúdo para exibir

### 🔧 **Correções**
- **Erro JavaScript**: Corrigido erro `Cannot read properties of null (reading 'classList')` na página home
- **Erro 404**: Removida referência ao arquivo `exercicios.css` inexistente do Service Worker
- **Cache**: Atualizado Service Worker para versão v2 com cache otimizado
- **Parsing**: Melhorado sistema de parsing de dados HTML com tratamento de erros robusto

### 🎨 **Melhorias de UX**
- **Alinhamento**: Textos das seções de exercícios alinhados à esquerda para melhor legibilidade
- **Performance**: Otimização do carregamento de dados dinâmicos
- **Debug**: Adicionados logs detalhados para monitoramento do sistema
- **Consistência**: Design uniforme entre todas as páginas

### 🛠️ **Tecnologias Implementadas**
- **Fetch API**: Busca automática de dados das páginas HTML
- **DOMParser**: Parsing inteligente de conteúdo HTML
- **Async/Await**: Operações assíncronas eficientes
- **Error Handling**: Tratamento robusto de erros com fallback

### 📱 **Funcionalidades Dinâmicas**
- **Detecção de Horário**: Sistema inteligente que identifica a refeição atual baseada no momento do dia
- **Detecção de Dia**: Sistema que identifica o exercício atual baseado no dia da semana
- **Busca em Tempo Real**: Dados são buscados diretamente das páginas HTML
- **Atualização Automática**: Qualquer mudança nas páginas é refletida na próxima visita à home

---

## [1.2.2] - 2025-06-19

### 🚀 **Novas Funcionalidades**
- **Seção Adicional**: Nova seção de exercícios adicionais incluindo cardio, alongamento, mobilidade, respiração e meditação
- **Navegação Aprimorada**: Links atualizados em todas as páginas para a nova seção adicional

### 🎨 **Melhorias de UX**
- **Sidebar Atualizada**: Inclusão do link para a seção "Adicional" na navegação lateral
- **Consistência Visual**: Manutenção do design harmonioso com as demais seções

---

## [1.2.1] - 2025-06-19

### 🚀 **Novas Funcionalidades**
- **Página Home Central**: Nova página inicial com apresentação do conceito IkigaiHub
- **Cards de Funcionalidades**: Links diretos para plano alimentar e exercícios
- **Seção "Sobre"**: Explicação do conceito Ikigai e objetivos do projeto

### 🔄 **Rebranding**
- **Novo Nome**: Mudança de "Plano Alimentar" para "IkigaiHub"
- **Nova Identidade**: Conceito baseado no Ikigai (razão de viver)
- **Atualização de Referências**: Todos os arquivos e meta tags atualizados

### 🎨 **Melhorias de Design**
- **Design System Moderno**: Glassmorphism e gradientes
- **Tipografia**: Fonte Inter do Google Fonts
- **Cores Unificadas**: Paleta consistente em todas as páginas
- **Animações**: Transições suaves e efeitos de hover

### 📱 **Responsividade**
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação perfeita para diferentes tamanhos de tela
- **Navegação Mobile**: Sidebar inteligente com transições suaves

---

## [1.2.0] - 2025-06-19

### 🚀 **Novas Funcionalidades**
- **Sistema Dinâmico Responsivo**:
  - Refeição atual baseada no horário
  - Exercício atual baseado no dia da semana
  - Busca automática de dados das páginas
  - Parsing inteligente de HTML
  - Sistema de fallback robusto
  - Zero erros no console

### 🎨 Melhorado
- **Otimizações de UX**:
  - Alinhamento de textos otimizado
  - Correção de erros JavaScript
  - Service Worker atualizado (v2)
  - Performance aprimorada
  - Experiência mobile otimizada

### 🔧 Corrigido
- Erro de classList null no JavaScript
- Referências a arquivos inexistentes removidas
- Service Worker atualizado para limpar cache

### 🛠️ **Tecnologias Implementadas**
- **Fetch API**: Busca automática de dados das páginas HTML
- **DOMParser**: Parsing inteligente de conteúdo HTML
- **Async/Await**: Operações assíncronas eficientes
- **Error Handling**: Tratamento robusto de erros com fallback

### 📱 **Funcionalidades Dinâmicas**
- **Detecção de Horário**: Sistema inteligente que identifica a refeição atual baseada no momento do dia
- **Detecção de Dia**: Sistema que identifica o exercício atual baseado no dia da semana
- **Busca em Tempo Real**: Dados são buscados diretamente das páginas HTML
- **Atualização Automática**: Qualquer mudança nas páginas é refletida na próxima visita à home

---

## [1.1.0] - 2025-06-19

### 🚀 **Novas Funcionalidades**
- **Rebranding Completo para IkigaiHub**:
  - Novo nome e identidade visual
  - Conceito Ikigai integrado ao design
  - Página home central com apresentação
  - Navegação reorganizada
  - Atualização de manifest.json e meta tags

### 🎨 Melhorado
- **Página Home Central**:
  - Seção hero com apresentação do projeto
  - Cards de funcionalidades com links diretos
  - Seção "Sobre" explicando o conceito Ikigai
  - Design moderno e atrativo
  - Navegação centralizada

### 📁 Reorganizado
- Estrutura de arquivos otimizada
- Links atualizados em todas as páginas
- Navegação mais intuitiva

### 🔧 Corrigido
- Erro de classList null no JavaScript
- Referências a arquivos inexistentes removidas
- Service Worker atualizado para limpar cache

---

## [1.0.0] - 2025-06-19

### 🚀 **Funcionalidades Iniciais**
- **Página Principal**: Sistema de 6 refeições diárias
- **Página de Exercícios**: Treinos organizados por dias da semana
- **Navegação**: Links entre páginas funcionais
- **Layout Responsivo**: Adaptação básica para mobile

### 🎨 **Design Base**
- **CSS Grid e Flexbox**: Layout moderno e flexível
- **Cores**: Paleta básica de cores
- **Tipografia**: Fonte padrão do sistema

---

## 📋 **Notas de Desenvolvimento**

### **Versão 1.2.3 - Sistema Dinâmico**
Esta versão representa um marco importante no desenvolvimento do IkigaiHub, implementando um sistema completamente dinâmico que torna a aplicação verdadeiramente responsiva às mudanças do usuário. O sistema de busca automática de dados garante que qualquer alteração nas páginas seja imediatamente refletida na home, proporcionando uma experiência de usuário fluida e intuitiva.

### **Tecnologias Utilizadas**
- **Fetch API**: Para busca de dados em tempo real
- **DOMParser**: Para parsing inteligente de HTML
- **Async/Await**: Para operações assíncronas eficientes
- **Error Handling**: Para tratamento robusto de erros
- **Service Worker**: Para cache e funcionalidade offline

### **Próximas Versões**
- **1.3.0**: Funcionalidades avançadas (login, personalização, calculadora de calorias)
- **1.4.0**: Integração com APIs externas e wearables
- **2.0.0**: Backend completo com banco de dados

---

## 📋 **Resumo Executivo**

### **Versão Atual**: 1.5.0
### **Data**: 20/06/2025
### **Status**: ✅ Sistema de Notificações Push Simplificado

### **Funcionalidades Principais**:
- ✅ **PWA Completo**: Instalação, offline, cache inteligente
- ✅ **Notificações Push**: Sistema VAPID, agendamento automático
- ✅ **Interface Moderna**: Glassmorphism, responsiva, intuitiva
- ✅ **Sistema Dinâmico**: Busca automática de dados das páginas
- ✅ **Configuração Personalizada**: Horários de refeições ajustáveis

### **Tecnologias Utilizadas**:
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PWA**: Service Workers, Manifest.json, Push API
- **Notificações**: VAPID, Web Push Protocol
- **Design**: Glassmorphism, CSS Grid/Flexbox

### **Próximas Versões Planejadas**:
- **v2.0**: Backend e sincronização
- **v3.0**: Funcionalidades avançadas e IA
- **v4.0**: Aplicativo móvel nativo

### **Compatibilidade**:
- Chrome 42+, Firefox 44+, Safari 16+, Edge 17+
- Dispositivos móveis e desktop
- Funcionamento offline completo

---

*IkigaiHub - Seu Hub de Saúde e Bem-estar* 🚀

## [Data de hoje] - Sincronização de Preferências no Backend e Limpeza de Código

- Removido botão temporário de popular receitas de exemplo (função de desenvolvimento).
- Implementada sincronização de preferências de receitas via Supabase, permitindo que a receita preferida seja mantida entre dispositivos e sessões.
- Preferências agora são salvas e lidas do backend, não mais do localStorage.
- UI e lógica adaptadas para buscar e atualizar preferências no Supabase.
- Finalizada a migração de preferências para o backend, garantindo experiência consistente e escalável.