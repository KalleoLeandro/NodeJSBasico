const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

const produtos = [
    {        
        title: "PS5",
        img: "/img/ps5.jpg",
        price: "5000,00",
        description: "Video game de nutella"
    },
    {
        title: "XBOX",
        img: "/img/xbox.png",
        price: "3000,00",
        description: "Video game de nutella"
    },
    {
        title: "SNES",
        img: "/img/snes.jpg",
        price: "300,00",
        description: "Video game de raiz"
    },
    {
        title: "ATARI",
        img: "/img/atari.png",
        price: "200,00",
        description: "Video game de raiz"
    },
]

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/lista', (req,res) =>{
   
    res.render('lista', {produtos});
})

app.get('/produto/:id', (req,res)=>{
    const id = req.params.id;
    const produto  = produtos[id];
    res.render('produto', {produto});
})

app.get('/', (req,res)=>{
    const auth = true    
    res.render('home', {auth});
})



app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
})