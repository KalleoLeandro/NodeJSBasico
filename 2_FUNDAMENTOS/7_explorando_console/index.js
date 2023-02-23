const x = 10;

const y = 'Texto qualquer';

const z = [1,2];

console.log(x,y,z);

//contagem de impressões

console.count(`O valor de x é ${10}, contagem`);
console.count(`O valor de x é ${10}, contagem`);
console.count(`O valor de x é ${10}, contagem`);
console.count(`O valor de x é ${10}, contagem`);

//variavel entre strings, funciona como no C e C++

console.log("%s", y);

//limpar o console

setTimeout(() => {
    console.clear();
}, 2000);