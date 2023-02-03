import "../style.css";

const BoxContainer = (props:any)=> {
    const classes = 'boxContainer ' + props.className;
    return <div className={classes}>{props.children}</div>
}

export default BoxContainer;