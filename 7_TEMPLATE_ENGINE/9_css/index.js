const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/post', (req,res) =>{
    const post = {
        title: 'Node.js',
        category: 'Javascript',
        body: 'Artigo de Node.js',
        comments: 4
    }
    res.render('blogspot', {post});
})

app.get('/dashboard', (req,res) =>{
    const items = ['Item a', 'Item b', 'Item c']
    res.render('dashboard', {items});
})

app.get('/blog', (req,res)=>{
    const posts = [
        {
            title: 'Node.js',
            category: 'Javascript',
            body: 'Artigo de Node.js',
            comments: 4
        },
        {
            title: 'JSP',
            category: 'Java',
            body: 'Artigo de Java',
            comments: 5
        },
        {
            title: 'C',
            category: 'C++',
            body: 'Artigo de C',
            comments: 2
        },
    ]
    res.render('blog', {posts})

})

app.get('/', (req,res)=>{
    const auth = true    
    res.render('home', {auth});
})



app.listen(3000, ()=>{
    console.log('Servidor rodando na porta 3000');
})