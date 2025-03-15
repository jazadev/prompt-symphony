import os
from openai import AzureOpenAI
import json
import logging
import re

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def validate_azure_config():
    api_key = os.environ.get("AZURE_OPENAI_KEY")
    endpoint = os.environ.get("AZURE_OPENAI_ENDPOINT")

    if not api_key:
        raise ValueError("No se ha proporcionado la clave API de Azure OpenAI")
    if not endpoint:
        raise ValueError("No se ha proporcionado el endpoint de Azure OpenAI")

    # Asegurar que el endpoint tenga el formato correcto
    logger.debug(f"Endpoint original: {endpoint}")
    if not endpoint.startswith("https://"):
        # Intentar corregir el formato del endpoint
        if not endpoint.startswith("http://"):
            endpoint = f"https://{endpoint}"
        else:
            endpoint = f"https://{endpoint[7:]}"
        os.environ["AZURE_OPENAI_ENDPOINT"] = endpoint
        logger.debug(f"Endpoint corregido: {endpoint}")

    # Asegurar que el endpoint no termina en barra
    if endpoint.endswith("/"):
        endpoint = endpoint[:-1]
        os.environ["AZURE_OPENAI_ENDPOINT"] = endpoint
        logger.debug("Se removió la barra final del endpoint")

    logger.debug(f"Endpoint configurado: {endpoint}")
    return True


def analyze_prompt(text):
    try:
        validate_azure_config()

        api_key = os.environ.get("AZURE_OPENAI_KEY")
        endpoint = os.environ.get("AZURE_OPENAI_ENDPOINT")

        logger.debug(f"Analizando prompt: {text}")
        logger.debug(f"Usando endpoint de Azure: {endpoint}")

        client = AzureOpenAI(
            api_key=api_key,
            api_version="2024-02-15-preview",
            azure_endpoint=endpoint)

        try:
            logger.debug("Intentando conectar con Azure OpenAI...")
            response = client.chat.completions.create(
                model="gpt-4-turbo",  # nombre del deployment en Azure
                messages=[{
                    "role":
                    "system",
                    "content":
                    """Analiza el siguiente prompt y proporciona un análisis detallado en formato JSON con:
                        - Errores gramaticales encontrados
                        - Contenido potencialmente dañino o sesgado
                        - Sugerencias de mejora
                        - Claridad general del prompt
                        Responde en el siguiente formato:
                        {
                            "grammar_issues": [lista de problemas],
                            "ethical_concerns": [lista de preocupaciones],
                            "improvement_suggestions": [lista de sugerencias],
                            "clarity_score": número del 1-10,
                            "improved_prompt": "versión mejorada del prompt"
                        }"""
                }, {
                    "role": "user",
                    "content": text
                }],
                response_format={"type": "json_object"})
            logger.debug("Respuesta recibida de Azure OpenAI")
            logger.debug(
                f"Contenido de la respuesta: {response.choices[0].message.content}"
            )

            return json.loads(response.choices[0].message.content)
        except Exception as api_error:
            logger.error(
                f"Error en la llamada a la API de Azure: {str(api_error)}")
            if hasattr(api_error, 'response'):
                logger.error(
                    f"Detalles de la respuesta de error: {api_error.response}")
            raise Exception(
                f"Error en la llamada a Azure OpenAI: {str(api_error)}")
    except ValueError as e:
        logger.error(f"Error de validación: {str(e)}")
        raise Exception(f"Error de configuración: {str(e)}")
    except Exception as e:
        logger.error(f"Error general al analizar con Azure OpenAI: {str(e)}")
        raise Exception(f"Error al analizar con Azure OpenAI: {str(e)}")