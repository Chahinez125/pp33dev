
function editOR() {
    const userEdit = window.localStorage.getItem('token');
    if (userEdit) { // Vérifie si un jeton est présent dans le stockage local
        const headBar = document.querySelector('.HeadBar');
        headBar.style.display = 'flex'; // Affiche la barre d'en-tête
        
    }
  }

  
