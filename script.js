document.querySelector('body').insertAdjacentHTML('afterbegin',`
<div class="buttons">
        <button id="mix" onclick="getField(currentSize)">Mix and start</button>
        <button id="results">Results</button>
        <button id="save" onclick="save()">Save</button>
    </div>
    <div class="game-status">
        <div class="steps">Steps: 0</div>
        <div class="time"> Time: 00 : 00 </div>
    </div>`)
document.querySelector('body').insertAdjacentHTML('afterbegin',`
<div class="sizes">
Other sizes:
<a>3x3</a>
<a id="4*4">4x4</a>
<a>5x5</a>
<a>6x6</a>
<a>7x7</a>
<a>8x8</a>
</div> `);
document.querySelector('body').insertAdjacentHTML('afterbegin',`<div class ='playground'></div>`);
let playground = document.querySelector('.playground');

let expectedResult = '';
let currentSize = 16;
let steps = 0;
let minutes = 0;
let seconds = 0;
let timer; 
let playgroundStyle;
let winnerClock;
const clock = () => {
    if(seconds==60){
        minutes++;
        seconds = 0;
    }
    let resMinute=((minutes < 10) ? "0" : "") + minutes;
    let resSeconds =((seconds < 10) ? "0" : "") + seconds;
    let clock = 'Time: '+ resMinute + " : " + resSeconds;
    winnerClock = resMinute + ':' + resSeconds;
    document.querySelector('.time').innerHTML = clock;
    seconds++;    
    timer = setTimeout("clock()",1000); 
      

}

const getField = (size) =>{    
    playground.innerHTML = '';
    clearTimeout(timer);
    minutes = 0;
    seconds = 0;
     for(let i=0; i<size; i++){ 
        let div = document.createElement('div');
        if(i==0){
            div.innerHTML='';
            div.className = 'step';
            playground.append(div);
        } else {
            div.innerHTML=i;
            div.className='playground_item';
            playground.append(div);
        }
    }

    let arr = [];
    let str = '';
    for(let i=0; i<playground.children.length; i++){
        arr.push(playground.children[i].outerHTML)
    }
    for(let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random()*(i + 1));
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }

    arr.forEach(el=>str+=el);
    playground.innerHTML = str;
    steps = 0;
    document.querySelector('.steps').innerHTML = 'Steps: ' + steps;
    clock()
};

const changeField = () =>{
 
    let str = event.target.innerHTML;
    currentSize = +(str[0])*(+str[2]);
    playgroundStyle = `   
    display: grid;
    grid-template-columns: repeat(` + str[0] + `, 1fr);
    grid-template-rows: repeat(` + str[0] + `, 1fr);
    background-color: rgb(241, 241, 177);`
    playground.style = playgroundStyle;
    getField(currentSize);
    expectedResult='';
    for(let i=1; i<currentSize; i++){
        expectedResult+=i;
    }
    
};
const changePos = (el) =>{
    
    let arr = [];
    let str = '';
    for(let i=0; i<playground.children.length; i++){
        arr.push(playground.children[i].outerHTML)
    }
    let indexEmty = arr.indexOf(el.outerHTML);
    let indexFull = arr.indexOf(event.target.outerHTML);
    [arr[indexEmty], arr[indexFull]] = [arr[indexFull], arr[indexEmty]];

    arr.forEach(el=>str+=el);
    playground.innerHTML = str;
    steps+=1;
    document.querySelector('.steps').innerHTML = 'Steps: ' + steps;
};

let sizes = document.querySelector('.sizes');

sizes.addEventListener('click',(event)=>{
    if(event.target.tagName=='A'){
        sizes.querySelectorAll('a').forEach(el=>el.classList.remove('active'));
        event.target.classList.add('active');
        changeField();
    }
});

playground.addEventListener('click', (event)=>{
    let emptySquare = document.querySelector('.step');
    let result = '';

    if((emptySquare.offsetTop < event.clientY) && (event.clientY < (emptySquare.offsetTop + emptySquare.offsetHeight))){
        if((event.clientX > (emptySquare.offsetLeft - emptySquare.offsetWidth)) && (event.clientX < (emptySquare.offsetLeft + emptySquare.offsetWidth*2))){
           if(event.target.className=='playground_item'){
            changePos(emptySquare);
            }
        }
    }else if( (event.clientY > emptySquare.offsetTop -  emptySquare.offsetHeight) && (event.clientY < emptySquare.offsetTop +  emptySquare.offsetHeight * 2)){
        if((event.clientX > emptySquare.offsetLeft) && (event.clientX < emptySquare.offsetLeft + emptySquare.offsetWidth)){
            if(event.target.className=='playground_item'){
                changePos(emptySquare);
              
            }
        }
    }
    playground.querySelectorAll('.playground_item').forEach(el=>result+=el.innerHTML)
    if(result==expectedResult){
        alert('Ура! Вы решили головоломку за '+ winnerClock + ' и ' + steps + ' ходов»')
    }
    
});

const save = () =>{
    localStorage.setItem('gameField', playground.innerHTML);
    localStorage.setItem('playgroundStyle', playgroundStyle );
    localStorage.setItem('gameSeconds',  seconds);
    localStorage.setItem('gameMinutes',  minutes);
    localStorage.setItem('steps',  steps);
    localStorage.setItem('currentSize',  currentSize);
    localStorage.setItem('expectedResult',  expectedResult);
}
window.onload = () =>{
    if(localStorage.getItem('gameField')){
        currentSize = localStorage.getItem('currentSize');
        playground.innerHTML = localStorage.getItem('gameField');
        playground.style  = localStorage.getItem('playgroundStyle');
        minutes = localStorage.getItem('gameMinutes');
        seconds = localStorage.getItem('gameSeconds');
        steps = +(localStorage.getItem('steps'));
        expectedResult = (localStorage.getItem('expectedResult'));
        clock();
        document.querySelector('.steps').innerHTML = 'Steps: ' + steps;
        
    } else {
    getField(currentSize);
    document.getElementById('4*4').classList.add('active')
    }
};