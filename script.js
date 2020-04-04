document.querySelector('body').insertAdjacentHTML('afterbegin',`
<div class="sizes">
Other sizes:
<a id="3x3">3x3</a>
<a id="4x4">4x4</a>
<a id="5x5">5x5</a>
<a id="6x6">6x6</a>
<a id="7x7">7x7</a>
<a id="8x8">8x8</a>
</div>`);
document.querySelector('body').insertAdjacentHTML('afterbegin',`<div class ='playground'></div>`);
let playground = document.querySelector('.playground');


( function (){
    for(let i=0; i<9; i++){ 
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
        arr.unshift(playground.children[i].outerHTML)
    }
    for(let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random()*(i + 1));
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }

    arr.forEach(el=>str+=el);
    playground.innerHTML = str;

}());



let sizes = document.querySelector('.sizes');
sizes.addEventListener('click',(event)=>{
    if(event.target.tagName=='A'){
        sizes.querySelectorAll('a').forEach(el=>el.classList.remove('active'))
        event.target.classList.add('active')
    }
})

const  changePos = (el) =>{
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
}

playground.addEventListener('click', (event)=>{
    let emptySquare = document.querySelector('.step');

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
    
   


})
