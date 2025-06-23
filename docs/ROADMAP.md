# Consulte o [PRD – Documento de Requisitos do Produto](docs/PRD.md) para requisitos detalhados, status atual e próximos passos.

## Fase 9: Integração com Supabase e Backend
*Data: xx/xx/2024*

### Objetivos:
- Integração do frontend com Supabase (auth, banco, storage, funções)
- Persistência de dados de receitas, tarefas, notas e preferências no banco
- Implementação de autenticação segura (login, cadastro, logout)
- Exportação de dados em PDF e DOCX (frontend e/ou Supabase Functions)
- Notificações push server-side via Supabase
- Logs e métricas de uso no Supabase
- Estrutura para integração futura com IA

#### Entregas:
- Frontend consumindo APIs do Supabase
- Tabelas e policies configuradas no Supabase
- Funções serverless para exportação e notificações
- Sistema de logs e métricas básico
- Documentação de endpoints e fluxos

#### Tecnologias:
- Supabase (Auth, Postgres, Storage, Functions, Web Push)
- Vercel (deploy frontend)
- jsPDF/docx.js (exportação frontend)

#### Critérios de sucesso:
- Dados persistidos e sincronizados entre dispositivos
- Login/logout funcionando
- Exportação de dados disponível
- Notificações push recebidas no PWA
- Logs acessíveis para auditoria

# Plano Incremental – Integração Supabase e Backend IkigaiHub

## Etapas

1. **Preparação e Configuração**
   - [x] Criar projeto no Supabase (Auth, DB, Storage, Functions)
   - [x] Definir tabelas: usuários, receitas, tarefas, notas, preferências, logs
   - [x] Configurar policies de segurança (Row Level Security)
   - [x] Configurar Web Push no Supabase (parcial, ambiente preparado)

2. **Integração de Autenticação**
   - [x] Implementar login via Supabase Auth no frontend
   - [x] Garantir fluxo seguro e feedback visual
   - [x] Criar página de login dedicada, elegante e responsiva
   - [x] Proteger rotas: redirecionamento automático para login se não autenticado
   - [x] Remover possibilidade de novos cadastros (apenas login de usuários já existentes)
   - [x] Botão de logout funcional e acessível

3. **Persistência de Dados**
   - [ ] Refatorar frontend para consumir APIs do Supabase para receitas, tarefas, notas e preferências
   - [ ] Sincronizar dados entre dispositivos
   - [ ] Implementar tratamento de erros e loading states

4. **Exportação de Dados**
   - [ ] Implementar exportação de dados em PDF e DOCX (primeiro no frontend, depois via Supabase Functions se necessário)
   - [ ] Adicionar logs de exportação

5. **Notificações Push Server-side**
   - [ ] Implementar envio e recebimento de notificações push via Supabase Functions
   - [ ] Adicionar logs de notificações

6. **Logs e Métricas**
   - [ ] Criar sistema de logs no Supabase para login/logout, exportações, notificações e erros críticos
   - [ ] Exibir métricas básicas no dashboard (opcional)

7. **Estrutura para Integração com IA**
   - [ ] Preparar endpoints e funções serverless para integração futura com IA (Perplexity ou outra)

8. **Testes e Documentação**
   - [ ] Escrever testes unitários e de integração
   - [ ] Atualizar documentação técnica e de uso

---

## Observações
- O sistema está seguro: apenas usuários já cadastrados podem acessar.
- O fluxo de autenticação está robusto, com proteção de rotas e feedback visual.
- O ambiente Supabase está pronto para persistência, notificações e logs.

## Próximos Passos Sugeridos
1. Persistência de dados: migrar tarefas, notas, receitas e preferências para o Supabase, refatorando o frontend para consumir e atualizar dados em tempo real.
2. Sincronização: garantir que alterações feitas em um dispositivo apareçam em outros (realtime ou polling).
3. Exportação: implementar exportação de dados em PDF/DOCX, com logs de exportação.
4. Notificações: ativar e testar notificações push server-side.
5. Logs e métricas: registrar eventos críticos e exibir métricas básicas.
6. Estrutura para IA: preparar endpoints para integração futura.
7. Testes e documentação: cobrir fluxos críticos com testes e atualizar a documentação.

### [2024-06-XX] Sincronização de Preferências via Supabase
- Preferências de receitas agora são persistidas e sincronizadas no backend (Supabase).
- Usuário pode marcar/desmarcar uma receita preferida por seção, e a preferência é mantida entre dispositivos.
- Removido botão de popular receitas de exemplo (apenas para dev, não faz parte do produto final).

--- 