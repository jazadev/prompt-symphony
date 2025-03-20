import azure.functions as func
import logging
from flask import Flask, request

# Inicializar la aplicación Flask
app = Flask(__name__)

# Importar rutas de tu aplicación original
from .routes import route1, route2

# Registrar los blueprints
app.register_blueprint(route1.bp)
app.register_blueprint(route2.bp)

# Función principal para HTTP trigger
def main(req: func.HttpRequest) -> func.HttpResponse:
    """Cada solicitud HTTP a tu función se reenviará a tu aplicación Flask."""
    logging.info('Python HTTP trigger function processed a request.')
    
    # Crear un objeto de contexto Flask compatible
    ctx = app.test_request_context(
        path=req.route_params.get('route', ''),
        method=req.method,
        query_string=req.params
    )
    
    with ctx:
        # Procesar la solicitud con Flask
        try:
            response = app.full_dispatch_request()
            return func.HttpResponse(
                response.get_data(),
                status_code=response.status_code,
                headers=dict(response.headers)
            )
        except Exception as e:
            logging.error(f"Error: {str(e)}")
            return func.HttpResponse(
                f"Error procesando la solicitud: {str(e)}",
                status_code=500
            )
