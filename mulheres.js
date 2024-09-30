const express = require('express'); // ESTOU INICIANDO O EXPRESS
const router = express.Router(); // AQUI ESTOU CONFIGURANDO A PRIMEIRA PARTE DA ROTA 
const cors = require('cors'); // AQUI ESTOU ESTOU TRAZENDO O PACOTE CORS QUE PERMITE CONSUMIR ESSA API DO FRONT END
const conectaBancodeDados = require('./bancoDeDados'); //LIGANDO AO ARQUIVO O BANCO DE DADOS 
conectaBancodeDados()// CHAMANDO A FUNÇÃO QUE CONECTA O BANCO DE DADOS

const Mulher = require('./mulherModel');

const app = express();//INICIANDO APP
app.use(express.json());
app.use(cors());
const porta = 3333; //CRIANDO A PORTA


//GET
async function mostraMulheres (request, response){
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find();

        response.json (mulheresVindasDoBancoDeDados)

    }catch(erro){
        console.log(erro);

    }
}
//POST
async function criaMulheres(request,response){
    const novaMulher = new Mulher({
        
        nome:request.body.nome,
        imagem:request.body.imagem,
        minibio:request.body.minibio,
        citacao:request.body.citacao,
    })
    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);
    }catch(erro){
        console.log(erro);
    }
}
//PATCH
async function corrigeMulher(request,response){
    try{
        const mulherEncontrada = await Mulher.findById(request.params.id);
        if (request.body.nome){
            mulherEncontrada.nome = request.body.nome;
        }
        if (request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio;
        }
        if (request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem;
        }
        if (request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao;
        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
        response.json(mulherAtualizadaNoBancoDeDados);
    }catch(erro){
        console.log(erro);
    }
}
//DELETE
async function deletaMulher(request,response){
    try{
        await Mulher.findByIdAndDelete(request.params.id);
        response.json({message: 'Mulher deletada com sucesso!'})
    }catch(erro){
        console.log(erro);
    }
}
//PORTA
function mostraPorta() {
    console.log('servidor criado e rodando na porta ', porta);
}

app.use(router.get('/mulheres', mostraMulheres));//CONFIGURADA A ROTA GET / MULHERES
app.use(router.post('/mulheres', criaMulheres));//CONFIGURADA A ROTA POST / MULHERES
app.use(router.patch('/mulheres/:id', corrigeMulher)); //CONFIGURADA A ROTA PATCH / MULHERES/ID
app.use(router.delete('/mulheres/:id',deletaMulher)); //CONFIGURADA A ROTA DELETE / MULHERES/ID
app.listen(porta, mostraPorta);//SERVIDOR OUVINDO A PORTA