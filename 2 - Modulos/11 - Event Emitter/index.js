const EventEmitter = require('events');

const emissor = new EventEmitter();
emissor.on('start',()=>{
    console.log('Durante')
});

console.log('Antes');

emissor.emit('start');

console.log('Depois');