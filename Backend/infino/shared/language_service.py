from os import environ
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient

class LanguageService:
    def __init__(self):
        language_key = environ.get("INFINO_LANGUAGE_KEY")
        language_endpoint = environ.get("INFINO_LANGUAGE_ENDPOINT")
        self.client = TextAnalyticsClient(
            endpoint=language_endpoint, 
            credential=AzureKeyCredential(language_key)
        )
    
    def detect_language(self, text):
        """Detecta el idioma del texto proporcionado."""
        try:
            response = self.client.detect_language(documents=[text])[0]
            return {
                "language": response.primary_language.name,
                "language_code": response.primary_language.iso6391_name,
                "confidence_score": response.primary_language.confidence_score
            }
        except Exception as e:
            return {"error": str(e)}
    
    def spell_check(self, text, language_code="es"):
        """
        Nota: Text Analytics no tiene una función directa de corrección ortográfica (Como menciono @Luis CM).
        Esta es una implementación simplificada que utilizaría OpenAI para corregir.
        """
        # En una implementación real, se podría utilizar Bing Spell Check API o OpenAI
        from .openai_service import OpenAIService
        openai_service = OpenAIService()
        corrected_text = openai_service.correct_spelling(text, language_code)
        return {"corrected_text": corrected_text}
    
    def analyze_sentiment(self, text, language_code=None):
        """Analiza el sentimiento del texto."""
        try:
            response = self.client.analyze_sentiment(
                documents=[text], 
                language=language_code
            )[0]
            
            return {
                "sentiment": response.sentiment,
                "positive_score": response.confidence_scores.positive,
                "neutral_score": response.confidence_scores.neutral,
                "negative_score": response.confidence_scores.negative
            }
        except Exception as e:
            return {"error": str(e)}
