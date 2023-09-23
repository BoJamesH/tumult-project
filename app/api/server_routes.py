from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Server

server_routes = Blueprint('servers', __name__)

@server_routes.route('')
@login_required
def all_public_servers():
    """
    Get all public servers.
    """
    public_servers = Server.query.filter(Server.private == False).all()
    return {'servers': [server.to_dict() for server in public_servers]}


@server_routes.route('/<server_id>')
@login_required
def single_server(server_id):
    """
    Get single server
    """
    single_server = Server.query.filter(Server.id == server_id)[0]
    return single_server.to_dict()
