import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import ImageCard from '../components/ImageCard/ImageCard';
import LoadingAnimation from '../components/LoadingAnimation/LoadingAnimation';
import Paragraph from '../components/Paragraph/Paragraph';
const rootUrl ='https://imagesage.onrender.com';
const DashboardPage = () => {
  const { getAccessTokenSilently,user } = useAuth0();
  const [favoriteImages, setFavoriteImages] = useState([]);
  const [downloadImages, setDownloadImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteImages = async () => {
      try {
        // Fetch the user's access token
        const accessToken = await getAccessTokenSilently();
  
        // Fetch favorite image IDs from the backend API
        const response = await axios.get(`${rootUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            email: user?.email,
          },
        });
        const favoriteImageIds = response.data.favorites;
        console.log(favoriteImageIds);
  
        // Fetch image details for each favorite image ID
        const favoriteImageResponses = await Promise.all(
          favoriteImageIds.map(async (id) => await axios.get(`${rootUrl}/images/${id}`))
        );
        const favoriteImagesData = favoriteImageResponses.map((response) => response.data);
  
        setFavoriteImages(favoriteImagesData);
      } catch (error) {
        console.error('Error fetching favorite images:', error.message);
      }
    };
  
    const fetchDownloadImages = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        // Fetch download image IDs from the backend API
        const response = await axios.get(`${rootUrl}/downloads`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            email: user?.email,
          },
        });
        const downloadImageIds = response.data.downloads;
        console.log(downloadImageIds);
        // Fetch image details for each download image ID
        const downloadImagePromises = downloadImageIds.map(async (id) =>
          await axios.get(`${rootUrl}/images/${id}`)
        );
        const downloadImageResponses = await Promise.all(downloadImagePromises);
        const downloadImagesData = downloadImageResponses.map((response) => response.data);
  
        setDownloadImages(downloadImagesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching download images:', error);
      }
    };
    fetchDownloadImages();
    fetchFavoriteImages();
  },[getAccessTokenSilently,user?.email]);
  
  return (
    <div style={{backgroundColor: loading ? 'transparent' :'#fff'}}>
      {loading ? <LoadingAnimation/> : <>
      <Paragraph size={'2.2rem'} heading={"Your Favorites"} color={'black'}/>
      <div>
        {favoriteImages.map((image) => (
          <ImageCard
            key={image.id}
            webformatURL={image.webformatURL}
            query={image.query}
            tags={image.tags}
          />
        ))}
      </div>

      <Paragraph size={'2.2rem'} heading={"Your Downloads"} color={'black'}/>

      <div>
        {downloadImages.map((image) => (
          <ImageCard
            key={image.id}
            webformatURL={image.webformatURL}
            query={image.query}
            tags={image.tags}
          />
        ))}
      </div>    
      </>}

    </div> 
  );
};

export default DashboardPage;
