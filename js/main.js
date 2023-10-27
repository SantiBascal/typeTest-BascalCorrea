let container = document.querySelector('.textContainer');



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

        for (let x = 0; x < 50; x += 1) {

            container.innerHTML += divCreator(randomWord(wordArray, wordsNum));

        }


        let classWord = document.querySelector('.word');
        let classLetra = document.querySelector('.letra');

        addClass(classWord, 'current');
        addClass(classLetra, 'current');



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

})







