# IkigaiHub

IkigaiHub é um Progressive Web App (PWA) para planejamento alimentar, rotina de exercícios e organização pessoal, com foco em privacidade, experiência moderna e integração com backend Supabase.

## Documentação Principal
- [PRD – Documento de Requisitos do Produto](docs/PRD.md)
- [Roadmap de Desenvolvimento](docs/ROADMAP.md)
- [Arquitetura e Diretrizes](docs/arquitetura-vibe-coding.md)
- [Regras de Qualidade e Boas Práticas](docs/regras-vibe-coding.md)

## Status Atual
- Autenticação Supabase implementada (apenas login de usuários já cadastrados)
- Proteção de rotas e fluxo seguro
- Backend Supabase configurado (Auth, DB, Storage, Functions, RLS)
- Página de login dedicada
- Cadastro de novos usuários bloqueado
- Próxima etapa: persistência de dados (tarefas, notas, receitas, preferências) via Supabase

## Como usar
1. Faça login com um usuário já cadastrado.
2. Utilize as funcionalidades de planejamento alimentar, tarefas e exercícios.
3. O sistema protege automaticamente o acesso e sincroniza dados entre dispositivos (em breve).

## Contribuição
- Consulte o [PRD](docs/PRD.md) para requisitos e próximos passos.
- Siga as [regras de qualidade](docs/regras-vibe-coding.md) e [diretrizes de arquitetura](docs/arquitetura-vibe-coding.md).
- Sugestões e melhorias são bem-vindas!

--- 