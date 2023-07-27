import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageCard from '../components/ImageCard/ImageCard';
import SearchBox from '../components/SeachBox/SearchBox';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';
import NotFound from '../components/NotFoundIcon/NotFound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faClose,faCopy,faShareAlt, faStar} from '@fortawesome/free-solid-svg-icons';
import styling from './SearchPage.module.css';
import Modal from 'react-modal';
import ImageModal from '../components/ImageModal/ImageModal';
import Paragraph from '../components/Paragraph/Paragraph';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const rootUrl = 'https://imagesage.onrender.com';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth:'85vw',
      height:'75vh',
      maxHeight:'max-content',
      borderRadius:'8px'
    },
};

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(500);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink,setShareLink] = useState(null);
  const location = useLocation();
  let orginalquery = new URLSearchParams(location.search).get('q');
  let query = orginalquery.replace(/\s+/g, '+').trim();
  const [acessToken, setAccessToken] = useState(null);
  const { isAuthenticated, getAccessTokenSilently, user} = useAuth0();
  const [isfavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    // Function to fetch search results from Pixabay API
    const fetchSearchResults = async (query, page) => {
      try {
        const response = await axios.get(`${rootUrl}?query=${query}&page=${page}`);
        const data = response.data;
        setResults(data.hits);
        setTotalResults(data.totalHits);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    // Fetch search results when the component mounts or when the query changes
    const fetchAnimation = () => setLoading(true);
    fetchSearchResults(query, page);
    fetchAnimation();
  }, [query, page]);

  const handlePrevClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      setLoading(true);
    }
  }

  const handleNextClick = () => {
    if (page < totalResults / 20) {
      setPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  }

  const handleImageClick = (result)=>{
    setSelectedImage(result);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
    setShareLink(null);
    setIsFavorite(false);
  }

  const handleShare=(link)=>{
    setShareLink(link);
  }
  const handleCopy = ()=>{
    if(navigator.clipboard){
        navigator.clipboard.writeText(shareLink).then(()=>{
            setShareLink(null);
        }).catch((error)=>{
            alert('Error in Copying !');
        })
    }
    else{
        alert('Copying not supported in your Browser. Please copy manually.');
    }

  }

  useEffect(() => {
    const getToken = async () => {
      const domain = "dev-jq0f41r6txfpceni.us.auth0.com";
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });  
        setAccessToken(accessToken);
      } catch (e) {
        console.log(`Error from getToken : ${e.message}`);
      }
    };  
    getToken();
  }, [getAccessTokenSilently]);



  useEffect(()=>{
    const checkFav = async (id) =>{
      const data = {imageId : id,email : user?.email};
      if(isAuthenticated && acessToken){
        try {
          const findImage = await axios.post(`${rootUrl}/checkfav`,data,{
            headers:{
              Authorization: `Bearer ${acessToken}`
            }
          });
          console.log(findImage);
          if(findImage !== "User Not Found"){
            setIsFavorite(findImage);
          }
        }
        catch(error){
          console.log(error);
        }
      }
    }
    selectedImage && checkFav(selectedImage.id);
  },[selectedImage, isAuthenticated, acessToken,user?.email]);

  const handleFavorite = async (id)=>{
    try{
      const data = {imageId : id,email : user?.email};
      const response = await axios.post(`${rootUrl}/favorites`,data,{
        headers:{
          Authorization: `Bearer ${acessToken}`
        }
      });
      console.log(response);
      setIsFavorite(true);
    }
      catch (error) {
        alert(`Error from Favorite Btn : ${error.message}`);
      }
    }
  return (
    <div>
      <SearchBox />
      {results.length > 0 && 
        <Paragraph heading={`Your search results for : "${orginalquery}" 👇`} color='#fff' size='2rem'/>
      }
      <div
        className={styling["image-container"]}
        style={{ backgroundColor: loading ? "transparent" : "#fff" }}
      >
        {!loading ? (
          results.length > 0 ? (
            results.map((result) => (
                <button className={styling['image-btn']}                         onClick={() => {
                    handleImageClick(result);
                    }}>
                    <ImageCard
                        webformatURL={result.webformatURL}
                        query={orginalquery}
                        tags={result.tags}
                        key={result.id}
                    />
                </button>

            ))
          ) : (
            <NotFound />
          )
        ) : (
          <LoadingAnimation />
        )}
      </div>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel='Image Info'
            style={customStyles}
            >   
            {selectedImage &&
            <>  
            {/* Div that holds close button, share button and favorite button. */}
            <div className={styling.closeShareBtnDiv}>
                <button onClick={handleCloseModal} className={styling.closebtn}><FontAwesomeIcon icon={faClose}/></button>
                <button onClick={()=>{handleFavorite(selectedImage.id)}} className={styling.favbtn}><FontAwesomeIcon icon={faStar} style={{color:isfavorite ? '#f09d05' : 'black'}}/></button>
                <button onClick={()=>handleShare(selectedImage.pageURL)} className={styling.sharebtn}><FontAwesomeIcon icon={faShareAlt}></FontAwesomeIcon></button>
            </div>
                {shareLink !== null && 
                    <div className={styling.shareDiv}>
                        <p>{shareLink}</p>
                        <button className={styling.copybtn} onClick={handleCopy}><FontAwesomeIcon icon={faCopy} style={{color:'#1dbebe'}}></FontAwesomeIcon></button>
                    </div>
                }
                <div>
                    <ImageModal result={selectedImage} token={acessToken}/>
                </ div>
            </>
            }            
        </Modal>
      <div
        className={styling.buttonsDiv}
        style={{ display: results.length === 0 && loading ? "none" : "flex" }}
      >
        <button
          className={styling.prevBtn}
          onClick={handlePrevClick}
          style={{
            opacity: page === 1 ? "0.3" : "1",
            pointerEvents: page === 1 ? "none" : "all",
          }}
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} className={styling.arrowicon} />
        </button>
        <button
          className={styling.nextBtn}
          onClick={handleNextClick}
          style={{
            opacity: page === totalResults / 20 ? "0.3" : "1",
            pointerEvents: page === totalResults / 20 ? "none" : "all",
          }}
        >
            <FontAwesomeIcon icon={faCircleArrowRight} className={styling.arrowicon} />
        </button>
      </div>
    </div>
  );
};

export default SearchPage;