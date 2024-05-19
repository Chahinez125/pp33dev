import { editMode } from "./editor.js";
import { openModal } from "./editor.js";
import {generateWork}from "./editor.js"
import { closeModal } from "./editor.js";
import {openModal2} from "./editor.js";
import { closeModal2 } from "./editor.js";
import {chooseaPhoto} from "./editor.js";
import { NewFile } from "./editor.js";
import { returnModal1 } from "./editor.js";

// je récupere les travaux depui le backend

const gallery = document.querySelector(".gallery");
const containerFiltres = document.querySelector(".container-filtres");

 export async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");

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

/*** afficher les bouttons par catégories */
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
  
  const workss = await getWorks();
  console.log(workss);
  const buttons = document.querySelectorAll(".container-filtres button");
  buttons.forEach((button) => {

    button.addEventListener("click", (e) => {
      const btnId = e.target.id;
      gallery.innerHTML = "";
      buttons.forEach((btn) => {
        btn.classList.remove('active-button');
      });
      button.classList.add('active-button');
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
const btnClose = document.querySelector('.btnClose')
const overlay = document.querySelector('.overlay')
const btnAdd = document.querySelector('.btnAddmodale')
const btnClose2 = document.querySelector('.btnClose2')
const arrwReturn = document.querySelector('.arrowReturn')
//Gestion des évènements pour ouverture modale 1
btnOpen.addEventListener ('click', openModal);


//Ajout des works dans modale
generateWork();


btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

btnAdd.addEventListener('click', openModal2);

btnClose2.addEventListener('click', closeModal2)
overlay.addEventListener('click', closeModal2);

arrwReturn.addEventListener('click', returnModal1)

// Ajout de la partie catégorie de la modale en JS
async function createOptionCat () {

  const category = await getCategory();
  //Récupération des categories
  const optionCategory = document.getElementById('category')
  optionCategory.innerHTML ='';
 
  const Option = document.createElement ('option');
  Option.value = '';
  Option.textContent = '';
  optionCategory.appendChild(Option);
 
  category.forEach (function(category){
      const option = document.createElement ('option');
      option.value = category.id;
      option.textContent = category.name
      optionCategory.appendChild(option);
  })
}

//Fonction pour vérifier si tous les champs sont remplis
function checkALLfields() {
  const photoForm = document.getElementById('fileInput').value.trim();
  const titleForm = document.getElementById('title').value.trim();
  const categoryForm = document.getElementById('category').value.trim();
  return photoForm !== "" && titleForm !== "" && categoryForm !== "";
}

function updateValidationBtn() {
  const validateBtn = document.querySelector('.btnValidatePic');
  validateBtn.disabled = !checkALLfields();
  // Changer le style du bouton en fonction de son état
  if (validateBtn.disabled) {
      validateBtn.style.background = "#A7A7A7";
      validateBtn.style.cursor = "default";
  } else {
      validateBtn.style.background = "#1D6154";
      validateBtn.style.cursor = "pointer";
  }
}
// Ajouter des écouteurs d'événements pour chaque champ de formulaire
document.getElementById('fileInput').addEventListener('input', updateValidationBtn);
document.getElementById('title').addEventListener('input', updateValidationBtn);
document.getElementById('category').addEventListener('input', updateValidationBtn);


updateValidationBtn();


createOptionCat();

chooseaPhoto();

NewFile();