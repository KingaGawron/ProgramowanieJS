const przelicz = document.querySelector('#przelicz')
const wynikiPojemnik = document.querySelector('#wyniki')
const numInputs=document.getElementsByClassName('num')

function Dodaj(){
    let div = document.createElement('div');
    let input = document.createElement('input');
    let button = document.createElement('button');
    button.innerHTML="X";
    button.addEventListener('click',(ev)=>{
        ev.currentTarget.parentNode.remove();
        Funkcja();
    });

    input.type='number';
    input.value=0;
    input.className="num";

    input.addEventListener('input', Funkcja );
    div.appendChild(input);
    div.appendChild(button);

    document.querySelector("#inputs").appendChild(div);
    Funkcja();
}
function Funkcja(){ 
    let numValues = []
    for (let el of numInputs) {
        numValues.push(parseInt(el.value))
    };
    const dodawanie = numValues.reduce((sum, val) => sum + val)
    wynikiPojemnik.innerHTML = ` 
    Wynik dodawania: ${dodawanie}
    Średnia: ${dodawanie/numValues.length}
    Wynik min: ${Math.min(...numValues)}
    Wynik max: ${Math.max(...numValues)}
`}
let dodaj = document.getElementById("dodaj")
dodaj.addEventListener('click', Dodaj);
Dodaj();
Dodaj();
Dodaj();