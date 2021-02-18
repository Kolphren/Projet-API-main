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

cities.forEach(city=>{ // cré le menu déroulant
    let option = document.createElement('option');
    option.text = city.name;
    option.value = city.value;
    list.add(option);
   // console.log(city);

})

list.addEventListener('change', (el) => { //lance la requête API
    url = el.target.value;
    page =1;
    requestApi();
});

button.addEventListener('click', (el)=>{ //charge
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
    //console.log(url);
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
    // console.log(el);
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
        document.querySelector("#comment").innerHTML = result.comment; 
        infos.classList.remove('none');
    }
    var container = L.DomUtil.get('mapid');
    if(container != null){
    container._leaflet_id = null;
    }

    let lon = result.longitude;
    let lat = result.latitude;
    let wcIcone = L.icon ({
        iconUrl: 'icon3.png',
        iconSize: [40, 55],
        iconAnchor: [38, 52]
    });

    let mymap = L.map('mapid').setView([lat, lon], 13);
    L.marker([lat, lon], {icon: wcIcone}).addTo(mymap);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { 
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoia29scGhyZW4iLCJhIjoiY2tsYW8zY3R5MWJrNTJ3bnB0b3ZocGRjNCJ9.XUJdmNxTXIc590jlTsYlQw'
        })
        .addTo(mymap);
})
