import { editMode } from "./editor.js";
import { openModal } from "./editor.js";

// je récupere les travaux depui le backend
//déclare une variable
const gallery = document.querySelector(".gallery");
const containerFiltres = document.querySelector(".container-filtres");

//fonction qui va recupérer mes travaux getWork j'ai async pr lui dire atten dans cette fontion tu dois attens avant de lire mon code
//await sa veux tu attend que le fetch dois finit avant que tu l'enregistre dans response
 export async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  //a chaque foi j'appel getWork je veux quelle me retur await.json dans notre tableau
  return await response.json();
}

getWorks();

//affichage des works dans le dom

async function displayWorks() {
  //j'enregitre
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    createWork(work);
  });
}
displayWorks();
function createWork(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  figcaption.textContent = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

/***cette function pour afficher les bouttons par catégories */
/*Récupere le tableaux de gatégorie*/
async function getCategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
getCategory();
//récuperer le tableau des Cat
async function displayCategoriesBouttons() {
  const catégorys = await getCategory();
  console.log(catégorys);
  catégorys.forEach((catégory) => {
    //crée une varible pr appeler btn
    const btn = document.createElement("button");
    //btn.classList.add(".container-filters");
    btn.textContent = catégory.name;
    btn.id = catégory.id;
    containerFiltres.appendChild(btn);
  });
}
displayCategoriesBouttons();
//filtré au clique sur le btn par catégories
async function filterCategory() {
  //je vais récupere tableaux qui contien tous les travaux
  const workss = await getWorks();
  console.log(workss);
  const buttons = document.querySelectorAll(".container-filtres button");
  buttons.forEach((button) => {
    //pr chaque btn en le selectionne et en va ecouter l'evenement qui va jouet c'est ta dire par ex a chaque foi je clique sur boutton ya l'affichage de l'id
    button.addEventListener("click", (e) => {
      const btnId = e.target.id; //a chaque clique en à une inf qui nous donne l'id de cat

      //maintenant je vaux que a chaqque click avant de genere des autre image je veux qu'il me les supprime avant de me donner des nouvelle resultat
      //sa veux dire actualiser la gallerie  je dit a ma gallery de temettre a 0 donne 0 resultat
      gallery.innerHTML = "";
      //la je vais faire un conditions si mon id et défferent de 0
      if (btnId !== "0") {
        const tryCategory = workss.filter((work) => {
          return work.categoryId == btnId;
        });
        tryCategory.forEach((work) => {
          createWork(work);
        });
      } else {
        displayWorks();
      }
      console.log(btnId);
    });
  });
}
filterCategory();
editMode();

const btnOpen = document.querySelector('.btnOpen')
//Gestion des évènements pour ouverture modale 1
btnOpen.addEventListener ('click', openModal);