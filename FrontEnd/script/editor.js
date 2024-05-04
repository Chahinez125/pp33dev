
/*export function editOR() {
    const userEdit = window.localStorage.getItem('token');
    console.log( "monconsolelog",userEdit );
/*function editOR() {
    const userEdit = window.localStorage.getItem('token');

    if (userEdit) { // Vérifie si un jeton est présent dans le stockage local
        const headBar = document.querySelector('.HeadBar');
        headBar.style.display = 'flex'; // Affiche la barre d'en-tête
        
    }
  }*/
 /* fonction  d'exportation editMode ( ) {
    // barre de modification édite html/css
    const  adminconnecter  =  fenêtre . stockage local . getItem ( 'jeton' ) ;
    if ( connecteur administrateur ) {
        //afficher l'éditeur de barre
        const  headBar  =  document . querySelector ( '.HeadBar' ) ;
        barre de tête . style . affichage  =  'flex' ;
        barre de tête . liste de classes . ajouter ( "actif" ) ;

        //Filtres de suppression
        const  filtre  =  document . querySelector ( '.container-filtres' ) ;
        filtrer . style . display  =  "aucun" ;

        // Modification du texte de connexion et de déconnexion
        const  logOut  =  document . getElementById ( 'déconnexion' ) ;
        Se déconnecter . innerText  = "déconnexion" ;
        Se déconnecter . href  =  ""

}
}*/
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

        //Changement text login en logout
        const logOut = document.getElementById('logout');
        logOut.innerText ="logout";
        logOut.href = ""

         //Création de la fonction Logout
    const logOutLink = document.getElementById('logout');

    logOutLink.addEventListener('click', logout);
    //Lancement de la fonction logout avec redirection sur l'index.HTML et suppresion du Token
    function logout (){
        window.localStorage.removeItem('token')
        location.reload("index.html");
    }
}
}
