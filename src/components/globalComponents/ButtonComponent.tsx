const ButtonComponent = (props: any) => {
    const classes = 'buttonComponent ' + props.className;
    return <button className={classes}>{props.children}</button>
}

export default ButtonComponent;