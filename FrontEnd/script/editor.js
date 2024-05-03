
function editOR() {
    const headBar = window.localStorage.getItem('token');
    if (headBar) { // Vérifie si un jeton est présent dans le stockage local
        const headBar = document.querySelector('.HeadBar');
        headBar.style.display = 'flex'; // Affiche la barre d'en-tête
        
    }
  }

  
