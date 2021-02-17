//rien
let cities = [
    {name: 'ville'},
    {name: 'Paris', value: 'paris%20FR'},
    {name: 'Lyon', value: 'lyon%20FR'},
    {name: 'Bordeaux', value: 'bordeaux%20FR'},
    {name: 'Lille', value: 'lille%20FR'},
    {name: 'Montpellier', value: 'montpellier%20FR'},
    {name: 'Bruxelles', value: 'brussels%20BE'},
    {name: 'Barcelone', value: 'london%20GB'},
    {name: 'Berlin', value: 'berlin%20DE'},
    {name: 'Barcelone', value: 'barcelona%20ES'}
]
let list = document.querySelector('#cities');
// let select = document.createElement('select');

cities.forEach(city=>{
    option = document.createElement('option');
    option.text = city.name;
    option.value = city.value;
    list.add(option);
    console.log(city);

})
// let cityChoice = document.querySelector('class');

let url;
document.querySelector('#cities').addEventListener('change', (el) => {
    url = el.target.value;
    log();
});

function log(){
    console.log(url);
    //mettre le fetch ici
    fetch('https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=10&offset=0&query='+url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let displayList = document.querySelector('.nav');
        let location = data;
        let ul = document.createElement('ul');
        location.forEach(info => {
            displayList.innerHTML = '';

            let li = document.createElement('li');
            console.log(info);
            li.innerHTML = info.name;
            li.dataset.id = info.id;
            ul.appendChild(li);
        })
        displayList.appendChild(ul);
    })
}


document.querySelector('.nav').addEventListener('click', (el) => {
    el = el.target;
    if (el.dataset.id) {
        fetch (variable)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.querySelector("#name").innerHTML = data.name;
            document.querySelector("#city").innerHTML = data.city;
            document.querySelector("#street").innerHTML = data.street;
            document.querySelector("#country").innerHTML = data.country;
            document.querySelector("#accessible").innerHTML = data.accessible;
            document.querySelector("#unisex").innerHTML = data.unisex;
            info.classList.remove('none');
        });
    }
})




// let city;
// fetch(' https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=100&offset=0&query=paris%20FR') // requète sur l'API
// .then((response)=>{ //le => remplace cette syntax: .then(function(response)...)
//     return response.json(); // renvoie le résultat sous forme de .json
//     // console.log(response);
// })

// .then((data)=>{ //ce que tu me retourne appelle le data
//     city = data; 
//     city.forEach(i=>{
//         console.log(i.country);

//     })
    
// })

// document.querySelector('.character').addEventListener("click", (el) =>{
//     el=el.target.id;
//     let characterData = characters[el];
//     console.log(el);
//     // console.log(characterData);
//     characterData.forEach(info =>{
//         console.log(info);

//     })
// })
