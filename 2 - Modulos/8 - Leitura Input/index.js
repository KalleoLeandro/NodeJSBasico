const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question("Qual a sua linguage preferida? ", (language) =>{
    if(language == 'Java'){
        console.log('Melhor linguagem!')
    }
    console.log(`A minha linguagem preferida é: ${language}`)
    readline.close();
})