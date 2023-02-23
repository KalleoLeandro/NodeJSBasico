const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readLine.question("Qual é a sua linguagem favorita? ", (language) =>{
    console.log(`A minha linguagem preferida é ${language}`)
    readLine.close();
})