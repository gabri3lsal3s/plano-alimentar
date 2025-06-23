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
- Receitas e preferências ainda a migrar

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
- CRUD de receitas e preferências via Supabase (com integridade relacional)
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
- Receitas e preferências migradas para Supabase
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
1. **Migrar receitas e preferências para Supabase, garantindo integridade relacional e UI integrada.**
2. (Opcional) Implementar sincronização em tempo real para tarefas, notas, receitas e preferências.
3. Implementar exportação de dados em PDF/DOCX, com logs de exportação.
4. Ativar e testar notificações push server-side.
5. Registrar eventos críticos e exibir métricas básicas.
6. Preparar endpoints para integração futura com IA.
7. Cobrir fluxos críticos com testes e atualizar a documentação.

## Atualização 2024-06-XX
- Preferências de receitas agora são sincronizadas via Supabase, não mais localStorage.
- Usuário pode marcar/desmarcar uma receita preferida por seção, e a preferência é mantida entre dispositivos.
- Removido botão de popular receitas de exemplo (apenas para dev, não faz parte do produto final).
- Critérios de aceite e fluxos atualizados para refletir a persistência no backend.

--- 