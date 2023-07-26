import Paragraph from '../components/Paragraph/Paragraph.jsx'
import SearchBox from '../components/SeachBox/SearchBox.jsx'
// import dotenv from 'dotenv';
// import { useState } from 'react';
// dotenv.config();
const HomePage = ()=>{   
    return(
        <>
        <Paragraph size={"3rem"} heading={"Discover over 2,000,000 free Stock images"} color="white"/>
        <SearchBox/>
        </>

    )
}
export default HomePage;