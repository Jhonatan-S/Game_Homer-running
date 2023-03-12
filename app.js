// Guardando o elementos em constantes
const title = document.querySelector('.title')
const pipe = document.querySelector('.pipe'); // doto do cano
const score = document.querySelector('#score'); // O contador de pontos
const audio_jump = document.querySelector('.audio-jump'); // Som quando o homer pula
const audio_lose = document.querySelector('.audio-lose'); // Som quando o homer bate no cano
const game_over = document.querySelector('.game_over'); // O texto game over
const mario_aplaudindo = document.querySelector('.mario_aplaudindo')
const fumaca = document.querySelector('.fumaca')
const audio_bomba = document.querySelector('.bomba_marioAplaudindo')
const aumentar_velocidade = document.querySelector('.aumentar_velocidade')
let count_score = 0; // score
let time_score = 250; // Determinar o tempo em ms do contador de ponto


function escrever(elemento){
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = ' ';
    textoArray.forEach(function(letra, i){   
      
    setTimeout(function(){
        elemento.innerHTML += letra;
    }, 150 * i)

  });
}
const titulo = document.querySelector('.title');
escrever(titulo);

function start() {
    document.querySelector('.dormindo').classList.add('running')
    document.querySelector('.running').classList.add('homer')
    document.querySelector('.homer').setAttribute('src', 'Image/homer/running.gif')
    document.querySelector('.running').classList.remove('dormindo')
    title.style.fontSize = '1rem'
    title.style.top = '0'
    title.style.textShadow = '1px 1px #fff'
    document.querySelector('.press_start').style.visibility = 'hidden'
    score_count()
}

// Se a tecla seleciona for seta pra cima a função jump será chamada

document.addEventListener('keydown', (e) =>{
    if (e.key === 'ArrowUp') {

        // Se a frase game over ou press start estiverem na tela 
        if (game_over.style.visibility) {
            audio_jump.pause()

        }else{
            audio_jump.play()
            document.querySelector('.running').classList.add('jump');
        }
    
        setTimeout( () => {
            document.querySelector('.running').classList.remove('jump')
    
        } , 510);
    }
})

// Se a tecla pressionada for seta pra baixo o homer vai embaixar 
document.addEventListener('keydown', (e) =>{
    if (e.key === 'ArrowDown'){
        
        // Se a frase game over não esitver visível o homer vai abaixar. Condição feita para ele não ficar recebendo esse comando caso tiver batido no cano
        if (game_over.style.visibility == false) {
            document.querySelector('.running').setAttribute('src', 'Image/homer/abaixado.gif')
            document.querySelector('.running').classList.add('abaixado')
            document.querySelector('.abaixado').classList.remove('running')
        }
    }
})



// Se a tecla seta para baixo for solta o homer voltará a ficar em pé
document.addEventListener('keyup', (event) => {

    if (event.key === 'ArrowDown') {
        // Se a frase game over não esitver visível o homer vai levantar. Condição feita para ele não ficar recebendo esse comando caso tiver batido no cano
        if (game_over.style.visibility == false) {

            document.querySelector('.abaixado').setAttribute('src', 'Image/homer/running.gif')
            document.querySelector('.abaixado').classList.add('running')
            document.querySelector('.running').classList.remove('abaixado')
        }

    }
})

function score_count() {
    const loop_score = setInterval( () => {
        
        // Criando condição. Se o homer bater no pipe (feito através de localização) troca a imagem do homer e para o loop
    
        if (game_over.style.visibility) {
            clearInterval(loop_score)
        }else{
            count_score++;
            score.innerHTML = 'SCORE:' + count_score
        }
    
    }, time_score ); // 10 mili segundos
}

// Criando um loop que atualiza a cada 10 mili segundos

const loop = setInterval( () => {
    const homer = document.querySelector('.homer');
    // guardando na constante a distância do pipe até a parede esquerda
    const positionPipe = pipe.offsetLeft;
    const homerPosition = window.getComputedStyle(homer).bottom.replace('px', '');

    // Criando condição. Se o homer bater no pipe (feito através de localização) troca a imagem do homer e para o loop

    if (positionPipe <= 80  && positionPipe > 0 && homerPosition < 70) {

        audio_lose.play()
        
        pipe.style.animation = 'none';
        pipe.style.left = positionPipe + 'px';
        
        homer.style.bottom = homerPosition + 'px';

        const homer_death = 'Image/homer/lose.gif'

        homer.setAttribute('src', homer_death)
        homer.style.height = '40%'

        game_over.style.visibility = 'visible'

        document.querySelector('h2').style.visibility = 'visible'
        document.querySelector('h2').innerHTML = 'SCORE:' + count_score
        document.querySelector('.box_score').style.visibility = 'hidden'

        clearInterval(loop) // Parando o loop após o homer bater no pipe

    }
    else if (count_score == 100) { 

        pipe.style.animationDuration = '2s'
        pipe.style.visibility = 'hidden'
        pipe.style.animationName = 'none'
        mario()
        
    }else if (count_score == 200) {
        
        pipe.style.animationDuration = '1.5s'
        pipe.style.visibility = 'hidden'
        pipe.style.animationName = 'none'
        mario()
             
        
    }else if (count_score == 300) {
    
        pipe.style.animationDuration = '1s'
        pipe.style.visibility = 'hidden'
        pipe.style.animationName = 'none'
        mario()
            
    } 
    
}, 10); // 10 mili segundos


function mario() {

    setTimeout ( () => {
        aumentar_velocidade.style.visibility = 'visible'
        mario_aplaudindo.style.visibility = 'visible'
        audio_bomba.play()
        fumaca.style.visibility = 'visible'
    },500)

    let contador = 5
    let opacidade = 1.5

    while(contador > 0){

            if (contador > 0) {
        
                fumaca.style.opacity = opacidade
                audio_bomba.pause()
                contador --
                opacidade -= 0.3
            }
        }
                
    setTimeout( () => {   

            aumentar_velocidade.style.visibility = 'hidden'
            fumaca.style.visibility = 'hidden'
            mario_aplaudindo.style.visibility = 'hidden'
            pipe.style.visibility = 'visible'
            pipe.style.animationName = 'pipe-animation'
            contador = 1.5
    }, 5000)
}