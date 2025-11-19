import React, { useState } from 'react';

const DiscoveryInterface = () => {
  const [accessToken, setAccessToken] = useState('');
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
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
    setSelectedCompany('');

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
      // Auto-select the first company if available
      if (allCompanies.length > 0) {
        setSelectedCompany(allCompanies[0].globalCompanyId);
      }
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

  const copySelectedCompanyId = () => {
    if (!selectedCompany) {
      setError('Please select a company first');
      return;
    }

    const selectedCompanyData = companies.find(company => company.globalCompanyId === selectedCompany);
    if (!selectedCompanyData) {
      setError('Selected company not found');
      return;
    }

    copyToClipboard(selectedCompanyData.globalCompanyId);
  };

  return (
    <div className="card_developer_console" style={{ 
        width: 'calc(77.7778%)',
        margin: 'auto',
        marginBottom: '32px',
        padding: '24px'
    }}>
      <div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
          <p className="spectrum-Body spectrum-Body--sizeM">
            After copying your access token from Credentials above, paste it here to get your available companies and you can copy the GlobalCompanyId you want to use in requests below.
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
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {loading && (
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid #ffffff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            )}
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
              Select a company from the dropdown and copy its globalCompanyId:
            </p>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1, maxWidth: '400px' }}>
                <label style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px', display: 'block' }}>
                  Select Company
                </label>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">-- Select a company --</option>
                  {companies.map((company, index) => (
                    <option key={index} value={company.globalCompanyId}>
                      {company.companyName} ({company.globalCompanyId})
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={copySelectedCompanyId}
                disabled={!selectedCompany}
                style={{
                  backgroundColor: !selectedCompany ? '#ccc' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: !selectedCompany ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  whiteSpace: 'nowrap'
                }}
              >
                Copy ID
              </button>
            </div>

            <p className="spectrum-Body spectrum-Body--sizeM" style={{ fontStyle: 'italic', color: '#666' }}>
              💡 Tip: After copying the globalCompanyId, click "Try it" on any API endpoint below and paste the ID into the globalCompanyId field.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoveryInterface;