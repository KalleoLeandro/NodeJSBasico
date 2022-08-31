//Impressão de mais de um valor

const x = 10;
const y = 'Algum texto';
const z = [1,2];

console.log(x,y,z);
//Contagem de impressões

console.count(`O valor de x é: ${x}, contagem`);
console.count(`O valor de x é: ${x}, contagem`);
console.count(`O valor de x é: ${x}, contagem`);
console.count(`O valor de x é: ${x}, contagem`);

//Variavel entre string

console.log("%s",y);

//limpar o console

setTimeout(()=>{
    console.clear();
},2000);