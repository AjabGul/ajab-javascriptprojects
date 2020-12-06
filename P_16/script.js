const container = document.getElementById('container');
const text = document.getElementById('text')

// step 1:
const totalTime = 7500
const breatheTime =(totalTime/ 5) * 2
const holdTime = totalTime / 5

// step 3: 
breatheAnimation();

// step 2:
function breatheAnimation(){
    text.innerHTML = 'Breathe In!'
    container.className = 'container grow'

    setTimeout(() =>{
        text.innerText = 'Hold'

        setTimeout(() =>{
            text.innerText = 'Breathe Out'
            container.className = 'container shrink'
        }, holdTime)
    }, breatheTime)
}

// step 4: 
setInterval(breatheAnimation, totalTime)