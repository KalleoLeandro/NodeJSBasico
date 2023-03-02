const express = require('express');

const app = express();

const port = 3000;

const path = require('path');

const basePath = path.join(__dirname, 'templates');

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json());


app.get('/users/add', (req,res)=>{
    res.sendFile(`${basePath}/userForm.html`);
})

app.get('/users/:id', (req,res)=>{
    const id = req.params.id;    

    console.log(`Estamos buscando pelo usuário ${id}`);


    res.sendFile(`${basePath}/users.html`);
})

app.post('/users/save', (req,res) =>{
    console.log(req.body);

    const nome = req.body.nome;
    const idade = req.body.idade;
    console.log(`O nome do usuário é ${nome} e ele tem ${idade} anos`);

})


app.get('/', (req,res)=>{
    res.sendFile(`${basePath}/index.html`);
})


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});