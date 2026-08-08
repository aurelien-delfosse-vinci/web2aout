
interface HeaderProps {
    children: React.ReactNode;
    image:string;
    theme: "light" | "dark"
    onThemeChange: () => void;
}

const Header = ({image, children, theme, onThemeChange}:HeaderProps) => {
    
    return(
        <header style={{backgroundColor: theme === "light" ? "#eeeeee" : "#222222", 
            color: theme === "light" ? "#222222" : "#ffffff", 
            padding: "20px",
        }}>
            <img src={image} alt="" width="50"/>
            <div>{children}</div>
            <button onClick={onThemeChange}>{theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
        </header>
    )
};

export default Header;