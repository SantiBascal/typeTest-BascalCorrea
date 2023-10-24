let container = document.querySelector('.textContainer')



function randomWord(wordArray, wordNum) {
    let randomGenerate = Math.floor(Math.random() * wordNum);
    return wordArray[randomGenerate]
}


function addCurrent(item, addClass){
    item.className += ' '+addClass;
}


function removeCurrent(item, removeClass){
    item.className = letter.className.replace(removeClass, '')
}


function divCreator(words) {
    return `<div class="word">
                <span class="letra">
                    ${words.split('').join('</span><span class="letra">')}
                </span>
            </div>`;
}





function wordSelector() {
    fetch('data/words.json')
        .then((res) => {
            return res.json();
        })
        .then((words) => {
            let wordArray = words.palabras
            let wordsNum = wordArray.length;

            container.innerHTML = ''

            for (let x = 0; x < 200; x += 1) {

                container.innerHTML += divCreator(randomWord(wordArray, wordsNum))

            }
            
            let classWord = document.querySelector('.word')
            let classLetra = document.querySelector('.letra')

            addCurrent(classWord, 'current')
            addCurrent(classLetra, 'current')


        })
        .catch((err) => {
            console.log(err)
        })
}






wordSelector()
