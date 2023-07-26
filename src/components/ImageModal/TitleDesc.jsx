import './TitleDesc.css';
const TitleDesc = (props)=>{
    return(
        <div className='title-desc'>
            <h3>
                {props.heading}
            </h3>
            <h2>
                {props.desc}
            </h2>
        </div>
    )
}
export default TitleDesc;