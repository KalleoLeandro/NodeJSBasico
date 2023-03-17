const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodemvc2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try{
    sequelize.authenticate();
    console.log('Conectado ao banco de dados');
}catch(e){
    console.log(`Não foi possível conectar ao banco de dados: ${e}`);
}

module.exports = sequelize;