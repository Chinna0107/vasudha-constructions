const logoImg = '/logo.jpeg';

export default function Layout({ children }) {
  return (
    <>
      <div className="page-topbar">
        <img src={logoImg} alt="Vasudha" className="topbar-logo" />
        <div className="topbar-brand">
          <span className="topbar-name">Vasudha</span>
          <span className="topbar-tagline">Construction Excellence</span>
        </div>
      </div>
      <div className="page-body">
        {children}
      </div>
    </>
  );
}
