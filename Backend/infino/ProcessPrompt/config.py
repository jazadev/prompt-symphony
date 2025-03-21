"""Configuration File"""
from os import environ

class Config():
    """Common configuration"""
    LANGUAGE_KEY = environ.get("INFINO_LANGUAGE_KEY")
    LANGUAGE_ENDPOINT = environ.get("INFINO_LANGUAGE_ENDPOINT")
    OPENAI_KEY = environ.get("INFINO_OPENAI_KEY")
    OPENAI_ENDPOINT = environ.get("INFINO_OPENAI_ENDPOINT")
    OPENAI_DEPLOYMENT = environ.get("INFINO_OPENAI_DEPLOYMENT")
    CONTENT_SAFETY_KEY = environ.get("INFINO_CONTENT_SAFETY_KEY")
    CONTENT_SAFETY_ENDPOINT = environ.get("INFINO_CONTENT_SAFETY_ENDPOINT")
