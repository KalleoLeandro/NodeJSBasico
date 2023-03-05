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
            return;
        } else{
            res.redirect('/');
        }
    });
})

app.get('/book/:id', (req,res)=>{
    const id = req.params.id;

    const sql = `select * from books where id = ${id }`

    conn.query(sql, (err, data)=>{
        if(err){
            console.log(err);
            return;
        } else{
            const book = data[0];
            console.log(book);
            res.render('book', {book});
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

app.get('/books/edit/:id', (req,res)=>{
    const id = req.params.id;

    const sql = `select * from books where id = ${id}`;

    conn.query(sql, (err,data)=>{
        if(err){
            console.log(err);
        } else{
            const book = data[0];
            console.log(book);
            res.render('editbook', {book});
        }
    });
})

app.post('/books/updatebook', (req,res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `update books set title = '${title}', pageQty = ${pageqty} where id = ${id}`;
    console.log(sql);

    conn.query(sql, (err)=>{
        if(err){
            console.log(err);
        } else{    
            res.redirect('/books');
        }
    })
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