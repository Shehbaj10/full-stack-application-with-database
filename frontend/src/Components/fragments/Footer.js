import React from 'react';

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#333', 
      color: 'white', 
      padding: '15px', 
      textAlign: 'center', 
      position: 'fixed', 
      left: '0', 
      bottom: '0', 
      width: '100%', 
      boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: 'bold' }}>SOIL Haven</p>
    </footer>
  );
  
}

export default Footer;
