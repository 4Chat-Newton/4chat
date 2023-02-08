const TabComponent = (props: any) => {
    const classes = 'tabComponent ' + props.className;
    return <div className={classes}>{props.children}</div>
}

export default TabComponent;