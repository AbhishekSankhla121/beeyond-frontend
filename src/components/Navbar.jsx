import { Link, useNavigate } from "react-router-dom";
import { useAtom} from "jotai";
import { authAtom } from "./atom";


export default function Navbar() {
  const [user,setuser]  = useAtom(authAtom);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/logout");
    } catch (err) {
      console.error("Logout failed");
    } finally {
      setuser(null)
      navigate("/login");
    }
  };


  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>Beeyond</span>

        {user && user.role === "CUSTOMER" && (
          <>
            <NavLink to="/customer/dashboard" label="Home" />
            <NavLink to="/customer/order" label="My Orders" />
            <NavLink to="/profile" label="Profile" />
            
          </>
        )}

        {user && user.role === "DELIVERY" && (
          <>
            <NavLink to="/delivery/dashboard" label="Home" />
            <NavLink to="/delivery/orders" label="My Deliveries" />
            <NavLink to="/profile" label="Profile" />
          </>
        )}

        {user && user.role === "ADMIN" && (
          <>
            <NavLink to="/admin/dashboard" label="Home" />
            <NavLink to="/admin/orders" label="Orders" />
            <NavLink to="/admin/partners" label="Partners" />
            <NavLink to="/profile" label="Profile" />
            <NavLink to="/admin/create/product" label="create-product" />
          </>
        )}
      </div>

      { user &&
        <div style={styles.right}>
          <span style={styles.user}>
            {user.name} ({user.role})
          </span>
          <button onClick={logout} style={styles.logout}>
            Logout
          </button>
        </div>
      
      }
      {
        !user&&
              <div style={styles.right}>
          <NavLink to="/" label="Home" />

        </div>
      }

    </nav>
  );
}

function NavLink({ to, label }) {
  return (
    <Link to={to} style={styles.link}>
      {label}
    </Link>
  );
}
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#0f172a",
    color: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "18px",
    marginRight: "24px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "14px",
  },
  user: {
    fontSize: "13px",
    opacity: 0.9,
  },
  logout: {
    background: "#dc2626",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
};
