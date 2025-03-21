from os import environ
import openai

class OpenAIService:
    def __init__(self):
        openai.api_type = "azure"
        openai.api_key = environ.get("INFINO_OPENAI_KEY")
        openai.api_base = environ.get("INFINO_OPENAI_ENDPOINT")
        openai.api_version = "2024-07-18"  # Revisa!!! actualizar según la versión compatible
        self.deployment_name = environ.get("INFINO_OPENAI_DEPLOYMENT")
    
    def correct_spelling(self, text, language_code="es"):
        """Corrige errores ortográficos en el texto."""
        try:
            response = openai.ChatCompletion.create(
                engine=self.deployment_name,
                messages=[
                    {"role": "system", "content": f"Eres un corrector ortográfico en {language_code}. Corrige cualquier error en el texto sin cambiar su significado. Solo devuelve el texto corregido, sin explicaciones."},
                    {"role": "user", "content": text}
                ],
                temperature=0.0,
                max_tokens=1000
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return text  # En caso de error, devolver el texto original
    
    def normalize_text(self, text, instructions=None):
        """
        Normalizar el texto según instrucciones específicas.
        Ejemplo: reformatear, simplificar, expandir, etc.
        """
        if not instructions:
            instructions = "Normaliza este texto: mejora la gramática y claridad manteniendo el significado original."
        
        try:
            response = openai.ChatCompletion.create(
                engine=self.deployment_name,
                messages=[
                    {"role": "system", "content": instructions},
                    {"role": "user", "content": text}
                ],
                temperature=0.3,
                max_tokens=1000
            )
            return {
                "normalized_text": response.choices[0].message.content.strip(),
                "original_text": text
            }
        except Exception as e:
            return {"error": str(e), "original_text": text}
