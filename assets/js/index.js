import { getPersonajes } from "./consultas/getPersonajes.js";  //DEBEMOS TENER LA CLASE ROW EN EL INDEX.HTML

const enviarDatos =async (id, name, image, species, status, nameLocation)=>{

    const rutaArchivoHtml = "../personajes.html";

    fetch(rutaArchivoHtml)
        .then( response => response.text())
        .then( (html)=> {

            const parser = new DOMParser();
            const doc = parser.parseFromString(html , "text/html");

            const imagePage = doc.getElementById("imagePage");
            imagePage.src = image;
            imagePage.alt = `Foto con nombre de : ${name}`;

            const namePage = doc.getElementById("namePage");
            namePage.textContent = `Nombre : ${name}`;

            const speciesPage = doc.getElementById("speciesPage");
            speciesPage.textContent = `Specie : ${species}`;

            const statusPage = doc.getElementById("statusPage");
            statusPage.textContent = `Estado : ${status}`;

            const nuevoHTML = new XMLSerializer().serializeToString(doc); //PARA LLEVAR A TEXTO TODO

            document.body.innerHTML = nuevoHTML;

        })
        .catch((error)=>{
            console.log(`El error es : ${error}`);
        })


}

const createdCard = (results = []) =>{
    
    let personajesRow = document.getElementById("personajesRow");

    results.map( (result)=>{
        const{id , name, image, species, status, location=""} = result;
        const{name: nameLocation , url} = location;

        const divRow = document.createElement("div");
        divRow.classList.add("col-xl-3");
        divRow.classList.add("col-lg-3");
        divRow.classList.add("col-md-3");
        divRow.classList.add("col-sm-12");
        divRow.classList.add("col-xs-12");
        divRow.classList.add("mt-2");
        divRow.classList.add("mb-2");

        const card= document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = image;
        img.alt = name;
        img.classList.add("card-img-top");

        //name, specie, status
        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = name;

        const subtitle = document.createElement("p");
        subtitle.classList.add("card-text");
        subtitle.textContent = species;

        const estado = document.createElement("p");
        estado.classList.add("card-text");
        estado.textContent = status;

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn");
        btnVer.classList.add("btn-success");
        btnVer.textContent = "Ver Detalles";
        btnVer.addEventListener("click", ()=>{
            enviarDatos(id, name, image, species, status, nameLocation);
        })

        divBody.appendChild(title);
        divBody.appendChild(subtitle);
        divBody.appendChild(estado);
        divBody.appendChild(btnVer);

        card.appendChild(img);
        card.appendChild(divBody);
        divRow.appendChild(card);

        personajesRow.appendChild(divRow);
    })
}

getPersonajes()
    .then(data => createdCard(data)) //GRACIAS A LAS FLECHAS NOS PODEMOS AHORRAR CODIGO Y HACERLO ASI 
    .catch(error => console.log(`El error es : ${error}`))