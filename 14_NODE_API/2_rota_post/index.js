const express = require('express');
const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

//rotas -endpoints

app.get('/', (req,res)=>{
    res.json({message: 'Primeira rota criada com sucesso!'})    
});

app.post('/createproduct', (req,res)=>{
    const name = req.body.name;
    const price = req.body.price;

    console.log(`${name}  - R$ ${price}`);
    res.status(200);
    res.end();
})


app.listen(3000);