import { useContext, useEffect, useRef, useState } from "react"
import { Ctx } from "../App"
import { Trash2 } from 'lucide-react';
import { createNotification } from "../utils/generateNotification";


const AddBdd = ()=>{
    let context = useContext(Ctx)
    let places = context[0]
    let dialog = useRef()
    let notif=useRef()
    let [currentElement,setCurrentElement]=useState()
    let [urlImg,setUrlImg]=useState()
    useEffect(()=>{
        console.log(places);
    },[places])
    useEffect(()=>{
        currentElement&&dialog.current.showModal()
    },[currentElement])
    function addBDD(){
        let tmp = currentElement
        tmp.urlImg= urlImg
        console.log(tmp);
        
        let objectToPush ={}
        objectToPush.name=tmp.displayName.text
        objectToPush.address=tmp.formattedAddress
        objectToPush.rating=tmp.rating
        objectToPush.urlImg=tmp.urlImg
        objectToPush.servesBeer=tmp.servesBeer
        objectToPush.servesCocktails=tmp.servesCocktails
        objectToPush.servesVegetarianFood=tmp.servesVegetarianFood
        objectToPush.phoneNumber=tmp.nationalPhoneNumber
        objectToPush.goodForWatchingSports=tmp.goodForWatchingSports
        objectToPush.priceLevel=tmp.priceLevel
        console.log(objectToPush);

        const requestOptions = {
            method: 'POST', 
            headers: {
              'Content-Type':'application/json' },
            body: JSON.stringify(objectToPush) // Convertir les données en JSON pour les envoyer au serveur
          };
          
          

          fetch('https://bars-back-end.vercel.app/bar/pushone', requestOptions)
            .then(response => {
              if (!response.ok) {
                throw new Error('Erreur lors de la requête');
              }
              return response.json(); // Renvoie la réponse au format JSON
            })
            .then(data => {
              console.log('Objet créé avec succès:', data);
              createNotification(200,notif.current,"green")

              // Faire quelque chose avec la réponse, si nécessaire
            })
            .catch(error => {
              console.error('Erreur:', error);
              createNotification(400,notif.current,"red")
              // Gérer les erreurs, par exemple, afficher un message à l'utilisateur
            })


        places.splice(currentElement.index,1)
        dialog.current.close()
        setCurrentElement()
        
    }
    return(
        <>
        <div className="notif__container" ref={notif}>

        </div>
        <dialog autoFocus  ref={dialog}>
        <input  onChange={(e)=>setUrlImg(e.target.value)} type="text" placeholder="url de l'image..." />
        <button onClick={()=>addBDD()}>Ajoutez à la base de donnée</button>
        <button onClick={()=>{
        setCurrentElement()
            
            dialog.current.close()}}>Annuler</button>
        </dialog>
        <div className="main__container__push">
            <p>Il y'a {places&&places.length} établissement dans la zone séléctionée.</p>
            <ul>
                { places.length>0&&places.map((e,i)=><li onClick={(event)=>{

                    let tmp = e
                    tmp.index=i
                    setCurrentElement(tmp)
                }
                    
                    } key={i}><p >{e.displayName.text} </p><Trash2 onClick={()=>{
                        
                        places.splice(i,1)
                        setTimeout(() => {
                            createNotification("deleted",notif.current,"orange")
                            
                            dialog.current.close()
                        }, 25);
                        } } /></li>)}
            </ul>
        </div>
        </>
    )
}
export default AddBdd