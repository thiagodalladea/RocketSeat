import http from 'http';

// Rotas: meios de entrada para nosso servidor
// - Criar/Editar/Remover/Listar usuários

// HTTP
// - Método HTTP
// - URL

// GET, POST, PUT, PATCH, DELETE

// GET    -> Buscar uma informação no back-end
// POST   -> Criar um recurso no back-end
// PUT    -> Editar ou atualizar um recurso no back-end (uma entidade, vários campos)
// PATCH  -> Atualizar uma informação única ou específica do back-end
// DELETE -> Deletar uma recurso/informação no back-end

// Stateful -> "não utiliza banco de dados"
// Stateless -> "utiliza banco de dados"

// Cabeçalhos (requisição/resposta) -> metadados 

const users = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;
    console.log(method, url);

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader("Content-type", "application/json ")
            .end(`Listagem de usuários da aplicação\n${JSON.stringify(users)}`);
    }
    
    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: "Thiago",
            email: "thiago@exemplo.com",
        });
        return res.end('Criação de usuários da aplicação');
    }

    return res.end('Hello World!');
})

server.listen(3333);