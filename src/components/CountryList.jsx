import styles from './CountryList.module.css'
import Spinner from './Spinner.jsx';
import CountryItem from './CountryItem.jsx'; // 👈 FIXED Naming
import Message from './Message.jsx';
import { useCities } from "../contexts/CitiesContext.jsx";

function CountryList() {
    const {cities, isLoading} = useCities();

    if(isLoading){
        return <Spinner/>
    }

    // 👈 FIXED: Calculate countries BEFORE using it
    const countries = cities.reduce((acc, city) => 
        {
            const isAlreadyAdded = acc.some(el => el.countryName === city.country);
            
            if(!isAlreadyAdded){
                return [...acc, {countryName: city.country, emoji: city.emoji, id: city.id}];
            }
            return acc;   
        },[]);

    // 👈 FIXED: Check length AFTER calculation
    if(countries.length === 0){
        return <Message message='Add your first country by clicking on a country on the map'/>
    }

    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem country={country} key={country.id} />)} 
        </ul>
    )
}

export default CountryList