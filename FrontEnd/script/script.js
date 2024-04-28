// je récupere les travaux depui le backend 
//déclare une variable
const gallery = document.querySelector(".gallery")
const container = document.querySelector(".container-filtres")


//fonction qui va recupérer mes travaux getWork j'ai async pr lui dire atten dans cette fontion tu dois attens avant de lire mon code 
//await sa veux tu attend que le fetch dois finit avant que tu l'enregistre dans response
async function getWorks(){
    const response = await fetch("http://localhost:5678/api/works")
    //a chaque foi j'appel getWork je veux quelle me retur await.json dans notre tableau
    return await response.json();

}

getWorks();
/*Récupere le tableaux de gatégorie***/
async function getCategory(){
    const response = await fetch("http://localhost:5678/api/categories")
    return await response.json();
    
    }
     getCategory();
//affichage des works dans le dom
async function updatWorks(){
    //j'enregitre 
    const arrayWorks = await getWorks();
    arrayWorks.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figure");
img.src = work.imageUrl;
figcaption.textContent = work.title;
        figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure); 
    });
}
updatWorks();

/***cette function pour afficher les bouttons par catégories */ 
//récuperer le tableau des Cat
async function displayCategoriesBouttons(){
    const catégorys = await getCategory();
    console.log(catégorys);catégorys.forEach(catégory => { //crée une varible pr appeler btn
        const btn = document.createElement("button");
        btn.textContent= catégory.name;
        btn.id = catégory.id;
        container.appendChild(btn);

    });


}
displayCategoriesBouttons();