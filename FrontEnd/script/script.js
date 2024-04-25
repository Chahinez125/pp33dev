// je récupere les travaux depui le backend 


//déclare une variable
const gallery = document.querySelector(".gallery")


//fonction qui va recupérer mes travaux getWork j'ai async pr lui dire atten dans cette fontion tu dois attens avant de lire mon code 
//await sa veux tu attend que le fetch dois finit avant que tu l'enregistre dans response
async function getWorks(){
    const response = await fetch("http://localhost:5678/api/works")
    //a chaque foi j'appel getWork je veux quelle me retur await.json notre tableau
    return await response.json();

}

getWorks();
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