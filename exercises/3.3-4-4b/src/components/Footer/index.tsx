interface FooterProps {
    children: React.ReactNode;
    image:string;
    theme: "light" | "dark";
}

const Footer = ({image, children, theme}:FooterProps) => {
    return(
        <footer style={{
            backgroundColor: theme === "light" ? "#eeeeee" : "#222222",
            color: theme === "light" ? "#222222" : "#ffffff",
            padding: "20px"
        }}>
            <img src={image} alt="" width="50"/>
            <div>{children}</div>
        </footer>
    )
}

export default Footer;