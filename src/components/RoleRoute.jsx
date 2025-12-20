import { useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useAtom} from 'jotai'
import { authAtom } from "./atom";
import { ServerURL } from "../App";

export default function RoleRoute({ allowedRoles, children }) {
  const [user, setUser] = useAtom(authAtom); 

  useEffect(() => {
    const fetchMe = async () => {
      if(!user){
 try {
        const res = await fetch(`${ServerURL}/api/v1/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.data); 
      } catch (err) {
        setUser(null);
      }
      }
     
    };

    fetchMe();
  }, []);

  if (user === undefined) {
    return null; // or loader
  }
  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
