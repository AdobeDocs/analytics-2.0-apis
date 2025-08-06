import React from 'react';

const DiscoveryInterface = () => {
  return (
    <div className="card_developer_console" style={{ marginBottom: '32px' }}>
      <div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
          <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header">
            Company Discovery
          </h3>
          <p className="spectrum-Body spectrum-Body--sizeM">
            After copying your access token from above, paste it here to get your available companies and copy the globalCompanyId values.
          </p>
        </div>

        <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>
            Access Token
          </label>
          <input
            type="text"
            placeholder="Paste your access token here"
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          
          <button
            style={{
              backgroundColor: '#0265DC',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              width: 'fit-content'
            }}
          >
            Get Companies
          </button>
        </div>

        <div style={{ 
          padding: '12px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#666'
        }}>
          💡 <strong>Coming Soon:</strong> This feature will allow you to discover your available companies and copy globalCompanyId values for use in API calls.
        </div>
      </div>
    </div>
  );
};

export default DiscoveryInterface; 