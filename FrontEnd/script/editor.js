

export function editMode(){
    //modif bar edit html/css
    const adminconnecter = window.localStorage.getItem('token');
    if(adminconnecter){
        //afficher barre editor
        const headBar = document.querySelector('.HeadBar');
        headBar.style.display = 'flex';
        headBar.classList.add("active");

        //Suppression filtres
        const filter = document.querySelector('.container-filtres');
        filter.style.display = "none";
        //Ajout bouton modifier
        const btnOpen = document.querySelector('.btnOpen');
        btnOpen.classList.remove("hidden")


        //Changement text login en logout
        const logOut = document.getElementById('logout');
        logOut.innerText ="logout";
        logOut.href = ""
    }
         //Création de la fonction Logout
    const logOutLink = document.getElementById('logout');

    logOutLink.addEventListener('click', logout);
    //Lancement de la fonction logout avec redirection sur l'index.HTML et suppresion du Token
    function logout (){
        window.localStorage.removeItem('token')
        location.reload("index.html");
    }

}


//Fonction ouverture modale 1 et ajout de l'overlay
const overlay = document.querySelector('.overlay')
const modalContainer = document.querySelector('.modal-container')

export const openModal = function () {
    overlay.classList.remove('hidden')
    modalContainer.classList.remove('hidden')
    modalContainer.setAttribute('display', 'flex')
}