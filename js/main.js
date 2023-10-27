let container = document.querySelector('.textContainer');
window.timer = null
window.gameStart = null


function randomWord(wordArray, wordNum) {
    let randomGenerate = Math.floor(Math.random() * wordNum);
    return wordArray[randomGenerate];
}


function addClass(item, addClass) {
    item.className += ' ' + addClass;
}


function removeClass(item, removeClass) {
    item.className = item.className.replace(removeClass, '');
}


function divCreator(words) {
    return `<div class="word"><span class="letra">${words.split('').join('</span><span class="letra">')}</span></div>`;
}






fetch('data/words.json')
    .then((res) => {
        return res.json();
    })
    .then((words) => {
        let wordArray = words.palabras;
        let wordsNum = wordArray.length;

        container.innerHTML = '';

        for (let x = 0; x < 35; x += 1) {

            container.innerHTML += divCreator(randomWord(wordArray, wordsNum));

        }


        let classWord = document.querySelector('.word');
        let classLetra = document.querySelector('.letra');

        addClass(classWord, 'current');
        addClass(classLetra, 'current');

        addClass(container.lastChild.lastChild, 'ultima');

        window.timer = null



    })

    //CAMBIAR EL CATCH POR UN SWEETALERT O ALGO
    .catch((err) => {
        console.log(err);
    })


document.querySelector('#game').addEventListener('keyup', (evt) => {
    let keyPress = evt.key;
    let wordActual = document.querySelector('.word.current')
    let letraActual = document.querySelector('.letra.current');
    let letraEsperada = letraActual?.innerHTML || ' ';
    let esLetra = keyPress.length === 1 && keyPress !== ' '
    let espacio = keyPress === ' '
    let borrar = keyPress === 'Backspace'
    let primerLetra = letraActual === wordActual.firstChild
    let letraExtra = wordActual.lastChild


    if(!window.timer && esLetra){
        window.timer = setInterval(()=>{

            if(!window.gameStart){
                window.gameStart = (new Date()).getTime();
            }

            let timeActual = (new Date()).getTime();
            let msPasado = timeActual - window.gameStart;
            let segundos = Math.round(msPasado / 1000);
            document.querySelector('.seconds').innerHTML = segundos + ''
        }, 1000)
    }

    if (esLetra) {
        if (letraActual) {
            addClass(letraActual, keyPress === letraEsperada ? 'correct' : 'incorrect')
            removeClass(letraActual, 'current')
            if (letraActual.nextSibling) {
                addClass(letraActual.nextSibling, 'current')

            }
        } else {
            let letraIncorrecta = document.createElement('span');
            letraIncorrecta.innerHTML = keyPress
            letraIncorrecta.className = 'letra incorrect extra'
            wordActual.appendChild(letraIncorrecta)
        }
    }

    if (espacio) {
        if (letraEsperada !== ' ') {
            let letrasIncorrectas = [...document.querySelectorAll('.word.current .letra:not(.correct)')]
            letrasIncorrectas.forEach(letra => {
                addClass(letra, 'incorrect')
            })
        }

        removeClass(wordActual, 'current')
        addClass(wordActual.nextSibling, 'current')

        if (letraActual) {
            removeClass(letraActual, 'current')


        }

        addClass(wordActual.nextElementSibling.firstChild, 'current')

    }

    if (borrar) {
        if (letraActual && primerLetra) {       
            removeClass(wordActual, 'current')
            addClass(wordActual.previousSibling, 'current')
            removeClass(letraActual, 'current')
            addClass(wordActual.previousSibling.lastChild, 'current')
            removeClass(wordActual.previousSibling.lastChild, 'incorrect')
            removeClass(wordActual.previousSibling.lastChild, 'correct')


        }

        if (letraActual && !primerLetra) {
            removeClass(letraActual, 'current')
            addClass(letraActual.previousSibling, 'current')
            removeClass(letraActual.previousSibling, 'incorrect')
            removeClass(letraActual.previousSibling, 'correct')

        }
        if (!letraActual) {
            addClass(wordActual.lastChild, 'current')
            removeClass(wordActual.lastChild, 'incorrect')
            removeClass(wordActual.lastChild, 'correct')

        }
        if (letraExtra && letraExtra.classList.contains('extra')) {
            wordActual.removeChild(letraExtra)

        }


    }

})







