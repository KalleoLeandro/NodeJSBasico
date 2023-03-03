const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req,res)=>{
    const user = {
        name: "Kalleo",
        surname: "Leandro dos Santos Leal"
    }
    res.render('home', {user: user});
})

app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
})