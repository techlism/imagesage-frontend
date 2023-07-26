import { faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styling from './LoadingAnimation.module.css';
const LoadingAnimation  = ()=>{
    return(
        <div className={styling.loadingdiv}>
            <FontAwesomeIcon icon={faCircleNotch} spin  className={styling.loading}/>  
        </div>
  
    )
}
export default LoadingAnimation;