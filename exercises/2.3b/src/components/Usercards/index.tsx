interface UserCards {
  users : User[];
};

type User = {
  name:string;
  age: number;
};

const UserCards = (props: UserCards) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCards;