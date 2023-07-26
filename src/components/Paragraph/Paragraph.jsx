import styling from './Paragraph.module.css';
const Paragraph = (props) =>{
    return(
        <h1 className={styling.h1} style={{fontSize:props.size , color:props.color}}>{props.heading}</h1>
    )
}
export default Paragraph;