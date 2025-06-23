# IkigaiHub

IkigaiHub é um Progressive Web App (PWA) para planejamento alimentar, rotina de exercícios e organização pessoal, com foco em privacidade, experiência moderna e integração com backend Supabase.

## Documentação Principal
- [PRD – Documento de Requisitos do Produto](docs/PRD.md)
- [Roadmap de Desenvolvimento](docs/ROADMAP.md)
- [Arquitetura e Diretrizes](docs/arquitetura-vibe-coding.md)
- [Regras de Qualidade e Boas Práticas](docs/regras-vibe-coding.md)

## Status Atual
- **Autenticação Supabase implementada** (apenas login de usuários já cadastrados)
- **Proteção de rotas e fluxo seguro**
- **Backend Supabase configurado** (Auth, DB, Storage, Functions, RLS)
- **Página de login dedicada e responsiva**
- **Cadastro de novos usuários bloqueado**
- **Tarefas e notas com CRUD completo via Supabase**
- **Preferências de receitas sincronizadas via Supabase**
- **Receitas: leitura/exibição integrada ao Supabase**
- **Análise completa da persistência de dados realizada**

## Funcionalidades Implementadas
- ✅ **Autenticação segura** com Supabase
- ✅ **CRUD completo de tarefas** com UI moderna
- ✅ **CRUD completo de notas** com feedback visual
- ✅ **Sistema de preferências de receitas** sincronizado
- ✅ **Leitura e exibição de receitas** via Supabase
- ✅ **Interface responsiva** e PWA funcional
- ✅ **Tratamento de erros** e loading states

## Próximas Funcionalidades
- 🔄 **Formulários para criar, editar e remover receitas** (backend pronto)
- 🔄 **Exportação de dados** em PDF e DOCX
- 🔄 **Notificações push server-side**
- 🔄 **Logs e métricas** de uso
- 🔄 **Sincronização em tempo real** entre dispositivos

## Como usar
1. Faça login com um usuário já cadastrado
2. Utilize as funcionalidades de planejamento alimentar, tarefas e notas
3. Marque suas receitas preferidas por refeição
4. O sistema protege automaticamente o acesso e sincroniza dados entre dispositivos

## Tecnologias
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Functions)
- **Deploy**: Vercel
- **PWA**: Service Worker, Manifest, Cache API

## Contribuição
- Consulte o [PRD](docs/PRD.md) para requisitos e próximos passos
- Siga as [regras de qualidade](docs/regras-vibe-coding.md) e [diretrizes de arquitetura](docs/arquitetura-vibe-coding.md)
- Sugestões e melhorias são bem-vindas!

--- 