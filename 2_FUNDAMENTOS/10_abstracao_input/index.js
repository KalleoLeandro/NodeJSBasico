const inquirer = require('inquirer');

inquirer.prompt([
    {
        name: 'p1', 
        message: 'Qual a primeira nota? '
    },
    {
        name: 'p2',
        message: 'Qual a segunda nota? '
    }
]).then((answers) =>{
    let soma = 0;
    
    const media = ((parseInt(answers.p1) + parseInt(answers.p2)));

    console.log(media / 2);
}

).catch((err) =>{
    console.log('Erro')
})

