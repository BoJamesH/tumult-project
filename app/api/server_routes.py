from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Server
from app.forms.server_form import ServerForm

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

@server_routes.route('', methods=['POST'])
@login_required
def create_server(new_server):
    """
    Create a new server
    """
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
