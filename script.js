let restroom;


fetch('https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=10&offset=0&query=lyon%20fr')
.then(function(response) {
    return response.json();
})
.then((data) => {
    console.log(data);
})