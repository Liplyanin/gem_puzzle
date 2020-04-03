//let body = document.querySelector('body').insertAdjacentHTML('afterbegin',`<div class ='playground'></div>`);
let playground = document.querySelector('.playground');


for(let i=0; i<9; i++){ 
    let div = document.createElement('div');
    if(i==0)div.innerHTML='', div.style = 'background-color: rgb(219, 219, 211);';
    else div.innerHTML=i;
    div.className='playground_item';
    playground.append(div)
}
let sizes = document.querySelector('.sizes');
sizes.addEventListener('click',(event)=>{
    if(event.target.tagName=='A'){
        sizes.querySelectorAll('a').forEach(el=>el.classList.remove('active'))
        event.target.classList.add('active')
    }
})
