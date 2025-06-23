# PRD – Integração Supabase e Backend IkigaiHub

## Status Atual
- Supabase configurado (Auth, DB, Storage, Functions, RLS)
- Web Push preparado (parcial)
- Autenticação implementada (login apenas para usuários já cadastrados)
- Página de login dedicada, elegante e responsiva
- Proteção de rotas: redirecionamento automático para login se não autenticado
- Botão de logout funcional
- Cadastro de novos usuários bloqueado
- **Tarefas e notas migradas e integradas ao Supabase (CRUD completo, UI moderna, feedback visual, tratamento de erros)**
- **Preferências de receitas migradas e sincronizadas via Supabase**
- **Receitas: leitura/exibição já integrada ao Supabase, criação/edição/remoção pendente na UI**

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
- **CRUD completo de receitas via Supabase (criação, edição, remoção na UI)**
- Sincronização de dados em tempo real entre dispositivos (opcional)
- Exportação de dados em PDF e DOCX (frontend e/ou Supabase Functions)
- Notificações push server-side
- Logs e métricas de uso
- Interface web responsiva e acessível
- Testes automatizados dos fluxos críticos

## Requisitos Não Funcionais
- Segurança de dados (auth, policies, HTTPS, CORS restrito)
- Performance (carregamento rápido, cache PWA, sync eficiente)
- Manutenibilidade (código modular, testável, documentado)
- Escalabilidade (infra Supabase)
- Privacidade (dados não compartilhados)

## Critérios de Aceite
- Login/logout funcionando e seguro
- Dados de tarefas e notas persistidos e sincronizados
- **Receitas com CRUD completo via Supabase**
- Preferências de receitas sincronizadas
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
1. **Implementar formulários e botões na UI para criar, editar e remover receitas, integrando com as funções Supabase já existentes.**
2. (Opcional) Implementar sincronização em tempo real para tarefas, notas, receitas e preferências.
3. Implementar exportação de dados em PDF/DOCX, com logs de exportação.
4. Ativar e testar notificações push server-side.
5. Registrar eventos críticos e exibir métricas básicas.
6. Preparar endpoints para integração futura com IA.
7. Cobrir fluxos críticos com testes e atualizar a documentação.

## Atualização 2024-12-19
- **Análise completa da persistência de dados realizada**
- **Mapeamento do fluxo atual de receitas identificado**: leitura/exibição já integrada ao Supabase, backend pronto para CRUD completo
- **Identificação de pontos de refatoração**: UI precisa de formulários e botões para criação, edição e remoção de receitas
- **Preferências de receitas sincronizadas via Supabase**
- **Tarefas e notas com CRUD completo e integrado**
- Critérios de aceite e fluxos atualizados para refletir o progresso atual.

--- 