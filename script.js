let list = document.querySelector('#cities');
let button = document.querySelector('.btn');
let cities = [
    {name: 'ville'},
    {name: 'Paris', value: 'paris%20FR'},
    {name: 'Lyon', value: 'lyon%20FR'},
    {name: 'Bordeaux', value: 'bordeaux%20FR'},
    {name: 'Lille', value: 'lille%20FR'},
    {name: 'Montpellier', value: 'montpellier%20FR'},
    {name: 'Bruxelles', value: 'brussels%20BE'},
    {name: 'Londres', value: 'london%20GB'},
    {name: 'Berlin', value: 'berlin%20DE'},
    {name: 'Barcelone', value: 'barcelona%20ES'}
]

cities.forEach(city=>{
    option = document.createElement('option');
    option.text = city.name;
    option.value = city.value;
    list.add(option);
    console.log(city);
  
})
// let cityChoice = document.querySelector('class');

let url;
let page = 1;
list.addEventListener('change', (el) => {
    url = el.target.value;
    page =1;
    requestApi();
});
let local;
button.addEventListener('click', (el)=>{
    if(el.target.id == 'next');
    page += 1;
    console.log(page);
    requestApi();
})
function requestApi(){
    console.log(url);
    fetch(`https://www.refugerestrooms.org/api/v1/restrooms/search?page=${page}&per_page=10&offset=0&query=${url}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let displayList = document.querySelector('.nav');
        local = data;
        let ul = document.createElement('ul');
        local.forEach(info => {
            displayList.innerHTML = '';
            let li = document.createElement('li');
            console.log(info);
            li.innerHTML = info.name;
            li.dataset.id = info.id;
            ul.appendChild(li);
        })
        displayList.appendChild(ul);
        button.innerHTML='';

        if (local.length >= 9 ){
            next = document.createElement('button');
            next.dataset.btn = data.next;
            next.innerHTML = 'Next';
            next.id = 'next';
            button.appendChild(next);
        }
    })
    return local;
}


document.querySelector('.nav').addEventListener('click', (el) => {
    el = el.target.dataset.id;
    console.log(el);
    let result;
    if (el) {
        result = local.find (id => id.id == el);
        console.log(result);
        document.querySelector("#name").innerHTML = result.name;
        document.querySelector("#city").innerHTML = result.city;
        document.querySelector("#street").innerHTML = result.street;
        document.querySelector("#country").innerHTML = result.country;
        document.querySelector("#accessible").innerHTML = result.accessible;
        document.querySelector("#unisex").innerHTML = result.unisex;
        //info.classList.remove('none');
    }
    var container = L.DomUtil.get('mapid');
    if(container != null){
    container._leaflet_id = null;
    }

    let lon = result.longitude;
    let lat = result.latitude;

    let mymap = L.map('mapid').setView([lat, lon], 13);
    let marker = L.marker([lat, lon]).addTo(mymap);
    
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
        })
        .addTo(mymap);
    //console.log(local);
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
