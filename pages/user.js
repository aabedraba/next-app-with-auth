import { getCookies, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const User = () => {
  const [user, setUser] = useState(null);
  const cookies = getCookies();
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      const req = await fetch("/api/user", {
        method: "GET",
        headers: {
          authToken: cookies.authToken,
        },
      });

      const userData = await req.json();
      setUser(userData);
    };

    getUserInfo();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          deleteCookie("authToken");
          router.push("/login");
        }}
      >
        Log out
      </button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default User;
