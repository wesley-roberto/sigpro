# SIGPRO - Sistema Integrado de Gestão de Projetos

Sistema web completo para cadastro, gerenciamento, acompanhamento, análise e controle de projetos desenvolvidos por concessionárias e analisados por empresas especializadas.

## Tecnologias Utilizadas

### Frontend
- React 18 + TypeScript
- Vite (bundler)
- Tailwind CSS (estilização)
- ShadCN UI (componentes)
- React Router (navegação)
- Recharts (gráficos)
- Axios (requisições HTTP)

### Backend
- Node.js
- Express.js
- JWT (autenticação)
- Google Sheets API (integracão com planilhas)

## Estrutura do Projeto

```
sigpro/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── services/       # Serviços de API
│   ├── types/          # Definições de tipos TypeScript
│   ├── hooks/          # Hooks customizados
│   ├── utils/          # Funções utilitárias
│   └── context/        # Contextos React
├── backend/
│   ├── src/
│   │   ├── controllers/ # Controladores de rota
│   │   ├── middleware/  # Middlewares (autenticação, etc.)
│   │   ├── routes/      # Definição de rotas
│   │   └── services/    # Serviços (Google Sheets, etc.)
│   └── .env             # Variáveis de ambiente
└── package.json         # Dependências e scripts
```

## Funcionalidades Implementadas

✅ Autenticação completa com JWT
✅ Tela de login com validação
✅ Estrutura de navegação (header fixo + sidebar recolhível)
✅ Dashboard executivo com KPIs e gráficos interativos
✅ Telas de cadastro para projetos, concessionárias e empresas
✅ Integração com Google Sheets API (mocked para desenvolvimento)
✅ Design responsivo para desktop, tablet e smartphone
✅ Sistema de permissões baseado em papéis
✅ Controle de projetos com workflow de status
✅ Cálculo automático de cronogramas e prazos
✅ Indicadores de desempenho (KPIs)
✅ Filtros globais por concessionária, empresa, produto, status e período

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Google Cloud Platform (para integração real com Google Sheets)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone [URL_DO_REPOSITORIO]
cd sigpro
```

2. **Instale as dependências do frontend**
```bash
cd sigpro
npm install
```

3. **Instale as dependências do backend**
```bash
cd backend
npm install
```

4. **Configure as variáveis de ambiente**
   - Copie o arquivo `.env.example` para `.env` no frontend e no backend
   - Preencha as variáveis necessárias:
     - `VITE_API_URL` (frontend) - URL do backend (padrão: http://localhost:3001)
     - `PORT` (backend) - Porta do servidor (padrão: 3001)
     - `JWT_SECRET` (backend) - Chave secreta para assinatura do JWT
     - Variáveis do Google Sheets (backend) - ID da planilha e caminho para credenciais

5. **Inicie o backend**
```bash
cd backend
npm run dev
```

6. **Inicie o frontend**
```bash
cd sigpro
npm run dev
```

7. **Acesse a aplicação**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Integração com Google Sheets

O sistema está preparado para integrar com Google Sheets através da API oficial. Para usar a integração real:

1. Crie um projeto no Google Cloud Console
2. Ative a Google Sheets API
3. Crie credenciais de serviço (Service Account)
4. Compartilhe sua planilha com o email da service account
5. Cole o ID da planilha e o caminho para o arquivo de credenciais no arquivo `.env` do backend

### Abas necessárias na planilha:
- USERS
- CONCESSIONARIAS
- EMPRESAS
- PRODUTOS
- PROJETOS
- CRONOGRAMA
- DASHBOARD

## Estrutura de Dados

### Usuários (USERS)
| USER | EMAIL | SENHA |
|------|-------|-------|

### Concessionárias (CONCESSIONARIAS)
| NOME | DATA_ASSINATURA | DESCRICAO |
|------|-----------------|-----------|

### Empresas (EMPRESAS)
| NOME | DESCRICAO |
|------|-----------|

### Produtos (PRODUTOS)
| NOME | DESCRICAO | TIPO | PRAZO_DIAS |
|------|-----------|------|------------|

### Projetos (PROJETOS)
| ID | CONCESSIONARIA_ID | PRODUTO_ID | EMPRESA_ID | DATA_ASSINATURA | DATA_CONTRATUAL | DATA_ENTREGA | STATUS | OBSERVACOES | RESPONSAVEL_ID |
|----|-------------------|------------|------------|-----------------|-----------------|--------------|--------|-------------|----------------|

## Licença

Este projeto está licenciado sob a licença MIT.

## Contato

Para dúvidas ou sugestões, por favor abra uma issue neste repositório.