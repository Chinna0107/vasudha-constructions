import Layout from '../../components/Layout';
import { useFetch } from '../../hooks/useFetch';
import { RiPriceTag3Line, RiImageLine } from 'react-icons/ri';

export default function Offers() {
  const { data: offers = [], loading } = useFetch('/offers');

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>Offers & Price List</h1>
        <p>Latest products, prices and exclusive deals from Vasudha</p>
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="empty-msg">Loading offers…</p>
        </div>
      )}

      {!loading && offers.length === 0 && (
        <div className="card">
          <div className="empty-state">
            <div style={{ marginBottom: 12 }}><RiImageLine size={48} color="rgba(255,255,255,0.1)" /></div>
            <p>No offers available right now. Check back soon!</p>
          </div>
        </div>
      )}

      {!loading && offers.length > 0 && (
        <div className="offers-grid">
          {offers.map(o => (
            <div key={o.id} className="offer-card">
              <div className="offer-img-wrap">
                <img src={o.image_url} alt={o.title} className="offer-img" />
              </div>
              <div className="offer-body">
                <div className="offer-title">{o.title}</div>
                {o.description && <div className="offer-desc">{o.description}</div>}
                {o.price && (
                  <div className="offer-price">
                    <RiPriceTag3Line size={14} />
                    {o.price}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
