document.addEventListener('keydown', jump); // Quando qualquer tecla for digitada a função jump será chamada

function start() {
    document.querySelector('.dormindo').classList.add('running')
    document.querySelector('.running').classList.add('homer')
    document.querySelector('.homer').setAttribute('src', 'Image/homer/running.gif')
    document.querySelector('.running').classList.remove('dormindo')


    document.querySelector('.title').style.fontSize = '1rem'
    document.querySelector('.title').style.textAlign = 'left'
    document.querySelector('.title').style.top = '0'
    document.querySelector('.title').style.textShadow = '1px 1px #fff'


    score_count()


}

// Guardando o elemento pipe, homer e score
const pipe = document.querySelector('.pipe');
const score = document.querySelector('#score');
const audio_jump = document.querySelector('.audio-jump');
const audio_lose = document.querySelector('.audio-lose');
const game_over = document.querySelector('.game_over');
let count = 0;
let time_score = 250;

function jump() {

    // Criando uma condição. Se o h1 gameover estiver visível o efeito de pular será pausado
    if (game_over.style.visibility) {
        audio_jump.pause()
    }else{
        audio_jump.play()
    }

    document.querySelector('.running').classList.add('jump');

    setTimeout( () => {
        document.querySelector('.running').classList.remove('jump')

    } , 510);
}

function score_count() {
    setInterval( () => {
    

        // Criando condição. Se o homer bater no pipe (feito através de localização) troca a imagem do homer e para o loop
    
        if (game_over.style.visibility) {
            clearInterval(loop_score)
        }else{
            count++;
            score.innerHTML = 'SCORE:' + count
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
        
        homer.style.animation = 'none';
        homer.style.bottom = homerPosition + 'px';

        const homer_death = 'Image/homer/lose.gif'

        homer.setAttribute('src', homer_death)

        game_over.style.visibility = 'visible'

        document.querySelector('h2').style.visibility = 'visible'
        document.querySelector('h2').innerHTML = 'SCORE:' + count
        document.querySelector('.box_score').style.visibility = 'hidden'

        clearInterval(loop) // Parando o loop após o homer bater no pipe
    }
    else if (count > 100 && count < 200) {
        if (positionPipe < 10) {
            if (positionPipe > 0) {
                pipe.style.animationDuration = '2s'
            }
        } 
    }else if (count > 200 && count < 300) {
        if (positionPipe < 10) {
            if (positionPipe > 0) {
                pipe.style.animationDuration = '1s'
            }
        } 
    }else if (count > 300 && count < 400) {
        if (positionPipe < 10) {
            if (positionPipe > 0) {
                pipe.style.animationDuration = '0.5s'
            }
        } 
    }
    else if (count == 400) {
        
    }

}, 10); // 10 mili segundos