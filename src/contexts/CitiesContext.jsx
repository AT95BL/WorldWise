import { createContext } from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

function CitiesProvider({ children }) {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(function(){
        async function fetchCities(){
        setIsLoading(true);
        try{
            const response = await fetch(`${BASE_URL}/cities`);
            const data = await response.json();
            setCities(data);
        }catch(error){
            console.error('Error fetching cities data:', error);
        }finally{
            setIsLoading(false);
        }
        }
        fetchCities();
    }, []);

    async function getCityById(id){
        try{
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            setCurrentCity(data);
        }catch(error){
            console.error('Error fetching cities data:', error);
        }finally{
            setIsLoading(false);
        }
    }

  return (
    <CitiesContext.Provider 
        value={{
             cities, 
             isLoading,
             currentCity, 
             getCityById,
        }}>  
        {children}  
    </CitiesContext.Provider>
    );
}

function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined){
        throw new Error('useCities must be used within a CitiesProvider');
    }
    return context;
}

export {CitiesContext, useCities, CitiesProvider};