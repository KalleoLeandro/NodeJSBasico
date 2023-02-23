const inquirer = require('inquirer');

const chalk = require('chalk');

inquirer.prompt([
    {
        name: 'nome', 
        message: 'Qual é o seu nome? '
    },
    {
        name: 'idade',
        message: 'Qual a sua idade? '
    }
]).then((answers) =>{
    
    console.log(chalk.bgYellow.black(`O seu nome é ${answers.nome} e sua idade é ${answers.idade}`));

    
}

).catch((err) =>{
    console.log('Erro')
})