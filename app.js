
document.addEventListener('keydown', jump); // Quando qualquer tecla for digitada a função jump será chamada

//############
// Inicando música
const audio = new Audio('audio/Sky high (Craig Ballie - Morning Rise).mp3');

//############

// Guardando o elemento pipe, mario e score
const pipe = document.querySelector('.pipe');
const homer = document.querySelector('.homer');
const score = document.querySelector('#score');
const audio_jump = document.querySelector('.audio-jump')
const game_over = document.querySelector('h1')


function jump() {
    // Criando uma condição. Se o h1 gameover estiver visível o efeito de pular será pausado
    if (game_over.style.visibility) {
        audio_jump.pause()
    }else{
        audio_jump.play()
    }

    document.querySelector('.homer').classList.add('jump');

    const positionPipe = pipe.offsetLeft;
    const homerPosition = window.getComputedStyle(homer).bottom.replace('px', '');

    setTimeout( () => {
        document.querySelector('.homer').classList.remove('jump')

        if (positionPipe <= 80 && marioPosition == 0){
            const score_calc = parseInt(score.value + 1);
            score.value = score_calc
        }
    } , 510);
}

// Criando um loop que atualiza a cada 10 mili segundos

const loop = setInterval( () => {
    
    // guardando na constante a distância do pipe até a parede esquerda
    const positionPipe = pipe.offsetLeft;
    const homerPosition = window.getComputedStyle(homer).bottom.replace('px', '');

    // Criando condição. Se o mario bater no pipe (feito através de localização) troca a imagem do Mário e para o loop

    if (positionPipe <= 80  && positionPipe > 0 && homerPosition < 70) {
        
        pipe.style.animation = 'none';
        pipe.style.left = positionPipe + 'px';
        
        homer.style.animation = 'none';
        homer.style.bottom = homerPosition + 'px';

        const homer_death = 'Image/running/lose.gif'

        homer.setAttribute('src', homer_death)

        game_over.style.visibility = 'visible'

        clearInterval(loop) // Parando o loop após o mario bater no pipe
    }

}, 10); // 10 mili segundos