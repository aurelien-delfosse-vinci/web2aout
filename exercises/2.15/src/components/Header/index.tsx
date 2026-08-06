interface HeaderProps {
    children: React.ReactNode;
    image:string;
}

const Header = (props:HeaderProps) => {
    return(
        <div>
            <img src={props.image} alt="" width="50"/>
            <div>{props.children}</div>
        </div>
    )
};

export default Header;