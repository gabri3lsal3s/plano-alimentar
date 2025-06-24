# Estrutura MVC - IkigaiHub

## Visão Geral

O projeto IkigaiHub concluiu a migração para o padrão Model-View-Controller (MVC) para todas as entidades principais (tarefas, notas, receitas, preferências), com CSS modularizado, código legado removido e testes automatizados implementados.

## Estrutura de Diretórios

```
plano_alimentar/
├── models/                 # Camada de dados
│   ├── NotaModel.js
│   ├── PreferenciaModel.js
│   ├── ReceitaModel.js
│   └── TarefaModel.js
├── controllers/            # Camada de lógica de negócio
│   ├── NotaController.js
│   ├── PreferenciaController.js
│   ├── ReceitaController.js
│   └── TarefaController.js
├── views/                  # Camada de apresentação
│   ├── components/         # Componentes reutilizáveis
│   │   ├── NotaCard.js
│   │   ├── ReceitaCard.js
│   │   └── TarefaCard.js
│   └── pages/              # Páginas específicas
│       ├── NotasPage.js
│       ├── PlanoAlimentarPage.js
│       ├── ReceitasPage.js
│       ├── TarefasPage.js
│       └── PreferenciasPage.js
├── services/               # Serviços externos
│   └── SupabaseService.js
├── utils/                  # Utilitários e constantes
│   ├── constants.js
│   └── helpers.js
├── styles/                 # Estilos modulares por página/componente
│   ├── ReceitasPage.css
│   ├── ReceitaCard.css
│   ├── NotasPage.css
│   ├── NotaCard.css
│   ├── TarefasPage.css
│   ├── TarefaCard.css
│   ├── PlanoAlimentarPage.css
│   └── PreferenciasPage.css
├── style.css               # Estilos globais e resets
├── app.js                  # Aplicação principal
├── [outros arquivos]
```

## Modularização do CSS
- Cada página e componente principal possui seu próprio arquivo CSS em `styles/`.
- O arquivo `style.css` contém apenas resets, utilitários e estilos globais compartilhados.
- Os arquivos HTML importam os CSS modulares correspondentes à sua página/componente.

## Progresso da Migração
- Estrutura de diretórios padronizada e implementada.
- Funcionalidade de receitas, notas, tarefas, preferências e plano alimentar migradas para MVC e com CSS modularizado.
- Arquivos legados removidos.
- Testes automatizados implementados (unitários e integração).
- Documentação e exemplos de uso atualizados.

## Fluxo de Dados (MVC)
```
1. Usuário interage com View (ex: ReceitaCard)
2. View dispara evento customizado
3. Controller (ex: ReceitasPage) captura evento
4. Controller chama Model (ex: ReceitaModel)
5. Model executa operação no Service (SupabaseService)
6. Service retorna dados para Model
7. Model formata e retorna para Controller
8. Controller atualiza View
```

## Próximos Passos
1. **Expandir testes de integração** para tarefas, notas e preferências.
2. **Configurar Integração Contínua (CI)** para rodar testes automaticamente a cada push/PR.
3. **Migrar exercícios para MVC**: criar model, controller, view/page e CSS modular.
4. **Tornar plano_alimentar.html dinâmico**: refatorar para consumir dados via controllers/models.
5. **Otimizações finais**: performance, tratamento de erros/logs, documentação.

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

---

Para dúvidas ou sugestões sobre a estrutura de estilos, consulte este documento ou os arquivos de exemplo em `styles/`. 