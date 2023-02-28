const fs = require('fs');

fs.rename('arquivo.txt', 'arquivo2.txt', function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Arquivo renomeado');
    }
});