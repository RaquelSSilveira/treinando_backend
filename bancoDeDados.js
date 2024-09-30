const mongoose = require('mongoose');
require('dotenv').config();

async function conectaBancodeDados(){
    try{
        console.log('Conexão com o Banco de Dados Iniciou');
    
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Conexão com o Banco de Dados feita com sucesso');
        
    }
    catch(erro){
        console.log(erro);
    }
}
module.exports = conectaBancodeDados