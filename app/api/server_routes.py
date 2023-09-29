from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Server, db
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
def create_server():
    """
    Create a new server
    """
    print(current_user)
    user_id = int(current_user.get_id())
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_server = Server(
            name = data['name'],
            owner_id = user_id,
            label_image = data['label_image'],
            private = data['private'],
        )
        db.session.add(new_server)
        db.session.commit()
        return new_server.to_dict()
    return

# Route to delete a server
@server_routes.route('/<server_id>', methods=['DELETE'])
@login_required
def delete_server(server_id):
    server_to_delete = Server.query.get(server_id)
    db.session.delete(server_to_delete)
    db.session.commit()
    return {'message': 'Server deleted'}

@server_routes.route('/<server_id>', methods=['PUT'])
@login_required
def update_server(server_id):
    """
    Update an existing server
    """
    user_id = int(current_user.get_id())
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server_to_update = Server.query.get(server_id)
        data = form.data
        server_to_update.name = data['name']
        server_to_update.owner_id = user_id
        server_to_update.label_image = data['label_image']
        server_to_update.private = data['private']
        db.session.commit()
        return 'Server updated'
    return
