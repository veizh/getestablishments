//import { ClipboardCopy } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../App";


function Home() {
    const [latitude, setLatitude] = useState('49.033852');
    const [longitude, setLongitude] = useState('2.064863');
    const [rayon, setRayon] = useState('500');
    let context = useContext(Ctx)
    let Navigate = useNavigate()
    let [arrayPlaces,setArrayPlaces]=useState()
    let dialog=useRef()
    const handleLatitudeChange = (event) => {
      setLatitude(event.target.value);
    };
    const handleRayonChange = (event) => {
      setRayon(event.target.value);
    };
  
    const handleLongitudeChange = (event) => {
      setLongitude(event.target.value);
    };
  
    const handleClick =async  () => {
      // Ici, vous pouvez ajouter la logique pour traiter les données de latitude et de longitude
      // par exemple, en les envoyant à un composant parent ou en effectuant une action spécifique
      const API_KEY = 'AIzaSyD_PRCcTMJ09cWAcrJ-u6RwSMo7dm1-USY';
  
      // Données de la requête
      const requestData = {
        includedTypes: ["bar"],
        maxResultCount: 20,
        "rankPreference":"distance",
        locationRestriction: {
          circle: {
            center: {
              latitude: latitude,
              longitude:  longitude
            },
            radius: rayon
          }
        }
      };
      
      // URL de l'endpoint de recherche de l'API Google Places
      const endpoint = 'https://places.googleapis.com/v1/places:searchNearby';
      
      // En-têtes de la requête
      const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.regularOpeningHours,places.displayName,places.servesBeer,places.goodForWatchingSports,places.servesVegetarianFood,places.servesCocktails,places.outdoorSeating,places.rating,places.formattedAddress,places.nationalPhoneNumber,places.priceLevel'
      };
      
      // Configuration de la requête
      const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
      };
      // Effectuer la requête
     
       let tmp =await  fetch(endpoint, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          return response.json();
        })
        .then(data => {
          // Traiter la réponse JSON
          return data
          // Insérer ici le code pour traiter et afficher les résultats
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
        setArrayPlaces(tmp)
       
        dialog.current&&dialog.current.showModal()
    };
   useEffect(()=>{
    if(arrayPlaces&&arrayPlaces.places.length>0){
      context[1](arrayPlaces.places)
      Navigate("/push")
    }
   },[arrayPlaces])
    return (
      <>
      <div className='bigcontainer'>
        <h1>Récuperer les restaurants autour d'un point</h1>
        <div className="containerform">
  
        <div className='sub'>
          <p>
            Latitude:
            
          </p>
          <input
              type="text"
              value={latitude}
              onChange={handleLatitudeChange}
              />
        </div>
        <div className='sub'>
         <p>Longitude</p>
          <input
              type="text"
              value={longitude}
              onChange={handleLongitudeChange}
              />
        </div>
        <div className='sub'>
        <p>Rayon</p>
          <input
              type="number"
              value={rayon}
              onChange={handleRayonChange}
              />
        </div>
        </div>
              
        <button onClick={handleClick}>Collecte Moi Ca</button>
      </div>
      </>
  
    );}
    export default Home