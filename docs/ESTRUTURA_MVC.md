# Estrutura MVC - IkigaiHub

## Visão Geral

O projeto IkigaiHub foi reestruturado seguindo o padrão Model-View-Controller (MVC) para melhorar a organização, manutenibilidade e escalabilidade do código.

## Estrutura de Diretórios

```
plano_alimentar/
├── models/                 # Camada de dados
│   └── ReceitaModel.js
├── controllers/            # Camada de lógica de negócio
│   └── ReceitaController.js
├── views/                  # Camada de apresentação
│   ├── components/         # Componentes reutilizáveis
│   │   └── ReceitaCard.js
│   └── pages/             # Páginas específicas
│       └── ReceitasPage.js
├── services/              # Serviços externos
│   └── SupabaseService.js
├── utils/                 # Utilitários e constantes
│   ├── constants.js
│   └── helpers.js
├── app.js                 # Aplicação principal
└── [arquivos existentes]  # Mantidos para compatibilidade
```

## Arquitetura MVC

### Model (Modelo)
- **Responsabilidade**: Acesso a dados e validação
- **Localização**: `models/`
- **Exemplo**: `ReceitaModel.js`

**Características:**
- Gerencia operações CRUD no banco de dados
- Valida dados antes de persistir
- Formata dados para exibição
- Isolado de lógica de negócio

### Controller (Controlador)
- **Responsabilidade**: Lógica de negócio e orquestração
- **Localização**: `controllers/`
- **Exemplo**: `ReceitaController.js`

**Características:**
- Coordena interação entre Model e View
- Implementa regras de negócio
- Gerencia estado da aplicação
- Trata erros e validações

### View (Visão)
- **Responsabilidade**: Apresentação e interação com usuário
- **Localização**: `views/`
- **Exemplo**: `ReceitasPage.js`, `ReceitaCard.js`

**Características:**
- Renderiza dados na interface
- Captura eventos do usuário
- Gerencia estado visual
- Componentes reutilizáveis

## Serviços

### SupabaseService
- **Responsabilidade**: Gerenciar conexão e operações com Supabase
- **Localização**: `services/SupabaseService.js`
- **Características:**
  - Singleton para conexão única
  - Métodos genéricos para CRUD
  - Tratamento de erros centralizado
  - Autenticação integrada

## Utilitários

### Constants
- **Responsabilidade**: Centralizar configurações e constantes
- **Localização**: `utils/constants.js`
- **Inclui:**
  - Configurações do Supabase
  - Horários de refeições
  - Mensagens padrão
  - Classes CSS

### Helpers
- **Responsabilidade**: Funções utilitárias reutilizáveis
- **Localização**: `utils/helpers.js`
- **Inclui:**
  - Manipulação de DOM
  - Formatação de dados
  - Funções de performance (debounce, throttle)
  - Validações comuns

## Fluxo de Dados

```
1. Usuário interage com View (ReceitaCard)
2. View dispara evento customizado
3. Controller (ReceitasPage) captura evento
4. Controller chama Model (ReceitaModel)
5. Model executa operação no Service (SupabaseService)
6. Service retorna dados para Model
7. Model formata e retorna para Controller
8. Controller atualiza View
```

## Benefícios da Nova Estrutura

### Manutenibilidade
- **Separação de responsabilidades**: Cada camada tem função específica
- **Código organizado**: Fácil localização de funcionalidades
- **Redução de duplicação**: Componentes reutilizáveis

### Escalabilidade
- **Módulos independentes**: Novos recursos não afetam existentes
- **Arquitetura extensível**: Fácil adição de novos modelos/controllers
- **Performance otimizada**: Carregamento sob demanda

### Testabilidade
- **Unidades isoladas**: Cada componente pode ser testado independentemente
- **Dependências claras**: Fácil mock de serviços externos
- **Comportamento previsível**: Fluxo de dados bem definido

## Migração Gradual

### Fase 1: Estrutura Base ✅
- [x] Criar estrutura de diretórios
- [x] Implementar utilitários base
- [x] Criar SupabaseService
- [x] Implementar ReceitaModel e ReceitaController
- [x] Criar componentes de view

### Fase 2: Integração
- [ ] Migrar funcionalidades existentes para MVC
- [ ] Implementar modelos para Tarefas e Notas
- [ ] Criar controllers para todas as funcionalidades
- [ ] Refatorar views existentes

### Fase 3: Otimização
- [ ] Implementar sistema de cache
- [ ] Adicionar lazy loading
- [ ] Otimizar performance
- [ ] Implementar testes unitários

## Compatibilidade

### Arquivos Mantidos
- `script.js` - Mantido para funcionalidades não migradas
- `supabase*.js` - Módulos existentes mantidos
- `style.css` - Estilos existentes preservados

### Fallbacks
- Sistema de fallback implementado no `index.html`
- Funcionalidades antigas continuam funcionando
- Migração gradual sem quebrar funcionalidades

## Próximos Passos

1. **Testar nova estrutura**: Verificar se todas as funcionalidades estão funcionando
2. **Migrar Tarefas e Notas**: Implementar modelos e controllers para essas funcionalidades
3. **Refatorar CSS**: Modularizar estilos seguindo a estrutura MVC
4. **Implementar testes**: Adicionar testes unitários para cada camada
5. **Otimizar performance**: Implementar cache e lazy loading

## Exemplo de Uso

```javascript
// Inicializar aplicação
import App from './app.js';
const app = new App();

// Usar controller diretamente
import ReceitaController from './controllers/ReceitaController.js';
const controller = new ReceitaController();
const receitas = await controller.carregarReceitas();

// Usar componente de view
import ReceitaCard from './views/components/ReceitaCard.js';
const card = new ReceitaCard();
const elemento = card.render(receita, index, secao);
```

## Considerações Técnicas

### Módulos ES6
- Uso de `import/export` para modularização
- Suporte a navegadores modernos
- Fallback para navegadores antigos

### Eventos Customizados
- Comunicação entre componentes via eventos
- Desacoplamento entre camadas
- Fácil debugging e extensão

### Tratamento de Erros
- Erros centralizados em cada camada
- Mensagens de erro amigáveis
- Logs detalhados para debugging

### Performance
- Debounce e throttle para otimização
- Lazy loading de componentes
- Cache de dados frequentes 