# IkigaiHub - Seu Hub de Saúde e Bem-estar

## 📊 Status do Projeto

### ✅ **Implementado e Funcionando**
- **Sistema MVC completo** para tarefas e notas
- **Autenticação Supabase** com proteção de rotas
- **CRUD completo** de tarefas e notas
- **Páginas especializadas** (tarefas.html, notas.html)
- **Dashboard na home** com navegação atualizada
- **Integração Supabase** com persistência de dados
- **Tratamento de erros** robusto

### 🔄 **Em Desenvolvimento**
- **Receitas**: Backend MVC pronto, UI em migração
- **Preferências**: Sistema híbrido sendo consolidado
- **Exercícios**: Migração para MVC planejada

### 📈 **Progresso Geral: 60%**

---

## 🚀 Como Executar

### Pré-requisitos
- Navegador moderno com suporte a ES6 modules
- Conta no Supabase (configuração já realizada)

### Instalação
1. Clone o repositório
2. Abra `index.html` no navegador
3. Faça login com suas credenciais

### Estrutura do Projeto
```
plano_alimentar/
├── models/          # Camada de dados
├── controllers/     # Lógica de negócio
├── views/          # Interface do usuário
├── services/       # Serviços externos
├── utils/          # Utilitários
└── docs/           # Documentação
```

---

## 📋 Funcionalidades

### ✅ **Tarefas**
- Criar, editar, excluir tarefas
- Marcar como concluída
- Filtros por status
- Persistência no Supabase

### ✅ **Notas**
- Criar, editar, excluir notas
- Busca por conteúdo
- Organização por data
- Persistência no Supabase

### 🔄 **Receitas**
- Visualização de receitas
- Sistema de preferências
- Backend MVC implementado
- UI em migração

### 🔄 **Exercícios**
- Visualização de treinos
- Sistema estático atual
- Migração para MVC planejada

---

## 🏗️ Arquitetura

### **Padrão MVC**
- **Models**: Acesso a dados e validação
- **Controllers**: Lógica de negócio
- **Views**: Interface e interação

### **Tecnologias**
- **Frontend**: JavaScript ES6, HTML5, CSS3
- **Backend**: Supabase (Auth, Postgres, Storage)
- **PWA**: Service Worker, Manifest
- **Arquitetura**: MVC modular

---

## 📚 Documentação

- **[PRD](docs/PRD.md)**: Requisitos do produto
- **[Roadmap](docs/ROADMAP.md)**: Plano de desenvolvimento
- **[Estrutura MVC](docs/ESTRUTURA_MVC.md)**: Arquitetura do sistema
- **[Análise Metódica](docs/ANÁLISE_METÓDICA_MVC.md)**: Status detalhado da migração
- **[Próximos Passos](docs/PRÓXIMOS_PASSOS.md)**: Plano de ação prioritário

---

## 🎯 Próximos Passos

### **Fase 1: Consolidação (1-2 semanas)**
1. Ativar sistema MVC de receitas
2. Consolidar preferências
3. Limpar arquivos antigos

### **Fase 2: Completar Migração (2-3 semanas)**
1. Migrar exercícios
2. Migrar plano alimentar
3. Finalizar home/dashboard

### **Fase 3: Otimização (1-2 semanas)**
1. Modularizar CSS
2. Implementar testes
3. Otimizar performance

---

## 🧪 Testes Automatizados

O projeto utiliza **Jest** com suporte a ES6/ESModules para garantir a qualidade do código.

### Como rodar os testes

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute todos os testes:
   ```bash
   npx jest --env=node
   ```
3. Para rodar um teste específico:
   ```bash
   npx jest tests/NOME_DO_ARQUIVO.test.js --env=node
   ```

### Boas práticas
- Sempre escreva testes para novos models, controllers e helpers.
- Use mocks para isolar dependências externas (ex: Supabase).
- Teste casos de sucesso, erro e edge cases.
- Para helpers que dependem de DOM, use ambiente `jsdom` ou condicione o teste.

---

## 🤝 Contribuição

### **Desenvolvimento**
- Siga o padrão MVC estabelecido
- Mantenha compatibilidade com funcionalidades existentes
- Documente mudanças significativas

### **Testes**
- Teste em diferentes navegadores
- Verifique responsividade
- Valide integração com Supabase

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação em `docs/`
2. Verifique os logs do console
3. Teste a conectividade com Supabase

---

## 📄 Licença

Projeto pessoal para desenvolvimento de habilidades full-stack.

---

*Última atualização: Dezembro 2024* 