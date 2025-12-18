import { useEffect, useState } from "react";

export default function CustomerProducts() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProduct=()=>{
     fetch("http://localhost:5000/api/v1/user/product", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setProducts(data.data))
      .catch(console.error);
  }

  useEffect(() => {
   fetchProduct()
  }, []);


  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product === product._id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          alert("Stock limit reached");
          return prev;
        }
        return prev.map(i =>
          i.product === product._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          stock: product.stock,
        }
      ];
    });
  };

  // Quantity update
  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(i => {
        if (i.product === id) {
          const qty = i.quantity + delta;
          if (qty < 1 || qty > i.stock) return i;
          return { ...i, quantity: qty };
        }
        return i;
      })
    );
  };


  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const placeOrder = async () => {
    if (!cart.length) return;

    setLoading(true);
    try {
      const payload = {
        items: cart.map(i => ({
          product: i.product,
          quantity: i.quantity,
        }))
      };

      const res = await fetch("http://localhost:5000/api/v1/user/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
       fetchProduct()
      alert("Order placed successfully");
      setCart([]);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.products}>
        <h2 style={styles.heading}>🛍 Products</h2>

        <div style={styles.grid}>
          {products.map(p => (
            <div key={p._id} style={styles.card}>
              <img src={p.image} alt={p.name} style={styles.image} />

              <div style={styles.cardBody}>
                <h4 style={styles.title}>{p.name}</h4>
                <p style={styles.desc}>{p.description}</p>

                <div style={styles.meta}>
                  <span>₹{p.price}</span>
                  <span>Stock: {p.stock}</span>
                </div>

                <button
                  style={{
                    ...styles.addBtn,
                    opacity: p.stock === 0 ? 0.5 : 1
                  }}
                  disabled={p.stock === 0}
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.cart}>
        <h3>🛒 Your Cart</h3>

        {!cart.length && <p style={{ color: "#777" }}>Cart is empty</p>}

        {cart.map(item => (
          <div key={item.product} style={styles.cartItem}>
            <img src={item.image} style={styles.cartImg} alt="" />

            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600 }}>{item.name}</p>
              <small>₹{item.price}</small>

              <div style={styles.qty}>
                <button onClick={() => updateQty(item.product, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(item.product, 1)}>+</button>
              </div>
            </div>

            <b>₹{item.price * item.quantity}</b>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <hr />
            <div style={styles.total}>
              <span>Total</span>
              <b>₹{total}</b>
            </div>

            <button
              style={styles.orderBtn}
              disabled={loading}
              onClick={placeOrder}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
const styles = {
  page: {
    display: "flex",
    gap: "24px",
    padding: "24px",
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "16px",
  },

  products: {
    flex: 3,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "18px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },

  cardBody: {
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  title: {
    margin: 0,
    fontSize: "16px",
  },

  desc: {
    fontSize: "13px",
    color: "#666",
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 600,
    marginTop: "6px",
  },

  addBtn: {
    marginTop: "10px",
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },

  cart: {
    flex: 1,
    background: "#fff",
    borderRadius: "14px",
    padding: "16px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    height: "fit-content",
    position: "sticky",
    top: "20px",
  },

  cartItem: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px",
    alignItems: "center",
  },

  cartImg: {
    width: "50px",
    height: "50px",
    borderRadius: "6px",
    objectFit: "cover",
  },

  qty: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "18px",
    marginTop: "10px",
  },

  orderBtn: {
    width: "100%",
    marginTop: "12px",
    padding: "10px",
    fontSize: "16px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
