import logging
import json
import azure.functions as func
from shared.language_service import LanguageService
from shared.openai_service import OpenAIService
from shared.content_safety_service import ContentSafetyService

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    
    try:
        req_body = req.get_json()
    except ValueError:
        return func.HttpResponse(
            json.dumps({"error": "Invalid request body"}),
            mimetype="application/json",
            status_code=400
        )
    
    # Obtener el texto del prompt y las opciones de procesamiento
    text = req_body.get('text')
    options = req_body.get('options', {})
    
    if not text:
        return func.HttpResponse(
            json.dumps({"error": "No text provided"}),
            mimetype="application/json",
            status_code=400
        )
    
    # Inicializar servicios
    language_service = LanguageService()
    openai_service = OpenAIService()
    content_safety_service = ContentSafetyService()
    
    result = {
        "original_text": text,
        "processed_text": text
    }
    
    # Detectar idioma si se solicita
    if options.get('detect_language', True):
        language_info = language_service.detect_language(text)
        result["language_info"] = language_info
        language_code = language_info.get("language_code")
    else:
        language_code = options.get('language_code', 'es')
    
    # Corregir ortografía si se solicita
    if options.get('spell_check', True):
        corrected = language_service.spell_check(text, language_code)
        result["processed_text"] = corrected.get("corrected_text", text)
    
    # Analizar sentimiento si se solicita
    if options.get('sentiment_analysis', False):
        sentiment = language_service.analyze_sentiment(result["processed_text"], language_code)
        result["sentiment"] = sentiment
    
    # Normalizar texto si se solicita
    if options.get('normalize_text', False):
        normalized = openai_service.normalize_text(
            result["processed_text"], 
            options.get('normalization_instructions')
        )
        result["processed_text"] = normalized.get("normalized_text", result["processed_text"])
    
    # Analizar seguridad del contenido si se solicita
    if options.get('content_safety', True):
        safety_result = content_safety_service.analyze_content(result["processed_text"])
        result["safety"] = safety_result
        
        # Si el contenido no es seguro y se ha solicitado filtrado
        if options.get('filter_unsafe', True) and not safety_result.get("is_safe", True):
            result["is_filtered"] = True
            result["processed_text"] = "⚠️ El contenido ha sido filtrado por motivos de seguridad."
    
    return func.HttpResponse(
        json.dumps(result),
        mimetype="application/json"
    )
