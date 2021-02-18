let list = document.querySelector('#cities');
let button = document.querySelector('.btn');
let local;
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
let url;
let page = 0;
let minItem = 0;
let maxItem = 10;

cities.forEach(city=>{
    option = document.createElement('option');
    option.text = city.name;
    option.value = city.value;
    list.add(option);
    console.log(city);
  
})

list.addEventListener('change', (el) => {
    url = el.target.value;
    page =1;
    requestApi();
});

button.addEventListener('click', (el)=>{
    if(el.target.id == 'next'){
        page += 1;
        minItem += 10;
        maxItem += 10;
        console.log(page);
        switchPage();
    }
    if(el.target.id == 'previous'){
        page -= 1;
        minItem -= 10;
        maxItem -= 10;
        console.log(page);
        switchPage();
    }
})

function requestApi(){
    console.log(url);
    fetch(`https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=100&offset=0&query=${url}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        local = data;
        // console.log(local);
        switchPage();
    })
}

function switchPage(){
    let displayList = document.querySelector('.nav');
    let ul = document.createElement('ul');
    item = local.slice(minItem, maxItem)
        item.forEach(info => {
        displayList.innerHTML = '';
        let li = document.createElement('li');
        li.innerHTML = info.name;
        li.dataset.id = info.id;
        ul.appendChild(li);
    })
    displayList.appendChild(ul);
    button.innerHTML='';
    if(page >= 2){
        prev();
    }   
    if (item.length >= 9){
        next();
    }
}

function next(){
    let next = document.createElement('button');
    next.innerHTML = 'Next';
    next.id = 'next';
    button.appendChild(next);
}

function prev(){
    let previous = document.createElement('button')
    previous.innerHTML = 'Previous';
    previous.id = "previous"
    button.appendChild(previous);
}




document.querySelector('.nav').addEventListener('click', (el) => {
    el = el.target.dataset.id;
    console.log(el);
    let accessible;
    let result;
    let unisex;
    if (el) {
        result = local.find (id => id.id == el);
        if (result.accessible == true){
             accessible = "oui";
    
        }else if(result.accessible == false){
             accessible = "non";
        }
        
        if (result.unisex == true){
             unisex = "oui";
    
        }else if(result.unisex == false){
             unisex = "non";
        }
        console.log(result);
        document.querySelector("#name").innerHTML = result.name;
        document.querySelector("#city").innerHTML = result.city;
        document.querySelector("#street").innerHTML = result.street;
        document.querySelector("#country").innerHTML = result.country;
        document.querySelector("#accessible").innerHTML = accessible;
        document.querySelector("#unisex").innerHTML = unisex;
        // document.querySelector("#comment").innerHTML = result.comment; //ajouter comment dans html
        //info.classList.remove('none');
    }
    var container = L.DomUtil.get('mapid');
    if(container != null){
    container._leaflet_id = null;
    }

    let lon = result.longitude;
    let lat = result.latitude;

    let mymap = L.map('mapid').setView([lat, lon], 13);
    L.marker([lat, lon]).addTo(mymap);
    
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
