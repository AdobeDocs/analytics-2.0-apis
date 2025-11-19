import configparser
import logging
import requests

logging.basicConfig(level="INFO")
logger = logging.getLogger()


def get_oauth_access_token(config):
    """
    Get OAuth 2.0 access token using Server-to-Server authentication
    Replaces the deprecated JWT flow
    """
    token_url = f"https://{config['imshost']}/ims/token/v3"
    
    post_body = {
        "grant_type": "client_credentials",
        "client_id": config["apikey"],
        "client_secret": config["secret"],
        "scope": config.get("scopes", "openid,AdobeID,read_organizations,additional_info.projectedProductContext,additional_info.job_function")
    }
    
    logger.info(f"Requesting OAuth access token from {token_url}")
    
    response = requests.post(token_url, data=post_body)
    response.raise_for_status()
    
    token_data = response.json()
    return token_data["access_token"]


def get_first_global_company_id(config, access_token):
    response = requests.get(
        config["discoveryurl"],
        headers={
            "Authorization": f"Bearer {access_token}",
            "x-api-key": config["apikey"]
        }
    )
    response.raise_for_status()
    return response.json().get("imsOrgs")[0].get("companies")[0].get("globalCompanyId")


def get_users_me(config, global_company_id, access_token):
    response = requests.get(
        f"{config['analyticsapiurl']}/{global_company_id}/users/me",
        headers={
            "Authorization": f"Bearer {access_token}",
            "x-api-key": config["apikey"]
        }
    )
    response.raise_for_status()
    return response.json()


def main():
    config_parser = configparser.ConfigParser()
    config_parser.read("config.ini")
    
    config = dict(config_parser["default"])
    
    # Get OAuth 2.0 access token (replaces JWT flow)
    access_token = get_oauth_access_token(config)
    logger.info("OAuth Access Token obtained successfully")
    
    global_company_id = get_first_global_company_id(config, access_token)
    logger.info(f"global_company_id: {global_company_id}")
    
    response = get_users_me(config, global_company_id, access_token)
    logger.info(f"users/me response: {response}")


if __name__ == "__main__":
    main()
