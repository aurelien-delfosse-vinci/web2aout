import './UserCard.css'

interface UserCardProps {
    name:string;
    age: number;
    isOnline: boolean; 
}

const UserCard = (props: UserCardProps) => {
    return(
        <div className="user-card">
            <h2>{props.name}</h2>
            <p>{props.age}</p>

            <p className={props.isOnline ? "online" : "offline"}>
                {props.isOnline ? "En ligne" : "Hors ligne"}
            </p>
        </div>
    );
};

export default UserCard;