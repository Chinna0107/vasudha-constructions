import Layout from '../../components/Layout';

export default function Orders() {
  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>Past Orders</h1>
        <p>View your order history</p>
      </div>
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <p>No orders yet. Start shopping!</p>
        </div>
      </div>
    </Layout>
  );
}
