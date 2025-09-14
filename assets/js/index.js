const novaMatriz = document.querySelector('#matrix');
const novoDesafio = document.querySelector('#gerarNovoDesafio')
const imprimeRes = document.querySelector('#respostaResult')
const respostaCalc = document.querySelector('#txtResposta')
const chkResposta = document.querySelector('#checkResp')
const testerResp = document.querySelector(".testerResp")
const dicaSpan = document.querySelector('.dica')
const pontosSpan = document.querySelector('#pontosGame')

// Copyright 2025 Igor Eliseo.

var pontosGame = 0

var currentAwenser = ''

var shakeInput = () => {
    respostaCalc.classList.add('shake');
    respostaCalc.style.border = '1px solid #ff0000';
    respostaCalc.style.boxShadow = 'inset 0 3px 0 #fff1f0';
    setTimeout(() => {
        respostaCalc.classList.remove('shake');
    },500);
}

chkResposta.style.display = 'none';
respostaCalc.style.display = 'none';
novaMatriz.style.display = 'none';
// dicaSpan.innerHTML = '<span>Você se acha bom em Matemática?</span>';
// dicaSpan.innerHTML += 'Clique no botão gerar Novo para começar.'
imprimeRes.innerHTML = ''

const mat = [
            '(2+2)*3',
            '14-2',
            '20*4',
            '12/2',
            '6-4',
            '10+2',
            '(8-1)*5',
            '10/5',
            '((10+5)*3)/2',
            '((8+2)**2)-(50/5)',
            '(20/4)+(3*7)',
            '(8+2)*3',
            '3**6',
            '50-25',
            '((25%7)*3)+1',
            '(7+3)*(5-2)',
            '144/12',
            '(5+3)**2',
            '((10-2)*4)+6',
            '(50%7)+(9*3)',
            '(50-20)/(2+3)',
            '(10*2)+(30/3)',
            '((5*5)-(2*2))/3',
            '(1+2+3+4+5)'
            ];
const seleciona=(calculo)=> {
    return calculo[Math.floor(Math.random() * calculo.length)];
}

const embaralha=(string) => {
    const arr = string.split('');
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr;
}

var testarIgualdades=(stringOriginal, desafio, maxTentativas = 1000) => {

    let Estring = stringOriginal
    let tentativas = 0;

    while(Estring === desafio && tentativas < maxTentativas){
        Estring = embaralha(desafio);
        tentativas++;
    }

    return Estring;

}

const checarInput=() => {

     if(respostaCalc.value.length === 0){
        //alert("Ops!!! Parece que caixa de resposta está vazia.");
        shakeInput();
    }else if(currentAwenser === respostaCalc.value){
        confetti({
            particleCount: 1200,
            spread: 900,
            origin:  { y: 0.6 },
            scalar: 2
        })
        //alert("Parabéns!!! você acertou o calculo na ordem certa!!");
        pontosGame++;
        pontosSpan.innerHTML = `Pontos: <span class="numPontos">${pontosGame}</span>`;
        gerarMatriz();
        respostaCalc.style.border = '1px solid #ddd';
        respostaCalc.style.boxShadow = 'inset 0 3px 0 #f8f8f9';
        respostaCalc.value = '';
    }else{
        //alert("Ops!!! Parece que você digitou a resolução errada.");
        shakeInput();
    }

}

respostaCalc.addEventListener('keydown', (e)=> {
    if(e.key === 'Enter'){
        checarInput();
    }
})

const gerarMatriz=() => {

    respostaCalc.style.display = 'block';
    respostaCalc.style.border = '1px solid #ddd';
    respostaCalc.style.boxShadow = 'inset 0 3px 0 #f8f8f9';

    novaMatriz.innerHTML = ''

    //dicaSpan.innerHTML = 'Clique nos botões abaixo e faça o calculo que gerou o resultado.'

    dicaSpan.innerHTML = 'Digite abaixo a expressão na ordem correta.';

    novaMatriz.style.display = 'block';
    novaMatriz.style.marginLeft = 'auto';
    novaMatriz.style.marginRight = 'auto';
    chkResposta.style.display = 'block';

    let desafio = seleciona(mat);
    const arrayMat = desafio.split('');
    let embDesafio = embaralha(desafio);

    let novaString = embDesafio.join('');

    embDesafio = testarIgualdades(novaString, desafio)

    for(let i = 0; i < embDesafio.length; i++) {

        const btn = document.createElement('button');
        btn.textContent = embDesafio[i];
        btn.setAttribute('value', embDesafio[i]);

        if(embDesafio[i] == "+" || embDesafio[i] == "-" || embDesafio[i] == "*" || embDesafio[i] == "/"){
            btn.style.color = "#1cb0f6";
        }

        btn.addEventListener('click', (e)=> {
            //respostaCalc.value += e.target.value
        });
        
        if(embDesafio[i] != null)
            novaMatriz.appendChild(btn);

    }

    novoDesafio.innerHTML = 'Novo Desafio';
    pontosSpan.innerHTML = `Pontos: <span class="numPontos">${pontosGame}</span>`;
    imprimeRes.innerHTML = 'Resposta: '+eval(desafio);
    currentAwenser =  desafio;

}


novoDesafio.addEventListener("click", ()=> {
    gerarMatriz();
})

chkResposta.addEventListener('click', ()=> {
    checarInput();
})