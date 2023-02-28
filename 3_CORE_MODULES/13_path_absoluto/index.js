const path = require('path');

//path absoluto

console.log(path.resolve('arquivo.txt'));

//formar path

const midFolder = 'relatorios';

const fileName = 'Kalleo.txt';

const finalPath = path.join("/", 'arquivos', midFolder, fileName);

console.log(finalPath);