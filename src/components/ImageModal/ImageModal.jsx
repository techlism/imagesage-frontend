import { faDownload } from '@fortawesome/free-solid-svg-icons';
import styling from './ImageModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tags from '../ImageCard/Tags';
import TitleDesc from './TitleDesc.jsx';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
// import { useEffect } from 'react';

const ImageModal = (props)=>{
    const {isAuthenticated, user} = useAuth0();
    const rootUrl = 'https://imagesage.onrender.com';
    // useEffect(()=>{
    //   console.log(props)
    // },[props]);
    
    const handleDownloads = async (id,hrefUrl)=>{
      // console.log(hrefUrl);
      if (hrefUrl) {
        // Open the link in a new tab/window after a short delay
        setTimeout(() => {
          window.open(hrefUrl);
        }, 150);
      }        
      if(isAuthenticated && props.token){
          const data = {imageId : id,email : user?.email};
          try {
            const response = await axios.post(`${rootUrl}/downloads`,data,{
              headers:{
                Authorization: `Bearer ${props.token}`
              }
            });
            console.log(response);
            
          } 
          catch (error) {
            alert(`Error in Download button : ${error.message}`);
          }
        }       
      }
      

    return(
        <div className={styling.modal}>
            <div className={styling['image-preview']}>
                <img src={props.result.webformatURL} alt={props.result.tags} />
            </div>
            <div className={styling.mainInfoDiv}>
                <h1>Image Info</h1>
            <div className={styling.info}>
                    <TitleDesc heading={"User"} desc={props.result.user} />
                    <TitleDesc heading={"UserID"} desc={props.result.user_id} />
                    <TitleDesc heading={"Type"} desc={props.result.type.toUpperCase()} />
                    <TitleDesc heading={"Views"} desc={props.result.views} />
                    <TitleDesc heading={"Downloads"} desc={props.result.downloads} />
                    <TitleDesc heading={"Likes"} desc={props.result.likes} />
            </div>
                {/* <div><h1>Download Links</h1></div> */}
                <div className={styling.downloadLinks}>
                    <button onClick={()=>handleDownloads(props.result.id,props.result.largeImageURL)}>Download <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></button>                        
                    {/* <button onClick={()=>handleDownloads(props.result.id,props.result.fullHDURL)}>Medium <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></button>                        
                    <button onClick={()=>handleDownloads(props.result.id,props.result.imageURL)}>Original <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></button>                         */}

                    {/* <a href={props.result.largeImageURL} download={'image.jpeg'} target='blank' onClick={()=>handleDownloads(props.result.id)}>Big <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></a> */}

                    {/* <a href={props.result.largeImageURL} download={'image.jpeg'} target='blank'>Medium <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></a>
                    <a href={props.result.largeImageURL} download={'image.jpeg'} target='blank'>Original <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></a> */}
                </div>                                      
            </div>
            <>
                <div className="image-card-tags">
                    <h3 style={{color:'#1dbede',fontSize:'0.8rem'}}>Tags: </h3>
                        {props.result.tags.split(", ").map((tagProp)=><Tags tag={tagProp}/>)}
                </div>
            </>
        </div>
    )
}
export default ImageModal;