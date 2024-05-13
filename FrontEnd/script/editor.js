//Déclaration fonction fetch pour récupérer works dans modal
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
    EmptyModal2()
};

//Fonction fermeture modale
export const closeModal = function () {
    overlay.classList.add("hidden");
    modalContainer.classList.add("hidden");
    modalContainer.removeAttribute("display", "flex");
    EmptyModal2()

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

//fonction retourne modale1 avec la fléche

export const returnModal1 = function () {
    EmptyModal2()
    closeModal2();
    openModal();
  }

//Ajouter de la photo par la modale 

export function chooseaPhoto() {
    document.getElementById('fileInput').addEventListener('change', () => {
      let fil = fileInput.files[0];
      //Vérfication si fichier sélectionné est conforme pr l'ajoute d'une photo
      let maxSize = 4 * 1024 * 1024;
      let allFormats = ['image/jpg','image/jpeg','image/png'];
      if(fil.size <= maxSize && allFormats.includes(fil.type)) {
        //Création du FileReader pour lire le nouveau ficher
        const Reader = new FileReader();
        //Lecture et traitement du nouveau fichier
          Reader.onload = () => { 
          const imagePreview = document.querySelector('.imagePreview')
          const iconAddPic = document.querySelector('.fa-image')
          const labelInputFile = document.querySelector('.labelFileInput')
          const textInputFile = document.querySelector('.addPicContainer p')
          //Affichage du nouveau fichier
          iconAddPic.style.display = 'none';
          labelInputFile.style.display = 'none';
          textInputFile.style.display = 'none';
          
          imagePreview.src = Reader.result
          imagePreview.style.display = 'flex';
        }
        Reader.readAsDataURL(fil)

        //Message d'erreur si le taille de la photo ne correspond pas 
      } else if (fil.size > maxSize){
        alert("L'image est trop volumineuse")
        //Message d'erreur si le format de la photo ne correspond pas
      } else {
        alert("Le format du projet ne correspond pas !")
        console("Le format du projet ne correspond pas !")
      };
    });
}

export function NewFile () {
    const btnPictureValidate = document.querySelector('.btnValidatePic')
    const fileInput = document.getElementById('fileInput')
    const titleInput = document.getElementById('title')
    const categoryInput = document.getElementById('category');
    let mToken = window.localStorage.getItem('token');

    //Ajout événement au click du bouton valider
    btnPictureValidate.addEventListener('click', async (event) => {
      event.preventDefault();
      if (fileInput.value === "" || titleInput.value.trim() === "" || categoryInput.value === "") {
        alert("Il semblerait que certaines informations soient manquantes")
      } else { 
        const postConfirmationProjet = confirm("Voulez-vous importer votre projet ?")
      //Si le bouton "oui" est cliqué :
      if(postConfirmationProjet) {
        const formData = new FormData ();
          //Récupération de l'ID catégory
          formData.append('category', categoryInput.value);
          formData.append('image', fileInput.files[0]);
          formData.append('title', titleInput.value);
        const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${mToken}`,
            },
          body: formData,
        });
          if (response.ok) {
            alert("Projet ajouté !");
            console.log(titleInput.value, " ajouté !")
           //la modal va se vider 
            EmptyModal2()
          };
        };
      };
    });
  }

  //quand je ferme la modale et je retourne sur la gallery modale je mi une fonction pour la vider 
  function EmptyModal2() {
    const image = document.querySelector('.imagePreview')
    const iconAddPic = document.querySelector('.fa-image')
    const labelInputFile = document.querySelector('.labelFileInput')
    const textInputFile = document.querySelector('.addPicContainer p')
    const title = document.getElementById('title');
    const categoryForm = document.getElementById('category');
    
    image.style.display = 'none'
    title.value = ""
    categoryForm.value = ""
    
    iconAddPic.style.display = 'flex';
    labelInputFile.style.display = 'flex';
    textInputFile.style.display = 'flex';
    
    const validateBtn = document.querySelector('.btnValidatePic');
    validateBtn.disabled = true 
    validateBtn.style.background = "#A7A7A7";
    validateBtn.style.cursor = "default"
    
    }
    
    