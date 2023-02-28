const fs = require('fs');

if(!fs.existsSync('./minhapasta')){
    console.log('A pasta em questão não existe');
    fs.mkdirSync('./minhapasta');
} 



if(fs.existsSync('./minhapasta')){
    console.log('A pasta em questão existe');
} 