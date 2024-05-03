
/*export function editOR() {
    const userEdit = window.localStorage.getItem('token');
    console.log( "monconsolelog",userEdit );
    
    if (userEdit) { // Vérifie si un jeton est présent dans le stockage local
        const headBar = document.querySelector('.HeadBar');
        headBar.style.display = 'flex'; // Affiche la barre d'en-tête
        
    }
  }*/

export function editMode(){
    //modif bar edit html/css
    const adminconnecter = window.localStorage.getItem('token');
    if(adminconnecter){
        //afficher barre editor
        const headBar = document.querySelector('.HeadBar');
        //headBar.style.display = 'flex';
        headBar.classList.add("active");

        //Suppression filtres
        const filter = document.querySelector('.container-filtres');
        filter.style.display = "none";
        
        //Changement text login en logout
        const logOut = document.getElementById('logout');
        logOut.innerText ="logout";
        logOut.href = ""

}
}
