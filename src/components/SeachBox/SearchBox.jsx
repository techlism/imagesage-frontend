import { useState } from 'react';
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useNavigate} from 'react-router-dom';
import styling from './SearchBox.Module.css';

const SearchBox = ()=>{
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
   
    const handleSubmit = (event)=>{
        event.preventDefault();
        navigate(`/search-results?q=${query}`);
    }
    return(
        <div className='search-main-div'>
            <FontAwesomeIcon icon={faSearch} className='search-icon'/>
            <form onSubmit={handleSubmit} className='form'>
                <input type="text"  id='search-query' name='search-query' placeholder='Search' onChange={(event)=>setQuery(event.target.value)} maxLength='100' required='required' />
                <button type='submit'>Go!</button>
            </form>
        </div>
    )
}
export default SearchBox;