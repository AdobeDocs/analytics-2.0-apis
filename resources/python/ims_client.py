import configparser
import logging
import datetime
import requests
import jwt

logging.basicConfig(level="INFO")
logger = logging.getLogger()


def get_jwt_token(config):
    with open(config["key_path"], 'r') as file:
        private_key = file.read()

    return jwt.encode({
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=30),
        "iss": config["orgid"],
        "sub": config["technicalaccountid"],
        "https://{}/s/{}".format(config["imshost"], config["metascopes"]): True,
        "aud": "https://{}/c/{}".format(config["imshost"], config["apikey"])
    }, private_key, algorithm='RS256')


def get_access_token(config, jwt_token):
    post_body = {
        "client_id": config["apikey"],
        "client_secret": config["secret"],
        "jwt_token": jwt_token
    }

    logger.info("Sending 'POST' request to {}".format(config["imsexchange"]))
    logger.info("Post body: {}".format(post_body))

    response = requests.post(config["imsexchange"], data=post_body)
    return response.json()["access_token"]


def get_first_global_company_id(config, access_token):
    response = requests.get(
        config["discoveryurl"],
        headers={
            "Authorization": "Bearer {}".format(access_token),
            "x-api-key": config["apikey"]
        }
    )

    # Return the first global company id
    return response.json().get("imsOrgs")[0].get("companies")[0].get("globalCompanyId")


def get_users_me(config, global_company_id, access_token):
    response = requests.get(
        "{}/{}/users/me".format(config["analyticsapiurl"], global_company_id),
        headers={
            "Authorization": "Bearer {}".format(access_token),
            "x-api-key": config["apikey"],
            "x-proxy-global-company-id": global_company_id
        }
    )
    return response.json()


config_parser = configparser.ConfigParser()
config_parser.read("config.ini")

config = dict(config_parser["default"])
jwt_token = get_jwt_token(config)
logger.info("JWT Token: {}".format(jwt_token))
access_token = get_access_token(config, jwt_token)
logger.info("Access Token: {}".format(access_token))

global_company_id = get_first_global_company_id(config, access_token)
logger.info("global_company_id: {}".format(global_company_id))

response = get_users_me(config, global_company_id, access_token)
logger.info("users/me response: {}".format(response))
