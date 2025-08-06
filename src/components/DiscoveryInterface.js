import React, { useState } from 'react';

const DiscoveryInterface = () => {
  const [accessToken, setAccessToken] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDiscoveryCall = async () => {
    if (!accessToken.trim()) {
      setError('Please enter your access token');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setCompanies([]);

    try {
      const response = await fetch('https://analytics.discovery.adobe.net/discovery/1.0/discovery/me', {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-user-auth': accessToken
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract companies from the response
      const allCompanies = [];
      if (data.imsOrgs && Array.isArray(data.imsOrgs)) {
        data.imsOrgs.forEach(org => {
          if (org.companies && Array.isArray(org.companies)) {
            org.companies.forEach(company => {
              allCompanies.push({
                ...company,
                imsOrgId: org.imsOrgId
              });
            });
          }
        });
      }

      setCompanies(allCompanies);
      setSuccess(`Successfully retrieved ${allCompanies.length} companies`);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSuccess(`Copied "${text}" to clipboard`);
      setTimeout(() => setSuccess(''), 3000);
    }).catch(() => {
      setError('Failed to copy to clipboard');
    });
  };

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
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
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
            onClick={handleDiscoveryCall}
            disabled={loading || !accessToken.trim()}
            style={{
              backgroundColor: loading || !accessToken.trim() ? '#ccc' : '#0265DC',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: loading || !accessToken.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              width: 'fit-content'
            }}
          >
            {loading ? 'Loading...' : 'Get Companies'}
          </button>
        </div>

        {error && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#ffebee', 
            border: '1px solid #f44336',
            borderRadius: '4px',
            color: '#c62828',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#e8f5e8', 
            border: '1px solid #4caf50',
            borderRadius: '4px',
            color: '#2e7d32',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        {companies.length > 0 && (
          <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
            <h4 className="spectrum-Heading spectrum-Heading--sizeS side-header">
              Available Companies
            </h4>
            <p className="spectrum-Body spectrum-Body--sizeM">
              Click on a globalCompanyId to copy it to your clipboard:
            </p>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '14px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                      Company Name
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                      Global Company ID
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                      Organization ID
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                      Data Center
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px' }}>{company.companyName}</td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => copyToClipboard(company.globalCompanyId)}
                          style={{
                            backgroundColor: '#0265DC',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          {company.globalCompanyId}
                        </button>
                      </td>
                      <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '12px' }}>
                        {company.imsOrgId}
                      </td>
                      <td style={{ padding: '12px' }}>{company.dpc}</td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => copyToClipboard(company.globalCompanyId)}
                          style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Copy ID
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="spectrum-Body spectrum-Body--sizeM" style={{ fontStyle: 'italic', color: '#666' }}>
              💡 Tip: Copy the globalCompanyId and paste it into the globalCompanyId parameter in the API calls below.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoveryInterface; 