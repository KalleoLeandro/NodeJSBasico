//Módulos Externos
const inquirer = require('inquirer');

const chalk = require('chalk');

//Módulos Internos

const fs = require('fs');

operation();

function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Sacar', 'Sair']
        },        
    ]).then((answer) =>{
        const action = answer['action']
        console.log(action);
        switch(action){
            case 'Criar conta':
                createAccount();
                break;
            case 'Depositar':
                deposit();
                break;
            case 'Consultar saldo':
                getAccountBalance();
                break;
            case 'Sacar':
                withdraw();
                break;
            case 'Sair':
                console.log(chalk.bgBlue.black('Obrigado por usar o Accounts'));
                process.exit();
                break;
        }
    }).catch(err =>{console.log(err)});
}

//Criar conta

function createAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'));
    buildAccount();
}

function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite o nome do titular da conta:'
        },
    ])
    .then((answer) =>{
        const nome = answer['accountName'];
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts');
        }
        if(fs.existsSync(`accounts/${nome}.json`)){
            console.log(chalk.bgRed.black('Está conta já existe, informe outro titular'));
            buildAccount();
            return;
        } else {
            fs.writeFileSync(`accounts/${nome}.json`, '{"balance":0}', function(err){
                console.log(err);
            });    
            console.log(chalk.green('Parabéns, sua conta foi criada!'));
            operation();
        }        
    })
    .catch(err =>{console.log(err)});
}

//Depósito

function deposit(){
    inquirer.prompt([
        {
            name: 'accountName',
            messagem: 'Qual o nome da sua conta?'
        }
    ])
    .then((answer) =>{
        const nome = answer['accountName'];
        //Verificar se a conta existe
        if(!checkAccount(nome)){            
            deposit();
            return;
        } else {
            inquirer.prompt([
                {
                    name: 'amount',
                    messagem: 'Quanto deseja depositar?'
                }
            ])
            .then((answer)=>{
                const amount = answer['amount'];
                //Adicionando saldo
                addAccount(nome, amount);
                operation();
            })
            .catch(err =>{console.log(err)});
        }
    })
    .catch(err =>{console.log(err)});
}

function checkAccount(nome){
    if(!fs.existsSync(`accounts/${nome}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe!'));
        return false;
    }
    return true;        
}

function addAccount(accountName, amount){
    const account = getAccount(accountName);
    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'));
        return deposit();
    }

    account.balance = parseFloat(amount) + parseFloat(account.balance);
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), function(err){
        console.log(err);
    });
    console.log(chalk.green(`Foi inserido ${amount} em sua conta!`));
    operation();
}

function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    });
    return JSON.parse(accountJSON);

}

//Consultar saldo
function getAccountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            messagme: 'Qual o titular da conta?'
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName'];

        //Verificar se a conta existe
        if(!checkAccount(accountName)){
            return getAccountBalance();
        }

        const accountData = getAccount(accountName);
        console.log(chalk.bgBlue.blue(`O saldo da conta é de ${accountData.balance}`));
        operation();
    })
    .catch(err =>{console.log(err)});
}

function withdraw(){
    inquirer.prompt([
        {
            name: 'accountName',
            messagme: 'Qual o titular da conta?'
        }
    ])
    .then((answer)=>{
        const accountName = answer['accountName'];

        //Verificar se a conta existe
        if(!checkAccount(accountName)){
            return withdraw();
        }

        inquirer.prompt([
            {
                name: 'amount',
                messagem: 'Quanto deseja sacar?'
            }
        ])
        .then((answer)=>{
            const amount = answer['amount'];
            //Adicionando saldo
            withdrawAccount(accountName, amount);            
        })
        .catch(err =>{console.log(err)});
    })
    .catch(err =>{console.log(err)});
}

function withdrawAccount(accountName, amount){
    const accountData = getAccount(accountName);

    if(!amount){
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'));
        return operation();
    }

    if(accountData.balance < amount){
        console.log(chalk.bgRed.black('O valor solicitado é menor que o disponível'));
        return operation();      
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){
        console.log(err);
    })

    console.log(chalk.green(`Foi realizado o saque de ${amount} de sua conta`));
    operation();
}