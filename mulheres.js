const express = require('express');
const router = express.Router();

const app = express();
const porta = 3333;
const mulheres = [
    {
        nome:'Raquel',
        Imagem: '',
        minibio: '',
    },
    {
        nome:'Simara',
        Imagem: '',
        minibio: '',
    },
    {
        nome:'Progamaria',
        Imagem: '',
        minibio: 'Programa para mulheres na tecnologia',
    }
]
function mostraMulheres (request, response){
    response.json(mulheres);
}

function mostraPorta() {
    console.log('servidor criado e rodando na porta ', porta);
}

app.use(router.get('/mulheres', mostraMulheres));
app.listen(porta, mostraPorta);