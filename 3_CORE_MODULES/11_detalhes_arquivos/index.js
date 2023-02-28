const fs = require('fs');

fs.stat('arquivo.txt', (err,data) =>{
    if(err){
        console.log(err);
        return;
    } else {
        console.log(data);
        console.log(data.isFile());
        console.log(data.isDirectory());
        console.log(data.isSymbolicLink());
        console.log(data.ctime);
        console.log(data.size);
        return;
    }
});