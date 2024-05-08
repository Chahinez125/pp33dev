async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    //a chaque foi j'appel getWork je veux quelle me return await.json dans notre tableau
    return await response.json();
}
//Création fonction pour vider la gallerie de la modale
const modalGallery = document.querySelector(".modalGallery");
function resetGallery() {
    modalGallery.innerHTML = "";
}
export function editMode() {
    //modif bar edit html/css
    const adminconnecter = window.localStorage.getItem("token");
    if (adminconnecter) {
        //afficher barre editor
        const headBar = document.querySelector(".HeadBar");
        headBar.style.display = "flex";
        headBar.classList.add("active");

        //Suppression filtres
        const filter = document.querySelector(".container-filtres");
        filter.style.display = "none";
        //Ajout bouton modifier
        const btnOpen = document.querySelector(".btnOpen");
        btnOpen.classList.remove("hidden");

        //Changement text login en logout
        const logOut = document.getElementById("logout");
        logOut.innerText = "logout";
        logOut.href = "";
    }
    //Création de la fonction Logout
    const logOutLink = document.getElementById("logout");

    logOutLink.addEventListener("click", logout);
    //Lancement de la fonction logout avec redirection sur l'index.HTML et suppresion du Token
    function logout() {
        window.localStorage.removeItem("token");
        location.reload("index.html");
    }
}

//Fonction ouverture modale 1 et ajout de l'overlay
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-container");

export const openModal = function () {
    overlay.classList.remove("hidden");
    modalContainer.classList.remove("hidden");
    modalContainer.setAttribute("display", "flex");
};

//Fonction fermeture modale
export const closeModal = function () {
    overlay.classList.add("hidden");
    modalContainer.classList.add("hidden");
    modalContainer.removeAttribute("display", "flex");

}

//affichage work dans la gallery
export function generateWork() {
    getWorks().then((data) => {
        resetGallery();
        data.forEach((work) => {
            const worksId = work.id;
            const modalGallery = document.querySelector(".modalGallery");
            const figure = document.createElement("figure");
            figure.classList.add(`figure-${worksId}`);
            //Création des balises <img> et <figcaption>
            const imageWork = document.createElement("img");
            imageWork.src = work.imageUrl;
            imageWork.alt = work.title;
            const trashIcon = document.createElement("div");
            trashIcon.classList.add("trash-icon");
            trashIcon.innerHTML = `<i class="fa-solid fa-trash-can" id="${work.id}"></i>`;
            // Affichage des "work" séléctionné en les rattachant à la balise <div> du HTML
            modalGallery.appendChild(figure);
            figure.appendChild(imageWork);
            figure.appendChild(trashIcon);

            trashIcon.addEventListener("click", (event) => {
                deleteWorks(event, worksId);
            });
        });
    });
}
