import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div>
       <h1 className="h2 text-warning">Đợi chút nha Hai ơi !!!</h1>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}