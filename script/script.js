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

// ########### cré le menu déroulant ###########

cities.forEach(city=>{ 
    let option = document.createElement('option');
    option.text = city.name;
    option.value = city.value;
    list.add(option);
   // console.log(city);

})

// ########### lance la requête API ###########

list.addEventListener('change', (el) => { 
    url = el.target.value;
    page =1;
    requestApi();
});

// ########### charge les 10 item suivant ###########

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

// ########### requête l'API ###########

function requestApi(){ 
    //console.log(url);
    minItem = 0;
    maxItem = 10;
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

// ########### changement de page ###########

function switchPage(){ 
    let displayList = document.querySelector('.nav');
    let ul = document.createElement('ul');
    item = local.slice(minItem, maxItem)
    displayList.innerHTML = '';
        item.forEach(info => {
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

// ########### création de bouton next ########### 

function next(){ 
    let next = document.createElement('button');
    next.innerHTML = 'Next';
    next.id = 'next';
    button.appendChild(next);
}

// ########### création de bouton previous ###########

function prev(){ 
    let previous = document.createElement('button')
    previous.innerHTML = 'Previous';
    previous.id = "previous"
    button.appendChild(previous);
}



// ########### affichage info toilettes et gestion de la map ###########

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

    // ########### gestion de la map ###########
    
    var container = L.DomUtil.get('mapid');
    if(container != null){
    container._leaflet_id = null;
    }

    let lon = result.longitude;
    let lat = result.latitude;
    let wcIcone = L.icon ({
        iconUrl: './img/icon3.png',
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
