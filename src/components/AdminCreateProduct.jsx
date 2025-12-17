import { useState } from "react";

export default function AdminCreateProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/admin/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: form.name,
            description: form.description,
            image: form.image,
            price: Number(form.price),
            stock: Number(form.stock),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create product");
      }

      setMessage("✅ Product created successfully!");
      setForm({
        name: "",
        description: "",
        image: "",
        price: "",
        stock: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Create Product</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}

        <input
          style={styles.input}
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          style={styles.textarea}
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "24px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    minHeight: "80px",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    background: "#0f172a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  error: {
    color: "#dc2626",
    fontSize: "13px",
  },
  success: {
    color: "#16a34a",
    fontSize: "13px",
  },
};
