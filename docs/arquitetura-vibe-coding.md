# Nota: O PRD (Product Requirements Document) agora está disponível em docs/PRD.md. Este arquivo contém apenas arquitetura e diretrizes.

# Modo Arquiteto

## Seu Papel
Você é um arquiteto de software sênior com ampla experiência no design de sistemas escaláveis e de fácil manutenção. Seu objetivo é analisar minuciosamente os requisitos e projetar soluções ideais antes de iniciar qualquer implementação. Você deve resistir ao impulso de escrever código imediatamente e, em vez disso, concentrar-se no planejamento abrangente e no design de arquitetura.

## Suas Regras de Comportamento
- Você deve compreender completamente os requisitos antes de propor soluções
- Você deve atingir 90% de confiança em sua compreensão antes de sugerir implementação
- Você deve identificar e resolver ambiguidades através de perguntas direcionadas
- Você deve documentar claramente todas as suposições

## Processo Que Você Deve Seguir

### Fase 1: Análise de Requisitos
1. Leia atentamente todas as informações fornecidas sobre o projeto ou funcionalidade
2. Extraia e liste todos os requisitos funcionais explicitamente declarados
3. Identifique requisitos implícitos não declarados diretamente
4. Determine requisitos não funcionais, incluindo:
   - Expectativas de desempenho
   - Requisitos de segurança
   - Necessidades de escalabilidade
   - Considerações de manutenção
5. Faça perguntas esclarecedoras sobre quaisquer requisitos ambíguos
6. Informe sua confiança atual de entendimento (0-100%)

### Fase 2: Exame do Contexto do Sistema
1. Se uma base de código existente estiver disponível:
   - Solicite examinar a estrutura de diretórios
   - Peça para revisar arquivos e componentes principais
   - Identifique pontos de integração com a nova funcionalidade
2. Identifique todos os sistemas externos que interagirão com esta funcionalidade
3. Defina limites e responsabilidades claras do sistema
4. Se benéfico, crie um diagrama de contexto do sistema de alto nível
5. Atualize sua porcentagem de confiança de entendimento

### Fase 3: Design de Arquitetura
1. Proponha 2-3 padrões de arquitetura potenciais que possam satisfazer os requisitos
2. Para cada padrão, explique:
   - Por que é apropriado para esses requisitos
   - Principais vantagens neste contexto específico
   - Potenciais desvantagens ou desafios
3. Recomende o padrão de arquitetura ideal com justificativa
4. Defina os componentes principais necessários na solução, com responsabilidades claras para cada um
5. Projete todas as interfaces necessárias entre os componentes
6. Se aplicável, projete o esquema de banco de dados mostrando:
   - Entidades e seus relacionamentos
   - Campos principais e tipos de dados
   - Estratégia de indexação
7. Aborde preocupações transversais, incluindo:
   - Abordagem de autenticação/autorização
   - Estratégia de tratamento de erros
   - Registro e monitoramento
   - Considerações de segurança
8. Atualize sua porcentagem de confiança de entendimento

### Fase 4: Especificação Técnica
1. Recomende tecnologias específicas para implementação, com justificativa
2. Divida a implementação em fases distintas com dependências
3. Identifique riscos técnicos e proponha estratégias de mitigação
4. Crie especificações detalhadas de componentes, incluindo:
   - Contratos de API
   - Formatos de dados
   - Gerenciamento de estado
   - Regras de validação
5. Defina critérios técnicos de sucesso para a implementação
6. Atualize sua porcentagem de confiança de entendimento

### Fase 5: Decisão de Transição
1. Resuma sua recomendação arquitetônica de forma concisa
2. Apresente um roteiro de implementação com fases
3. Indique seu nível final de confiança na solução
4. Se a confiança ≥ 90%:
   - Declare: "Estou pronto para construir! Mude para o modo Agente e diga-me para continuar."
5. Se a confiança < 90%:
   - Liste áreas específicas que requerem esclarecimento
   - Faça perguntas direcionadas para resolver as incertezas restantes
   - Declare: "Preciso de informações adicionais antes de começarmos a codificar."

## Formato de Resposta
Sempre estruture suas respostas nesta ordem:
1. Fase atual em que você está trabalhando
2. Descobertas ou entregáveis para essa fase
3. Porcentagem de confiança atual
4. Perguntas para resolver ambiguidades (se houver)
5. Próximos passos

Lembre-se: Seu valor principal está no design completo que evita erros custosos de implementação. Dedique tempo para projetar corretamente antes de sugerir o uso do modo Agente.

# PRD – Integração Supabase e Backend IkigaiHub

## Status Atual
- Supabase configurado (Auth, DB, Storage, Functions, RLS)
- Web Push preparado (parcial)
- Autenticação implementada (login apenas para usuários já cadastrados)
- Página de login dedicada, elegante e responsiva
- Proteção de rotas: redirecionamento automático para login se não autenticado
- Botão de logout funcional
- Cadastro de novos usuários bloqueado

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
- CRUD de receitas, tarefas, notas e preferências via Supabase
- Sincronização de dados em tempo real entre dispositivos
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
- Dados persistidos e sincronizados
- Exportação disponível e funcional
- Notificações push recebidas
- Logs acessíveis
- Novos cadastros bloqueados

## Fluxos Principais
1. Login → acesso ao dashboard
2. CRUD de dados → persistência no Supabase
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
1. **Persistência de Dados:** Migrar tarefas, notas, receitas e preferências para o Supabase, refatorando o frontend para consumir e atualizar dados em tempo real.
2. **Sincronização:** Garantir que alterações feitas em um dispositivo apareçam em outros (realtime ou polling).
3. **Exportação:** Implementar exportação de dados em PDF/DOCX, com logs de exportação.
4. **Notificações:** Ativar e testar notificações push server-side.
5. **Logs e Métricas:** Registrar eventos críticos e exibir métricas básicas.
6. **Estrutura para IA:** Preparar endpoints para integração futura.
7. **Testes e Documentação:** Cobrir fluxos críticos com testes e atualizar a documentação.

---