
exports.createNotification =(status, parent,color)=>{
    let newNotification = document.createElement('div')
    newNotification.style.backgroundColor=color

    let notif = document.createElement("p")
    switch (status) {
        case 200:
            notif.innerText="Ajouté a la bdd avec succés ! "
            break;
        case 400:
            notif.innerText="ERREUR LORS DE L'AJOUT A LA BDD ! "
            break;
        case "deleted":
            notif.innerText="Bar Supprimé de l'interface => pas d'intéraction avec la bdd ! "
            break;
    
        default:
            break;
    }
    newNotification.appendChild(notif)
    parent.appendChild(newNotification)
    setTimeout(() => {
        newNotification.remove()
    }, 6000);
}