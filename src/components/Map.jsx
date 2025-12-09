import { useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
// Uklanjamo useNavigate, jer se ne koristi
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; 
// Uklanjamo useState i useEffect, jer je logika pozicije prebačena
import { useCities } from "../contexts/CitiesContext.jsx";
import { useGeolocation } from '../hooks/useGeolocation.js';
import Button from './Button.jsx';
import { useEffect } from 'react';

// ----------------------------------------------------
// Pomoćna komponenta za promenu centra mape ostaje ista
// ----------------------------------------------------
function ChangeCenter({ position }) {
    const map = useMap(); 
    map.setView(position, map.getZoom()); 
    return null; 
}
// ----------------------------------------------------


function Map() {
    // 1. Čitanje URL parametara
    const [searchParams] = useSearchParams();
    
    // 2. Destrukturisanje Contexta (uključujući isLoading, iako se ne koristi)
    const { cities } = useCities(); 
    
    // 3. Derived State: Pozicija mape se izračunava direktno
    const mapLat = searchParams.get('lat');
    const mapLng = searchParams.get('lng');
    
    // Koristimo izračunatu poziciju. Ako nema lat/lng, koristimo default [40, 0].
    const mapPosition = mapLat && mapLng ? [Number(mapLat), Number(mapLng)] : [40, 0];

    const {isLoading: isLoadingPosition, position: geoLocationPosition, getPosition} = useGeolocation(); 

    useEffect(function(){
        if(geoLocationPosition.lat && geoLocationPosition.lng){
            // Ažuriramo URL parametre bez osvežavanja stranice
            const params = new URLSearchParams(searchParams);   
            params.set('lat', geoLocationPosition.lat);
            params.set('lng', geoLocationPosition.lng);
            window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        }
    },
    [geoLocationPosition]);

    return (
        <div className={styles.mapContainer}>
            <Button type='position' onClick={getPosition}>
                {isLoadingPosition ? 'Loading...' : 'Use My Location'}
            </Button>
            <MapContainer 
                center={mapPosition} 
                zoom={13} 
                scrollWheelZoom={true} 
                className={styles.map} 
            > 
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Iteriranje kroz sve gradove i postavljanje markera */}
                { cities.map((city) => (
                    <Marker 
                        position={[city.position.lat, city.position.lng]} 
                        key={city.id}
                    > 
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                
                {/* Dinamičko centriranje */}
                <ChangeCenter position={mapPosition} />

            </MapContainer>
        </div>
    );
}

export default Map;