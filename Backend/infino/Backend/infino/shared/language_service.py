import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient

class LanguageService:
    def __init__(self):
        key = os.environ["LANGUAGE_KEY"]
        endpoint = os.environ["LANGUAGE_ENDPOINT"]
        self.client = TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))

    def detect_language(self, text):
        response = self.client.detect_language(documents=[text])[0]
        return response.primary_language.name, response.primary_language.iso6391_name

    def spell_check(self, text, language="es"):
        
        response = self.client.analyze_sentiment(documents=[{"id": "1", "text": text, "language": language}])
        return response