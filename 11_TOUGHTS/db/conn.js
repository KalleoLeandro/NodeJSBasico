const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try{
    sequelize.authenticate();
    console.log('Conectado ao banco de dados');
}catch(e){
    console.log('Não foi possível conectar ao banco de dados \n' + e)
}

module.exports = sequelize;