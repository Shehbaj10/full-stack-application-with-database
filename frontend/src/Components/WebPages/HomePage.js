import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainPage() {
  const [items, setItems] = useState([]);

  // Fetch products data from localStorage when component mounts
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('productsData'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []); 

  return (
    <div className="container py-5" style={{ fontFamily: 'Arial, sans-serif', color: '#2c3e50' }}>
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3" style={{ fontWeight: '300', color: '#27ae60' }}>Welcome to SOIL Haven</h1>
        <p className="lead" style={{ color: '#34495e' }}>Where unity and harmony in grocery and people comes together.</p>
      </div>
      
      <div className="row">
        {items.map((item, idx) => (
          <div key={idx} className="col-md-4 mb-4">
            <div className="card" style={{ border: 'none', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: '600', color: '#27ae60' }}>{item.name}</h5>
                <p className="card-text" style={{ color: '#2c3e50' }}>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <h2 style={{ fontWeight: '300', color: '#27ae60' }}>We are here for your healthy future</h2>
          <ul className="list-group">
            <li style={{ fontWeight: '300', color: '#2c3e50' }}>Fresh straight from source products</li>
            <li style={{ fontWeight: '300', color: '#2c3e50' }}>Reasonable rates with healthy produce</li>
            <li style={{ fontWeight: '300', color: '#2c3e50' }}>Healthy future is not so far from grasp</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h2 style={{ fontWeight: '300', color: '#27ae60' }}>Our Details</h2>
          <p style={{ color: '#2c3e50' }}>
            Find us at <a href="mailto:soilHaven@gmail.com" style={{ color: '#2980b9' }}>soilHaven@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
