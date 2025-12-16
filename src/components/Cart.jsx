import "./LoginCards.css";


const Cart = () => {
  // Sample cart items (UI only)
  const cartItems = [
    { id: 1, name: "Product 1", price: 499, qty: 1, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Product 2", price: 799, qty: 2, image: "https://via.placeholder.com/100" },
    { id: 3, name: "Product 3", price: 299, qty: 1, image: "https://via.placeholder.com/100" },
  ];

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {/* Cart Items */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item-card">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-box">
                <button>-</button>
                <span>{item.qty}</span>
                <button>+</button>
              </div>
            </div>
            <button className="remove-btn">Remove</button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Taxes & Shipping: ₹0</p>
        <h3>Total: ₹{subtotal}</h3>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>

      {/* Empty Cart Example */}
      {cartItems.length === 0 && (
        <div className="empty-cart">
          <p>Your cart is empty!</p>
          <button>Go Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
