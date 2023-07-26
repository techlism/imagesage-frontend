import './ImageCard.css';
import Tags from './Tags.jsx';
const ImageCard = (props) =>{
    return(
            <div className="image-card">
                <img src={props.webformatURL} alt={props.query} className="image-card-image"/>
                <div className="image-card-tags">
                    {props.tags.split(", ").map((tagProp)=><Tags tag={tagProp}/>)}
                </div>
            </div>

    )

}
export default ImageCard;