from flask import Blueprint, jsonify, request

bp = Blueprint('route1', __name__, url_prefix='/api/v1')

@bp.route('/items', methods=['GET'])
def get_items():
    # Logica 1 
    return jsonify({"items": ["item1", "item2", "item3"]})

@bp.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    # Logica 2
    return jsonify({"message": "Item creado", "item": data}), 201
