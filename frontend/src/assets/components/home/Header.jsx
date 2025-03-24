

import React from 'react';

const Header = () => {
  return (
    <header 
      className="text-center position-relative" 
      style={{
        background: "linear-gradient(135deg, #6A11CB, #2575FC)", 
        color: "#fff",
        padding: "20px 0", 
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "relative"
      }}
    >
      {/* Pure Veg Badge */}
      <span 
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          backgroundColor: "#28a745", // Green color
          color: "#fff",
          padding: "5px 12px",
          borderRadius: "20px",
          fontSize: "0.9rem",
          fontWeight: "bold"
        }}
      >
        🟢 Pure Veg
      </span>

      <div className="container px-4 px-lg-5">
        <h1 
          className="fw-bold"
          style={{ 
            fontSize: "2rem",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.15)" 
          }}
        >
          Order Now 🍽️
        </h1>
        <p 
          className="mt-2"
          style={{ 
            fontSize: "1rem", 
            opacity: 0.8, 
            fontWeight: "500",
            letterSpacing: "0.5px"
          }}
        >
          Fresh, fast, and ready for pickup!
        </p>
      </div>
    </header>
  );
};

export default Header;
