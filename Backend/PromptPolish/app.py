import os
import logging
from flask import Flask, render_template, request, jsonify
from services.prompt_analyzer import analyze_prompt

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        prompt = request.json.get('prompt', '')
        if not prompt:
            return jsonify({'error': 'El prompt no puede estar vacío'}), 400

        analysis = analyze_prompt(prompt)
        return jsonify(analysis)
    except Exception as e:
        error_message = str(e)
        if "clave API" in error_message:
            error_message = "Error de configuración: La clave API de Azure OpenAI no es válida. Por favor, asegúrate de proporcionar una clave que comience con 'sk-'"
        elif "endpoint" in error_message.lower():
            error_message = "Error de configuración: El endpoint de Azure OpenAI no tiene el formato correcto. Por favor, asegúrate de que comience con 'https://'"
        logger.error(f"Error al analizar prompt: {error_message}")
        return jsonify({'error': error_message}), 500