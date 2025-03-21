from os import environ
from azure.ai.contentsafety import ContentSafetyClient
from azure.ai.contentsafety.models import AnalyzeTextOptions
from azure.core.credentials import AzureKeyCredential

class ContentSafetyService:
    def __init__(self):
        content_safety_key = environ.get("INFINO_CONTENT_SAFETY_KEY")
        content_safety_endpoint = environ.get("INFINO_CONTENT_SAFETY_ENDPOINT")
        self.client = ContentSafetyClient(
            endpoint=content_safety_endpoint, 
            credential=AzureKeyCredential(content_safety_key)
        )
    
    def analyze_content(self, text):
        """Analiza el contenido del texto para detectar material inapropiado."""
        try:
            # Analizar el texto
            request = AnalyzeTextOptions(text=text)
            response = self.client.analyze_text(request)
            
            # Procesar resultados
            categories = {
                "hate": {
                    "severity": response.hate_result.severity,
                    "score": response.hate_result.score
                },
                "self_harm": {
                    "severity": response.self_harm_result.severity,
                    "score": response.self_harm_result.score
                },
                "sexual": {
                    "severity": response.sexual_result.severity,
                    "score": response.sexual_result.score
                },
                "violence": {
                    "severity": response.violence_result.severity,
                    "score": response.violence_result.score
                }
            }
            
            # Determinar si el contenido es seguro
            is_unsafe = any(cat["severity"] > 2 for cat in categories.values())
            
            return {
                "is_safe": not is_unsafe,
                "categories": categories,
                "original_text": text
            }
        except Exception as e:
            return {"error": str(e), "original_text": text}
