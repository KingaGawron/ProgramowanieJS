const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')
const przelicz = document.querySelector('#przelicz')
const wynikiPojemnik = document.querySelector('#wyniki')

const dodawanie = parseInt(liczba1.value)+parseInt(liczba2.value)+parseInt(liczba3.value)+parseInt(liczba4.value)
przelicz.addEventListener('click', ()=>{
wynikiPojemnik.innerHTML = 
`Wynik dodawania:${dodawanie(value)}
Średnia:${dodawanie(value)/4}
Wynik min:${Math.min(+liczba1.value,+liczba2.value,+liczba3.value,+liczba4.value)}
Wynik max:${Math.max(+liczba1.value,+liczba2.value,+liczba3.value,+liczba4.value)}`}

);
