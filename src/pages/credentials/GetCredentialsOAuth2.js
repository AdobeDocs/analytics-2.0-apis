import React from 'react'
import { GetCredential } from '@adobe/gatsby-theme-aio/src/components/GetCredential';
import platform from "./images/platform.png";

const GetCredentialOAuthS2s = () => {
    
  return (

    <GetCredential className="getCredentialContainer" templateId="67a4f6328b84ba26abff57f6" productName='Adobe Customer Journey Analytics' >

      <GetCredential.SignIn title="Get credentials" paragraph="After signing in, you can create credentials that can be used to call the Customer Journey Analytics APIs." buttonText="Sign in" />

      <GetCredential.Form title="Get credentials" paragraph="Create credentials that you can use to call the Customer Journey Analytics APIs." className="formClass">

        <GetCredential.Form.CredentialName label="Credential name" description="The credential name must be unique, use alphanumeric characters, and between 6 and 45 characters long. A project will be automatically created with the same name in Adobe Developer Console." range="45" />

        <GetCredential.Form.Products label="Included products and services">
          <GetCredential.Form.Product label="Adobe Customer Journey Analytics" icon={platform} />
        </GetCredential.Form.Products>

        <GetCredential.Form.AdobeDeveloperConsole label='By checking this box, you agree to' linkText="Adobe Developer Terms of Use" href="https://wwwimages2.adobe.com/content/dam/cc/en/legal/servicetou/Adobe-Developer-Additional-Terms_en-US_20230822.pdf" />

        <GetCredential.Form.Side>
          <div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header">
                OAuth server-to-server credential
              </h3>
              <p className="spectrum-Body spectrum-Body--sizeM">
                This credential allows you to use industry standard OAuth2.0 libraries to generate access tokens using the OAuth 2.0 client credentials grant type.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header">
                Learn more
              </h3>
              <a style={{ color: "#0265DC" }} href="https://experienceleague.adobe.com/en/docs/experience-platform/landing/platform-apis/api-authentication">
                Authentication documentation
              </a>
              <a style={{ color: "#0265DC" }} href="https://developer.adobe.com/cja-apis/docs/">
                Adobe Customer Journey Analytics API documentation
              </a>
              <a style={{ color: "#0265DC" }} href="https://experienceleague.adobe.com/en/browse/customer-journey-analytics">
                Adobe Customer Journey Analytics documentation
              </a>
            </div>
          </div>
        </GetCredential.Form.Side>

      </GetCredential.Form>

      <GetCredential.UnknownError helpLink="https://some_help_link" helpLinkText="Get Help" className="unKnownError" />

      <GetCredential.Card title="Your credential is ready to use" developerConsoleManage="Manage on Developer Console" className="card_developer_console" devConsoleDirection="/console" isCollapsable="true">

        <GetCredential.Card.Side>
          <div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header">
                OAuth server-to-server credential
              </h3>
              <p className="spectrum-Body spectrum-Body--sizeM">
                This credential allows you to use industry standard OAuth2.0 libraries to generate access tokens using the OAuth 2.0 client credentials grant type.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header">
                Learn more
              </h3>
              <a style={{ color: "#0265DC" }} href="https://experienceleague.adobe.com/en/docs/experience-platform/landing/platform-apis/api-authentication">
                Authentication documentation
              </a>
              <a style={{ color: "#0265DC" }} href="https://developer.adobe.com/cja-apis/docs/">
                Adobe Customer Journey Analytics API documentation
              </a>
              <a style={{ color: "#0265DC" }} href="https://experienceleague.adobe.com/en/browse/customer-journey-analytics">
                Adobe Customer Journey Analytics documentation
              </a>
            </div>
          </div>
        </GetCredential.Card.Side>

        <GetCredential.Card.Products label="Included products and services">
          <GetCredential.Card.Product label="Adobe Experience Platform" icon={platform} />
        </GetCredential.Card.Products>

        <GetCredential.Card.ProjectsDropdown label="Projects" subHeading="Only your projects that contain credentials are shown" />

        <GetCredential.Card.ManageDeveloperConsole label="Manage all your projects and credentials on Adobe Developer Console" direction='/console' />

        <GetCredential.Card.DevConsoleLink heading="Developer Console Project" />

        <GetCredential.Card.AccessToken helpText="" buttonLabel="Generate and copy token" heading={(<>Access token<br/><br/> <span style="font-weight:normal"><small>After copying the access token, paste it into the **Authorization** header parameter after typing the word <code>Bearer</code> with one space following the word.</small></span></>)} />


        <GetCredential.Card.CredentialDetails heading={(<>Credential details<br/><br/> <span style="font-weight:normal"><small>You can use the following credential details to try the Adobe Customer Journey Analytics APIs below.<ul><li>Client ID: Your public identifier for accessing the APIs. This acts as an API key when used with the Customer Journey Analytics APIs, and corresponds with the <code>x-api-key</code> header.</li><li>Organization ID: The ID of the organization you're using with the APIs. This corresponds with the <code>x-gw-ims-org-id</code> header.</li></ul></small></span></>)} orderBy="ClientId,ImsOrgID">
          <GetCredential.Card.CredentialDetails.ClientId heading="Client ID (x-api-key)" />
          <GetCredential.Card.CredentialDetails.ImsOrgID heading="Organization ID" />
          <GetCredential.Card.CredentialDetails.Scopes heading="Scopes" scope="openid,session,AdobeID,read_organizations,additional_info.projectedProductContext" />
        </GetCredential.Card.CredentialDetails>

      </GetCredential.Card>

      <GetCredential.Return title="Previously created projects" paragraph="Select a project and access your existing credentials for Adobe  Customer Journey Analytics." className="card_developer_console" isCollapsable="true">

        <GetCredential.Return.Side>
          <GetCredential.Return.Side.Custom>
            <div style={{ display: "flex", gap: "30px", flexDirection: "column", width: "100%" }}>
              <h3 className='spectrum-Heading spectrum-Heading--sizeM'>Welcome back</h3>
              <p className="spectrum-Body spectrum-Body--sizeM">You can either re-use an existing credential or create a new credential.</p>
            </div>
          </GetCredential.Return.Side.Custom>
          <GetCredential.Return.Side.NewCredential heading="Need another credential?" buttonLabel="Create new credential" />
        </GetCredential.Return.Side>

        <GetCredential.Return.CredentialDetails heading={(<>Credential details<br/><br/> <span style="font-weight:normal"><small>You can use the following credential details to try the Adobe Customer Journey Analytics APIs below.<ul><li>Client ID: Your public identifier for accessing the APIs. This acts as an API key when used with the APIs, and corresponds with the <code>x-api-key</code> header.</li><li>Organization ID: The ID of the organization you're using with the APIs. This corresponds with the <code>x-gw-ims-org-id</code> header.</li></ul></small></span></>)} orderBy="ClientId,ImsOrgID">
          <GetCredential.Return.CredentialDetails.ClientId heading="Client ID (x-api-key)" />
          <GetCredential.Return.CredentialDetails.ImsOrgID heading="Organization ID" />
          <GetCredential.Return.CredentialDetails.Scopes heading="Scopes" scope="openid,session,AdobeID,read_organizations,additional_info.projectedProductContext" />
        </GetCredential.Return.CredentialDetails>

        <GetCredential.Return.ProjectsDropdown label="Projects" subHeading="Only your projects that contain credentials are shown" />

        <GetCredential.Return.ManageDeveloperConsole label="Manage all your projects and credentials on Adobe Developer Console" direction='/console/projects' />

        <GetCredential.Return.AccessToken helpText="" buttonLabel="Generate and copy token" heading={(<>Access token<br/><br/> <span style="font-weight:normal"><small>After copying the access token, you must prepend the token with <code>Bearer</code> to use it with API calls.</small></span></>)} />

        <GetCredential.Return.DevConsoleLink heading="Developer Console project" />

        <GetCredential.Return.Products label="Included products and services">
          <GetCredential.Return.Product label="Adobe Experience Platform" icon={platform} />
        </GetCredential.Return.Products>

      </GetCredential.Return>

      <GetCredential.RequestAccess
        title="Get credentials"
        paragraph="Create unique credentials that you will use to call multiple APIs from your application."
      >
        <GetCredential.RequestAccess.EdgeCase>
          <GetCredential.RequestAccess.EdgeCase.NoProduct title="Your organization does not have access to Adobe Customer Journey Analytics." />
          <GetCredential.RequestAccess.EdgeCase.Type1User title="You do not have access to Adobe Customer Journey Analytics. Please use another organization and try again." />
          <GetCredential.RequestAccess.EdgeCase.NotMember title="You do not have access to Adobe Customer Journey Analytics. Please use another organization and try again." />
        </GetCredential.RequestAccess.EdgeCase>

        <GetCredential.RequestAccess.RestrictedAccess
          title="Restricted Access"
          buttonLabel="Request access"
        >
          <GetCredential.RequestAccess.RestrictedAccess.Products label="Included products and services">
            <GetCredential.RequestAccess.RestrictedAccess.Products.Product
              icon={platform}
              label="Adobe Customer Journey Analytics"
            />
          </GetCredential.RequestAccess.RestrictedAccess.Products>
        </GetCredential.RequestAccess.RestrictedAccess>
        <GetCredential.RequestAccess.RequestAccessSide>
          <div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header">
                OAuth server-to-server credential
              </h3>
              <p className="spectrum-Body spectrum-Body--sizeM">
                This credential allows you to use industry standard OAuth2.0 libraries to generate access tokens using the OAuth 2.0 client credentials grant type.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
              <h3 className="spectrum-Heading spectrum-Heading--sizeS side-header">
                Learn more
              </h3>
              <a style={{ color: "#0265DC" }} href="https://experienceleague.adobe.com/en/docs/experience-platform/landing/platform-apis/api-authentication">
                Authentication documentation
              </a>
              <a style={{ color: "#0265DC" }} href="https://developer.adobe.com/cja-apis/docs/">
                Adobe Customer Journey Analytics API documentation
              </a>
              <a style={{ color: "#0265DC" }} href="https://experienceleague.adobe.com/en/browse/customer-journey-analytics">
                Adobe Customer Journey Analytics documentation
              </a>
            </div>
          </div>
        </GetCredential.RequestAccess.RequestAccessSide>
      </GetCredential.RequestAccess>
    </GetCredential>

  )
}

export default GetCredentialOAuthS2s;
