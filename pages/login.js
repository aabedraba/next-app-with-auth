import { useState } from "react";
import {useRouter} from "next/router"

const Manuel = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const req = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user,
        pass,
      }),
    });

    if (req.status === 201) {
      router.push("/user")
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  }
  return (
    <div>
      {error && <p>{error}</p>}
      <p>User: </p>
      <input
        id="user"
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <p>Password: </p>
      <input
        id="password"
        type="password"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Manuel;
