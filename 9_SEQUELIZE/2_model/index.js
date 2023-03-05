const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const User = require('./models/User');
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

app.get('/', (req,res)=>{
    res.render('home');
})

conn.sync().then(()=>{
    app.listen(port);    
}).catch((err)=>{
    console.log(err);
})
