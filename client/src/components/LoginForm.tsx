import { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className="w-96">
      <div className="flex flex-col">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>

      <div className="mt-5 flex justify-around">
        <button className="myBtn myBtn__primary" onClick={() => store.login(email, password)}>
          Login
        </button>
        <button
          className="myBtn myBtn__secondary"
          onClick={() => store.registration(email, password)}
        >
          Registrieren
        </button>
      </div>
    </div>
  );
};

export default observer(LoginForm);
