import "./LoginCards.css";


const HomePage = () => {
  const categories = ["Electronics", "Fashion", "Home", "Books", "Toys"];
  const products = [
    { id: 1, name: "Product 1", price: "₹499", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: "₹799", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", price: "₹299", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Product 4", price: "₹999", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="home-container-with-sidebar">
      {/* Sidebar / Menu */}
      <aside className="home-sidebar">
        <h2 className="sidebar-title">Categories</h2>
        <ul className="sidebar-menu">
          {categories.map((cat, index) => (
            <li key={index}>{cat}</li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="home-main">
        {/* Top bar with logout */}
        <div className="home-topbar">
          <h1>Welcome to Our Store</h1>
          <button className="logout-btn">Logout</button>
        </div>

        {/* Hero Section */}
        <section className="hero">
          <p>Find the best products at amazing prices!</p>
          <button>Shop Now</button>
        </section>

        {/* Featured Products */}
        <section className="products-section">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
