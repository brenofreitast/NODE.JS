//  PASSO 1: Criar um servidor http nativo, apenas com o node, sem biblioteca esterna.

/* import { createServer } from 'node:http'  node:http -> modulo para criar server http 
                                             node:fs -> modulo para manipulacao de arquivo (criar, ler etc..) File System 
                                             node:crypto -> modulo para criptografia
                                             - {createServer} é a função.
                                            

 
    Para inicializar o server, ir no terminal e digitar = node server.js.
    Para restartar o server altomaticamente após uma modificaçao = node --watch server.js

    Para fazer o mesmo usando script = ir em package.json, em scripts, criar "dev": "node --watch server.js",
    entao no terminal, npm run dev.
 


 const server = createServer((req, res) => {
     res.write('Ola')

     return res.end()
 })

    server.listen(3000)
 */


// PASSO 2: Instalar o micro-framework fastify, para criar um servidor http com o fastify.

// No terminal = npm install fastify


    import { title } from "node:process";
    import {DatabaseMemory} from "./database-memory.js"
    import { fastify } from "fastify";


    const server = fastify()
    const database = new DatabaseMemory()

    // .get = pegar, acessar. ( EX= server.get('localhost:3000/hello') )

    server.get('/videos', () => {
        const videos = database.list()
        return videos
    })


// PASSO 3: Gerenciar o CRUD (Create, Read, Update e Delete)
// POST, GET, PUT, DELETE.

// Para atualizar (.put), precisamos de um id, para atualizarmos apenas o video selecionado e nao todos por exemplo.
// Para isso ultilizamos o Route Parameter. EX= server.put('videos/:3') => :3 é o id do video selecionado.

    server.post('/videos', (req, res) => {              // .post = Criar
        
        const {title, description, duration} = req.body
        database.create({                       // Cria dentro de database.
            title: title,
            description: description,
            duration: duration,
        })

        return res.status(201).send()
    })

    server.put('/videos/:id', (req, res) => {                    // .put = Atualizar
        const videoId = req.params.id                            // req.params.id => params é o que vem depois do ':'.
        const { title, description, duration} = req.body
        

        database.update(videoId, {  
            title: title,
            description: description,
            duration: duration
        })

        return res.status(204).send()
        
    })

    server.delete('/videos/:id', () => {  // .delete = Deletar
        
    })

    server.listen({
        port: 3000,
    })


// PASSO 4: Criar um banco de dados na memoria do programa.
// Criar um arquivo, EX= database-memory.js, exportar o que for criado lá
// e importar para o server.js.


// PASSO 4: Criar as rotas, para interagir com o banco de dados.
// Criar o banco de dados em server.js= const database = new DatabaseMemory()
// Adicionar o que vai ser criado no banco de dados, em database.create.
// Ultilizar a extensao REST para testar as rotas post, put e delete.
// Criar um arquivo .http EX= routes.http
// Em routes.http = adicionar o metodo para request(requisicao), post,put ou delete, e o endereco de rota.
// Adicionar um return em server.post, para saber o status do request, se deu certo ou errado.
// return res.status(201).send  => status 201 = algo foi criado.
// Problema: sem server.post, criamos videos sempre com o mesmo titulo, descricao e duracao.
// Em routes.http, criar um objeto com dados em formato json.
// Informar o content-type(tipo de conteudo) a ser enviado = application/json.
// Em server.post, pegar o tittle, descrption e duration enviados no body.
// Criar a rota para mostrar os videos criados, em server.get, const videos = database.list()
// Em server.get, return videos

// Rota server.put = Atualizaremos oos videos, baseando nos id.
// Portanto, params de server.put recebe (req, res).
// const videoId = req.params.id
// const { title, description, duration} = req.body
// database.update(videoId, {tittle: tittle, description: description etc...})
// return res.status(204).send() - status(204) => Sucesso porém nao contém conteúdo.
// Em routes.http adicionar o metodo PUT.
// Problema, o metodo PUT em routes precisa saber o id do video a ser atualizado.
