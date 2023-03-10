
document.addEventListener('keydown', jump) // Quando qualquer tecla for digitada a função jump será chamada

const pipe = document.querySelector('.pipe')
const mario = document.querySelector('.mario')


function jump(){
    document.querySelector('.mario').classList.add('jump')

    setTimeout( () => {
        document.querySelector('.mario').classList.remove('jump')
    } , 510);
}

// Criando um loop que atualiza a cada 10 mili segundos

const loop = setInterval(() => {
    
    // guardando na constante a distância do pipe até a parede esquerda
    const positionPipe = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace('px', '');
    
    if (positionPipe <= 80  && positionPipe > 0 && marioPosition < 70) {
        
        pipe.style.animation = 'none';
        pipe.style.left = positionPipe + 'px';
        
        mario.style.animation = 'none';
        mario.style.bottom = marioPosition + 'px';

        const mario_death = './image/mario-death.png'

        mario.setAttribute('src', mario_death)

        document.querySelector('h1').style.visibility = 'visible'
    }

}, 10); // 10 mili segundos