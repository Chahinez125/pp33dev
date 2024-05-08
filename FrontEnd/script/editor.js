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
//je veux supprimer les work dans ma modal 
async function deleteWorks(event, worksId){
     // Récupérer token d'authentification depuis le stockage local
    let mToken = window.localStorage.getItem('token')
    //// je demande une confirmation à l'utilisateur avant de supprimer le projet
    const deleteConfirmation = confirm("Souhaitez-vous vraiment supprimer ce projet ?");
    // Si confirmation :
    if (deleteConfirmation) {
        // Effectuer une requête de suppression vers l'API avec fetch
        fetch(`http://localhost:5678/api/works/${worksId}`, {
            method: "DELETE", // la mthode delete pr supprimer
            headers: {
                Authorization: `Bearer ${mToken}`,
            },//la reponse de ma requêtte
        }).then(response => {
            if (response.ok) {
                //si la reponse ok supprimer les element
                document.querySelectorAll(`.figure-${worksId}`).forEach((figure) => figure.remove());
                event.preventDefault();
                //l'affichage d'alert
                alert("Projet supprimé !");
                console.log("Travail supprimé");
            } else {
                console.error("Erreur lors de la suppression.");
            }
        }).catch(error => {
            // Gérer les erreurs qui pourraient survenir pendant l'exécution de la requête
            alert('Suppression impossible, une erreur est survenue');
        });
    }
}

//quand je clique sue btn ajouter une photo la modal2 va souvrir 
const addModal = document.querySelector('.addContentModal')

export const openModal2 = function(){
modalContainer.classList.remove('display', 'flex')
modalContainer.classList.add('hidden')
addModal.classList.remove('hidden')
addModal.classList.add('display','flex')
}
//Fonction fermeture modale 2
export const closeModal2 = function(){
    overlay.classList.add('hidden')
    addModal.classList.add('hidden')
    addModal.removeAttribute('display', 'flex')

}