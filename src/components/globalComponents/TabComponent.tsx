export default function TabComponent (props: any) {
    const classes = 'tabComponent ' + props.className;
    return <div className={classes}>{props.children}</div>
}