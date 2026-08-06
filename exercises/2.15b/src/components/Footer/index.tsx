interface FooterProps {
    children: React.ReactNode;
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