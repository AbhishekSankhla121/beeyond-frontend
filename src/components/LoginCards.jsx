import { useEffect, useState } from "react";
import "./LoginCards.css";
import { Link, useNavigate } from "react-router-dom";

const loginCards = [
  {
    role: "customer",
    title: "Customer Login",
    icon: "👤",
    description: "Order products and track deliveries",
    path: "/login",
  },
  {
    role: "delivery",
    title: "Delivery Partner Login",
    icon: "🚚",
    description: "Manage and complete deliveries",
    path: "/login",
  },
  {
    role: "admin",
    title: "Admin Login",
    icon: "🛠",
    description: "Control users and system settings",
    path: "/login",
  },
];

const LoginCards = () => {
  const navigate = useNavigate();

   useEffect(() => {
    const fetchMe = async () => {
  
 try {
        const res = await fetch("http://localhost:5000/api/v1/me", {
          credentials: "include",
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
             // role-based redirect]
      if(!data.data && data.success) return 
      if (data.data.role === "ADMIN") navigate("/admin/dashboard");
      else if (data.data.role === "DELIVERY") navigate("/delivery/dashboard");
      else navigate("/customer/dashboard");
        
      } catch (err) {
        console.log(err)
      }
      
     
    };

    fetchMe();
  }, []);
  return (
    <div className="login-ui">
      <h1 className="title">Login Portal</h1>
      <p className="subtitle">Choose your login type</p>

      <div className="cards-container">
        {loginCards.map((card) => (
          <Link
            key={card.role}
            to={card.path}
            className="card-link"
            state={{
          role: card.role.toUpperCase(),
          }}
          >
            <div className={`card`}>
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LoginCards;
