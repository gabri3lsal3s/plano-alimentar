# PRD – Integração Supabase e Backend IkigaiHub

## Status Atual
- Supabase configurado (Auth, DB, Storage, Functions, RLS)
- Web Push preparado (parcial)
- Autenticação implementada (login apenas para usuários já cadastrados)
- Página de login dedicada, elegante e responsiva
- Proteção de rotas: redirecionamento automático para login se não autenticado
- Botão de logout funcional
- Cadastro de novos usuários bloqueado
- **Tarefas, notas, receitas e preferências migradas e integradas ao Supabase (CRUD completo, UI moderna, feedback visual, tratamento de erros, testes automatizados)**
- **Receitas e preferências: CRUD completo via Supabase, UI nova ativa, integração total, cobertura de testes**

## Visão Geral
O objetivo desta fase é transformar o IkigaiHub em um PWA com backend robusto, usando Supabase para autenticação, persistência, notificações server-side e exportação de dados, mantendo deploy simples na Vercel.

## Objetivos de Negócio
- Garantir persistência real dos dados do usuário (receitas, tarefas, notas, preferências)
- Permitir acesso seguro e privado (single-user, apenas usuários já cadastrados)
- Sincronizar dados entre dispositivos
- Oferecer exportação de dados em PDF e DOCX
- Enviar notificações push server-side
- Preparar para integração futura com IA

## Requisitos Funcionais (próximos passos)
- **Migrar exercícios para MVC**
- Tornar plano_alimentar.html dinâmico
- Remover arquivos antigos (supabase*.js, script.js)
- Modularizar CSS
- Implementar testes automatizados
- Otimizar performance

## Requisitos Não Funcionais
- Segurança de dados (auth, policies, HTTPS, CORS restrito)
- Performance (carregamento rápido, cache PWA, sync eficiente)
- Manutenibilidade (código modular, testável, documentado)
- Escalabilidade (infra Supabase)
- Privacidade (dados não compartilhados)

## Critérios de Aceite
- Login/logout funcionando e seguro
- Dados de tarefas, notas, receitas e preferências persistidos e sincronizados
- **Receitas e preferências com CRUD completo via Supabase, UI nova e testes automatizados**
- Exportação disponível e funcional
- Notificações push recebidas
- Logs acessíveis
- Novos cadastros bloqueados

## Fluxos Principais
1. Login → acesso ao dashboard
2. CRUD de dados (tarefas, notas, receitas, preferências) → persistência no Supabase
3. Exportação → download de PDF/DOCX
4. Notificações → recebimento no PWA

## Métricas e Logs
- Log de login/logout
- Log de exportações
- Log de notificações
- Log de erros críticos
- Métricas de uso (tarefas, receitas, notas)

## Restrições
- Single-user, sem compartilhamento
- Sem i18n nesta fase
- Deploy apenas na Vercel
- Cadastro de novos usuários bloqueado

## Futuro
- Integração com IA (Perplexity ou outra)
- Novos tipos de exportação
- Dashboard de métricas avançado

## Próximos Passos Detalhados
1. **Migrar exercícios para MVC**
2. Tornar plano_alimentar.html dinâmico
3. Implementar testes de integração e CI
4. Modularizar CSS (concluído)
5. Otimizar performance

## Atualização 2024-12-19
- **Análise completa da persistência de dados realizada**
- **Mapeamento do fluxo atual de receitas identificado**: leitura/exibição já integrada ao Supabase, backend pronto para CRUD completo
- **Identificação de pontos de refatoração**: UI precisa de formulários e botões para criação, edição e remoção de receitas
- **Preferências de receitas sincronizadas via Supabase**
- **Tarefas e notas com CRUD completo e integrado**
- Critérios de aceite e fluxos atualizados para refletir o progresso atual.

--- 