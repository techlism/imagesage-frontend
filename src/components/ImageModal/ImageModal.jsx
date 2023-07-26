import { faDownload } from '@fortawesome/free-solid-svg-icons';
import styling from './ImageModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tags from '../ImageCard/Tags';
import TitleDesc from './TitleDesc.jsx';
const ImageModal = (props)=>{
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
                <div><h1>Download Links</h1></div>
                <div className={styling.downloadLinks}>                        
                    <a href={props.result.largeImageURL} download={'image.jpeg'} target='blank'>Big <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></a>
                    <a href={props.result.largeImageURL} download={'image.jpeg'} target='blank'>Medium <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></a>
                    <a href={props.result.largeImageURL} download={'image.jpeg'} target='blank'>Original <FontAwesomeIcon icon={faDownload} className={styling.downloadIcon}/></a>
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