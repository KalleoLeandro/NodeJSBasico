const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const port = 3000;

const app = express();

app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

app.post('/books/insertbook', (req,res)=>{
    const title = req.body.title;
    const pageQty = req.body.pageqty;

    const sql = `insert into books(title, pageQty) values('${title}', '${pageQty}')`;

    conn.query(sql, (err)=>{
        if(err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    });
})

app.get('/books', (req,res)=>{
    const sql = 'select * from books';

    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err);
        } else{
            const books = data;
            console.log(books);
            res.render('books', {books});
        }
    });
})

app.get('/', (req,res)=>{
    res.render('home');
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

conn.connect((err)=>{
    if(err){
        console.log(err);
    } else {
        console.log('Conectou ao MYSQL!');
        app.listen(3000);
    }   
})