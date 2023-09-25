# app/api/channel_routes.py

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Channel, db
from app.forms.channel_form import ChannelForm

channel_routes = Blueprint('channels', __name__)

# Route to get all channels
@channel_routes.route('/<server_id>')
@login_required
def get_channels(server_id):
    """
    Get all the channels for a given server
    """
    channels = Channel.query.filter(Channel.server_id == server_id).all()
    return {'channels': [channel.to_dict() for channel in channels]}
    # return [channel.to_dict() for channel in channels]

# Route to create a new channel
@channel_routes.route('/<server_id>', methods=['POST'])
@login_required
def create_channel(server_id):
    """
    Create a new channel
    """
    form['csrf_token'].data = request.cookies['csrf_token']
    user_id = int(current_user.get_id())
    form = ChannelForm()
    if form.validate_on_submit():
        data = form.data
        new_channel = Channel(
            name = data['name'],
            owner_id = user_id,
            server_id = server_id,
            private = data['private'],
        )
        db.session.add(new_channel)
        db.session.commit()
        # return new_channel.to_dict()
        return 'Channel created'
    return

# Route to update a channel
@channel_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_channel(id):
    data = request.json
    channel = Channel.query.get(id)
    channel.name = data['name']
    # Other fields should be updated here
    db.session.commit()
    return channel.to_dict()

# Route to delete a channel
@channel_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_channel(id):
    channel = Channel.query.get(id)
    db.session.delete(channel)
    db.session.commit()
    return {'message': 'Channel deleted'}
