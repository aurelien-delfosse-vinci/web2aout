interface FooterProps {
    children: React.ReactElement;
    image:string;
}

const Footer = (props:FooterProps) => {
    return(
        <div>
            <img src={props.image} alt="" width="50"/>
            <div>{props.children}</div>
        </div>
    )
}

export default Footer;