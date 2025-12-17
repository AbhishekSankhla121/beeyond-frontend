import "./LoginCards.css";

const AdminPage = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Users</li>
          <li>Orders</li>
          <li>Products</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Dashboard</h1>
          <div className="admin-profile">Admin</div>
        </header>

        <section className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>3,892</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>₹ 8,45,000</p>
          </div>
        </section>

        <section className="admin-content">
          <h2>Recent Activity</h2>
          <div className="content-box">
            <p>Table / Charts / Data will go here</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
