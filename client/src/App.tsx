import { FC, useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";
import "./index.scss";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <div className="flow-container justify-center">
        <div className="mb-10">
          <img className="h-52" src="./jwt.svg" alt="JsonWebToken" />
        </div>
        <LoginForm />
      </div>
    );
  }
  return (
    <div className="flow-container justify-evenly">
      <div className="flex flex-col justify-between">
        <h1 className="m-2 py-2 text-4xl font-extrabold text-violet-950 border-transparent rounded-md">
          {store.isAuth ? `Benutzer ist autorisiert! ${store.user.email}` : "AUTORISIEREN"}
        </h1>

        {users.map((user) => (
          <div
            className="mb-2 py-2 text-center bg-gray-200 text-3xl font-bold text-violet-900 border-transparent rounded-md"
            key={user.id}
          >
            {user.email}
            <h1 className="m-2 py-2 text-2xl font-semibold italic text-green-800">
              {store.user.isActivated ? `Email ist bestätigt.` : "EMAIL BESTÄTIGEN"}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-stretch">
        <button className="myBtn myBtn__primary" onClick={getUsers}>
          Benutzer anzeigen
        </button>
        <button className="myBtn myBtn__secondary" onClick={() => store.logout()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default observer(App);
