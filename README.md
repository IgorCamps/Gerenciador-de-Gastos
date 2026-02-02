# 💰 Gerenciador de Gastos

Um aplicativo web simples e intuitivo para controlar e gerenciar suas despesas pessoais. Com interface amigável, você pode adicionar, visualizar, editar e deletar gastos, além de filtrar por categoria e período.

---

## 📋 Sobre o Projeto

O **Gerenciador de Gastos** é uma aplicação full-stack que permite:
- ✅ Adicionar novos gastos com descrição, valor, categoria e data
- ✅ Visualizar todos os gastos em tempo real
- ✅ Filtrar gastos por categoria e ano
- ✅ Editar gastos existentes
- ✅ Deletar gastos desnecessários
- ✅ API RESTful para gerenciamento de dados

---

## 🏗️ Estrutura do Projeto

```
gerenciador-gastos/
│
├── backend/                          # Servidor Node.js/Express
│   └── src/
│       ├── index.js                 # Arquivo principal do servidor
│       ├── routes/
│       │   └── gastos.routes.js     # Rotas da API de gastos
│       ├── services/
│       │   └── gastos.service.js    # Lógica de negócio
│       └── data/
│           └── gastos.json          # Armazenamento de dados
│
├── frontend/                         # Interface do usuário
│   ├── index.html                   # Estrutura HTML
│   ├── style.css                    # Estilos CSS
│   └── script.js                    # Lógica do cliente
│
├── package.json                      # Dependências do projeto
└── README.md                         # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para requisições cross-origin
- **UUID** - Geração de IDs únicos

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização
- **JavaScript (Vanilla)** - Interatividade

### Dados
- **JSON** - Armazenamento local de gastos

---

## 📦 Requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- Um navegador web moderno

---

## 🚀 Instalação e Configuração

### 1. Clone ou baixe o projeto
```bash
cd gerenciador-gastos
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor backend
```bash
node backend/src/index.js
```
O servidor iniciará na porta **3000** por padrão. Você pode alterar a porta definindo a variável de ambiente `PORT`:
```bash
PORT=5000 node backend/src/index.js
```

### 4. Abra o frontend
- Abra o arquivo `frontend/index.html` em seu navegador, ou
- Use um servidor local como Live Server para melhor experiência

---

## 📡 API REST

### Endpoints Disponíveis

#### **GET /gastos**
Retorna a lista de todos os gastos.
```bash
curl http://localhost:3000/gastos
```
**Resposta:**
```json
[
  {
    "id": "uuid-1234",
    "descricao": "Compra no mercado",
    "valor": 150.50,
    "categoria": "Mercado",
    "data": "2026-02-01"
  }
]
```

#### **POST /gastos**
Adiciona um novo gasto.
```bash
curl -X POST http://localhost:3000/gastos \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Aluguel",
    "valor": 1200.00,
    "categoria": "Aluguel",
    "data": "2026-02-01"
  }'
```
**Campos obrigatórios:** `descricao`, `valor`, `categoria`, `data`

**Resposta (201 Created):**
```json
{
  "id": "uuid-gerado",
  "descricao": "Aluguel",
  "valor": 1200.00,
  "categoria": "Aluguel",
  "data": "2026-02-01"
}
```

#### **PUT /gastos/:id**
Atualiza um gasto existente.
```bash
curl -X PUT http://localhost:3000/gastos/uuid-1234 \
  -H "Content-Type: application/json" \
  -d '{
    "valor": 160.00,
    "categoria": "Mercado"
  }'
```

#### **DELETE /gastos/:id**
Deleta um gasto.
```bash
curl -X DELETE http://localhost:3000/gastos/uuid-1234
```
**Resposta:** `204 No Content`

---

## 📝 Categorias Disponíveis

- 🏦 Banco
- 🛒 Mercado
- 💼 Finanças
- 🏠 Aluguel
- 🎮 Laser
- 📦 Outro

---

## 🎨 Recursos da Interface

### Formulário de Entrada
- **Descrição**: Nome do gasto
- **Valor**: Quantia em reais (com 2 casas decimais)
- **Categoria**: Dropdown com categorias predefinidas
- **Data**: Selecionador de data

### Filtros
- **Por Categoria**: Visualize gastos de uma categoria específica
- **Por Ano**: Filtre gastos por ano

---

## 🔄 Fluxo de Dados

```
Frontend (index.html) 
    ↓
JavaScript (script.js) - requisições AJAX/Fetch
    ↓
Backend API (express)
    ↓
Routes (gastos.routes.js) - roteamento
    ↓
Services (gastos.service.js) - lógica
    ↓
Data Storage (gastos.json) - persistência
```

---

## 🐛 Tratamento de Erros

O servidor valida todos os dados recebidos:
- **Campos obrigatórios**: Todos os campos são necessários para criar um gasto
- **Status 400**: Requisição inválida
- **Status 404**: Recurso não encontrado
- **Status 204**: Deleção bem-sucedida

---

## 📈 Possíveis Melhorias Futuras

- [ ] Autenticação de usuários
- [ ] Banco de dados (MongoDB, PostgreSQL)
- [ ] Relatórios e gráficos estatísticos
- [ ] Exportar gastos em CSV/PDF
- [ ] Temas escuro/claro
- [ ] Sincronização com cloud
- [ ] Aplicativo mobile
- [ ] Notificações de gastos recorrentes

---

## 📄 Licença

Este projeto está licenciado sob a licença ISC.

---

## 👨‍💻 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com sugestões e melhorias.

---

## 📞 Suporte

Para dúvidas ou problemas, entre em contato ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ para ajudar no controle de suas finanças**