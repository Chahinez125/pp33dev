//Déclaration fonction fetch pour récupérer works dans modal
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");

    return await response.json();
}

const modalGallery = document.querySelector(".modalGallery");
function resetGallery() {
    modalGallery.innerHTML = "";
}
export function editMode() {
   
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
   
    const logOutLink = document.getElementById("logout");

    logOutLink.addEventListener("click", logout);
    
    function logout() {
        window.localStorage.removeItem("token");
        location.reload("index.html");
    }
}


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
    
    let mToken = window.localStorage.getItem('token')
 
    const deleteConfirmation = confirm("Souhaitez-vous vraiment supprimer ce projet ?");
   
    if (deleteConfirmation) {
      
        fetch(`http://localhost:5678/api/works/${worksId}`, {
            method: "DELETE", // la mthode delete pr supprimer
            headers: {
                Authorization: `Bearer ${mToken}`,
            },
        }).then(response => {
            if (response.ok) {
      
                document.querySelectorAll(`.figure-${worksId}`).forEach((figure) => figure.remove());
                event.preventDefault();
                //l'affichage d'alert
                alert("Projet supprimé !");
                console.log("Travail supprimé");
            } else {
                console.error("Erreur lors de la suppression.");
            }
        }).catch(error => {
        
            alert('Suppression impossible, une erreur est survenue');
        });
    }
}


const addModal = document.querySelector('.addContentModal')

export const openModal2 = function(){
modalContainer.classList.remove('display', 'flex')
modalContainer.classList.add('hidden')
addModal.classList.remove('hidden')
addModal.classList.add('display','flex')
}

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
        const newWork = await response.json();
        addWorkToModal(newWork);
        addorkToIndex(newWork);

           //la modal va se vider 
            EmptyModal2();
            //retour modal1 pr vue Gallery
            returnModal1();
          };
        };
      };
    });
  }


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
    
    
//Fonction d'ajout du nouveau fichier a la gallery modale

async function addWorkToModal (newWork) {
    const newWorkId = newWork.id
    const modalGallery = document.querySelector('.modalGallery')
    //Création balise <figure>
    const figure = document.createElement ('figure')
    figure.classList.add (`figure-${newWork.id}`);
    //Création balise <img>
    const imgNewWork = document.createElement('img');
    imgNewWork.src = newWork.imageUrl;
    imgNewWork.alt = newWork.title;

    const Icon = document.createElement("div");
    Icon.classList.add("trash-icon");
   Icon.innerHTML= `<i class="fa-solid fa-trash-can" id="${newWork.id}"></i>`;

    modalGallery.appendChild(figure);
    figure.appendChild(imgNewWork);
    figure.appendChild(Icon);
  
    Icon.addEventListener('click', async (event) => {
      deleteWorks(event, newWorkId)
  });
  }
  
  async function addorkToIndex(newWork) {
    const gallery = document.querySelector('.gallery')
    //Création balise <figure>
    const figure = document.createElement ('figure')
    figure.classList.add (`figure-${newWork.id}`);
    //Création balise <img> et <figcaption>
    const imageNewWork = document.createElement('img');
    imageNewWork.src = newWork.imageUrl;
    imageNewWork.alt = newWork.title;
    const figCaption = document.createElement('figcaption');
    figCaption.innerText = newWork.title;
  
    gallery.appendChild(figure);
    figure.appendChild(imageNewWork);
    figure.appendChild(figCaption);
  }