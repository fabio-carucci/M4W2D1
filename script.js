function displayPhotos(url, artistName, alt) {
    //Creazione contenitore "col" dentro la row
    let col = document.createElement("div");
    col.classList.add("col-3");

    document.querySelector(".row").appendChild(col);

    //Creazione card
    let card = document.createElement("div");
    card.classList.add("card", "customCard");

    col.appendChild(card);
    
    //Creazione contenuto card
    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.alt = alt;
    cardImg.src = url;
    cardImg.loading = "lazy";

    card.appendChild(cardImg);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    card.appendChild(cardBody);

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = artistName;

    cardBody.appendChild(cardTitle);
}
// displayPhotos("/assets/IMG_3290.jpeg", "Fabio Carucci", "Foto di montagna");

let myBtn = document.getElementById('searchButton');
let myInput = document.getElementById('searchInput');

function searchPhotos() {
    if (myInput.value.trim() === '') {
        alert('Inserisci un valore nell\'input prima di effettuare la ricerca.');
        return; // Esce dalla funzione se l'input è vuoto
    }

    let elementsToRemove = document.querySelectorAll(".row > *");

    if (elementsToRemove.length > 0) {
        elementsToRemove.forEach(element => {
            element.remove();
        });
    }

    let apiUrl = `https://api.pexels.com/v1/search?query=${myInput.value}&per_page=25`;    
    let apiKey = 'E63GsAeMZVEyURzqIq42SBu7IaNTm5l1BDsVTcROhz87gyOnM3OS5FKX';
    
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            let photos = data.photos;
            photos.forEach(element => {
                displayPhotos(element.src.original, element.photographer, element.alt);
            });
        })
        .catch(error => console.error('Errore durante la richiesta:', error.message));
}

myBtn.addEventListener("click", searchPhotos);

myInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPhotos();
    }
});