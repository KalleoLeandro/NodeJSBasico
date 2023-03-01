//Módulos Externos
const inquirer = require('inquirer');

const chalk = require('chalk');

//Módulos Internos

const fs = require('fs');

//Sequencia de inicialização

iniciaBiblioteca();
bibliotecario();




//Funções
function bibliotecario(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: ['Cadastrar Usuario', 'Cadastrar Livro', 'Consultar Usuario', 'Consultar Livro','Empréstimo', 'Devolução', 'Sair']
        },        
    ]).then((answer) =>{
        const action = answer['action']
        console.log(action);
        switch(action){
            case 'Cadastrar Usuario':
                cadastrarUsuario();               
                break;
            case 'Cadastrar Livro':
                cadastrarLivro();
                break;
            case 'Consultar Usuario':
                consultarUsuario();
                break;
            case 'Consultar Livro':
                consultarLivro();
                break;
            case 'Empréstimo':  
                emprestimo();              
                break;        
            case 'Devolução':
                devolucao();
                break;
            case 'Sair':
                console.log(chalk.bgBlue.black('Obrigado por usar nossa biblioteca'));
                process.exit();                
        }
    }).catch(err =>{console.log(err)});
}

//Iniciando Biblioteca
function iniciaBiblioteca(){
    if(!fs.existsSync('usuarios')){
        fs.mkdirSync('usuarios');
    }
    if(!fs.existsSync('biblioteca')){
        fs.mkdirSync('biblioteca');
    }    
}

//Funções de CRUD

function cadastrarUsuario(){
    inquirer.prompt([
        {
            name: 'userName',
            message: 'Digite o nome do usuário:'
        },
    ])
    .then((answer) =>{
        const nome = answer['userName'];        
        if(checkFile('usuarios', nome)){
            console.log(chalk.bgRed.black('Este usuário já existe'));
            cadastrarUsuario();
            return;
        } else {
            fs.writeFileSync(`usuarios/${nome}.json`, `{"nome": "${nome}", "livros": []}`, function(err){
                console.log(err);
            });    
            console.log(chalk.green('Parabéns, este usuário foi criado com sucesso!'));            
        }
    })
    .catch(err =>{console.log(err)});
}

function cadastrarLivro(){
    inquirer.prompt([
        {
            name: 'bookName',
            message: 'Digite o nome do livro:'
        },
    ])
    .then((answer) =>{
        const nome = answer['bookName'];        
        if(checkFile('biblioteca', nome)){
            console.log(chalk.bgRed.black('Este livro já existe'));                        
        } else {
            fs.writeFileSync(`biblioteca/${nome}.json`, `{"nome" : "${nome}", "emprestado" : false}`, function(err){
                console.log(err);
            });    
            console.log(chalk.green('Parabéns, este livro foi criado com sucesso!'));                        
        }
        return bibliotecario();
    })
    .catch(err =>{console.log(err)});
}



function consultarUsuario(){
    inquirer.prompt([
        {
            name: 'userName',
            message: 'Qual o nome do usuario?'
        }
    ])
    .then((answer)=>{
        const userName = answer['userName'];

        //Verificar se a conta existe
        if(!checkFile('usuarios',userName)){
            console.log('Usuario não existe')            
        } else {
            const userData = getUserData(userName);
            console.log(chalk.bgBlue.blue(`O usuario ${userName} tem  ${userData.livros.length} livros emprestados`));
        }        
        return bibliotecario();
    })
    .catch(err =>{console.log(err)});
}

function consultarLivro(){
    inquirer.prompt([
        {
            name: 'bookName',
            message: 'Qual o nome do livro?'
        }
    ])
    .then((answer)=>{
        const bookName = answer['bookName'];

        //Verificar se a conta existe
        if(!checkFile('biblioteca',bookName)){
            console.log('Livro não existe')
            return bibliotecario();
        }

        const bookData = getBookData(bookName);
        if(bookData.emprestado){
            console.log(chalk.bgRed.black(`O livro ${bookName} encontra-se emprestado`));
        } else {
            console.log(chalk.bgBlue.white(`O livro ${bookName} encontra-se disponível`));
        }        
        return bibliotecario();
    })
    .catch(err =>{console.log(err)});
}

function emprestimo(){
    inquirer.prompt([
        {
            name: 'userName',
            message: 'Qual o nome do usuario?'
        }
    ])
    .then((answer)=>{
        const userName = answer['userName'];

        //Verificar se a conta existe
        if(!checkFile('usuarios',userName)){
            console.log('Usuario não existe')
            return bibliotecario();
        }

        inquirer.prompt([
            {
                name: 'bookName',
                message: 'Qual o nome do livro?'
            }
        ])
        .then((answer)=>{
            const bookName = answer['bookName'];
    
            //Verificar se a conta existe
            if(!checkFile('biblioteca',bookName)){
                console.log('Livro não existe')
                return bibliotecario();
            }

            gravarEmprestimo(userName, bookName);            
            console.log(chalk.bgBlue.black('Emprestimo efetuado com sucesso!'));
            return bibliotecario();
        })
        .catch(err =>{console.log(err)});

    })
    .catch(err =>{console.log(err)});
}

function gravarEmprestimo(userName, bookName){
    let userData = getUserData(userName);
    let bookData = getBookData(bookName);
    
    userData.livros.push(bookData.nome);
    bookData.emprestado = !bookData.emprestado;

    fs.writeFileSync(`usuarios/${userName}.json`, JSON.stringify(userData), function(err){
        console.log(err);
    })

    fs.writeFileSync(`biblioteca/${bookName}.json`, JSON.stringify(bookData), function(err){
        console.log(err);
    })
}

function devolucao(){
    inquirer.prompt([
        {
            name: 'userName',
            message: 'Qual o nome do usuario?'
        }
    ])
    .then((answer)=>{
        const userName = answer['userName'];

        //Verificar se a conta existe
        if(!checkFile('usuarios',userName)){
            console.log('Usuario não existe')            
        } else {
            gravarDevolucao(userName);
            console.log(chalk.bgGreen.black('Devolução Efetuada com sucesso!'));
        }        
        return bibliotecario();
    })
    .catch(err =>{console.log(err)});
}

function gravarDevolucao(userName){
    let userData = getUserData(userName);
    userData.livros.forEach(element => {
        let bookData = getBookData(element);        
        bookData.emprestado = !bookData.emprestado;        
        fs.writeFileSync(`biblioteca/${bookData.nome}.json`, JSON.stringify(bookData), function(err){
            console.log(err);
        });        
       console.log(bookData.nome);
    });
    userData.livros = [];
    fs.writeFileSync(`usuarios/${userData.nome}.json`, JSON.stringify(userData), function(err){
        console.log(err);
    });    
}

function getUserData(userName){
    const userJSON = fs.readFileSync(`usuarios/${userName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    });
    return JSON.parse(userJSON);
}

function getBookData(bookName){
    const bookJSON = fs.readFileSync(`biblioteca/${bookName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    });
    return JSON.parse(bookJSON);
}

function checkFile(path, file){
    if(!fs.existsSync(`${path}/${file}.json`)){        
        return false;
    }
    return true;        
}