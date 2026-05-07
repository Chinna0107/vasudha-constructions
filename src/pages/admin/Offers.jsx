import { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import { useFetch } from '../../hooks/useFetch';
import { API_URL } from '../../config';
import { RiImageAddLine, RiDeleteBinLine, RiPriceTag3Line, RiFileTextLine, RiUploadCloud2Line } from 'react-icons/ri';

export default function AdminOffers() {
  const { data: offers = [], loading, refetch } = useFetch('/offers');
  const [form, setForm] = useState({ title: '', price: '', description: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please select an image');
    setUploading(true); setError(''); setSuccess('');
    const fd = new FormData();
    fd.append('image', file);
    fd.append('title', form.title);
    fd.append('price', form.price);
    fd.append('description', form.description);
    try {
      const res = await fetch(`${API_URL}/offers`, { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess('Offer added successfully!');
      setForm({ title: '', price: '', description: '' });
      setFile(null); setPreview(null);
      fileRef.current.value = '';
      refetch();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/offers/${id}`, { method: 'DELETE' });
    refetch();
  };

  return (
    <Layout role="admin">
      <div className="page-header">
        <h1>Offers & Price List</h1>
        <p>Upload and manage product offers shown to customers</p>
      </div>

      <div className="two-col-grid">
        {/* Upload Form */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <RiImageAddLine size={18} color="#c7c362" />
            <h3 style={{ marginBottom: 0 }}>Add New Offer</h3>
          </div>

          {success && <div className="success-msg" style={{ marginBottom: 16 }}>{success}</div>}
          {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Image Upload */}
            <div className="field">
              <label><RiUploadCloud2Line size={13} style={{ marginRight: 5 }} />Product Image</label>
              <div className="offer-upload-zone" onClick={() => fileRef.current.click()}>
                {preview
                  ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                  : <>
                      <RiUploadCloud2Line size={32} color="rgba(199,195,98,0.4)" />
                      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 8 }}>Click to upload image</p>
                    </>
                }
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            </div>

            <div className="field">
              <label><RiFileTextLine size={13} style={{ marginRight: 5 }} />Title</label>
              <input type="text" placeholder="e.g. Premium Cement 50kg" value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="field">
              <label><RiPriceTag3Line size={13} style={{ marginRight: 5 }} />Price</label>
              <input type="text" placeholder="e.g. ₹450 per bag" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="field">
              <label>Description</label>
              <input type="text" placeholder="Short description (optional)" value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-gold" disabled={uploading} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <RiUploadCloud2Line size={16} />
              {uploading ? 'Uploading…' : 'Add Offer'}
            </button>
          </form>
        </div>

        {/* Current Offers */}
        <div className="card">
          <h3>Current Offers ({offers.length})</h3>
          {loading && <p className="empty-msg">Loading…</p>}
          {!loading && offers.length === 0 && <p className="empty-msg">No offers yet</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 520, overflowY: 'auto' }}>
            {offers.map(o => (
              <div key={o.id} className="offer-admin-card">
                <img src={o.image_url} alt={o.title} className="offer-admin-img" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{o.title}</div>
                  {o.price && <div style={{ color: '#c7c362', fontSize: 13, fontWeight: 600 }}>{o.price}</div>}
                  {o.description && <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 }}>{o.description}</div>}
                </div>
                <button onClick={() => handleDelete(o.id)}
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: '#fca5a5', flexShrink: 0 }}>
                  <RiDeleteBinLine size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
