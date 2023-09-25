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
    user_id = int(current_user.get_id())
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("HIT ROUTE", form)
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
        return new_channel.to_dict()
        # return new_channel
    return 'Channel creation failed'

# Route to update a channel
@channel_routes.route('/<channel_id>', methods=['PUT'])
@login_required
def update_channel(channel_id):
    """
    Update a exisiting Channel
    """
    form = ChannelForm()
    print("FORM DATA", form.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        channel_to_update = Channel.query.get(channel_id)
        data = form.data
        channel_to_update.name = data['name']
        channel_to_update.private = data['private']
        # Other fields should be updated here
        db.session.commit()
        return channel_to_update.to_dict()
    return

# Route to delete a channel
@channel_routes.route('/<channel_id>', methods=['DELETE'])
@login_required
def delete_channel(channel_id):
    channel = Channel.query.get(channel_id)
    db.session.delete(channel)
    db.session.commit()
    return {'message': 'Channel deleted'}
