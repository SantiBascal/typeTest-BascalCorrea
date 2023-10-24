
function randomWord(wordArray, wordNum){
    let randomGenerate = Math.floor(Math.random() * wordNum);
    return wordArray[randomGenerate]
}


function wordSelector(){
    fetch('data/words.json')
    .then((res)=>{
        return res.json();
    })
    .then((words)=>{
        let wordArray = words.palabras
        let wordsNum = wordArray.length;
        
        document.querySelector('.textContainer').innerHTML = ''

        for(let x = 0; x < 200 ; x+=1){
            
            document.querySelector('.textContainer').innerHTML += randomWord(wordArray, wordsNum)
            
        }

        

    })
    .catch((err)=>{
        console.log(err)
    })
}


wordSelector()
