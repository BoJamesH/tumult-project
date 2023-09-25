from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db, Channel
from app.forms.message_form import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('')
@login_required
def get_channel_messages(server_id, channel_id):
    """
    Get all messages for a channel
    """
    messages = Message.query.filter(Message.channel_id == channel_id).all()
    return {'messages': [message.to_dict() for message in messages]}


@message_routes.route('', methods=['POST'])
@login_required
def post_message(server_id, channel_id):
    """
    Post a new message to a channel
    """
    print('SERVERID BACKEND', server_id, 'CHANNELID BACKEND', channel_id)
    user_id = int(current_user.get_id())
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # channel = Channel.query.filter(Channel.id == channel_id)
    # print(channel)
    print('FORM', form)
    print('FORM DATA', form.data)
    if form.validate_on_submit():
        data = form.data
        new_message = Message(
            message_text = data['message_text'],
            user_id = user_id,
            server_id = server_id,
            channel_id = channel_id,
        )
        db.session.add(new_message)
        db.session.commit()
        return {"Success": "Message creation success"}
    return {"Error": "Message creation failed"}

# Route to delete a message
@message_routes.route('/<message_id>', methods=['DELETE'])
@login_required
def delete_message(server_id, channel_id,message_id):
    print("-----MADE IT TO DELETE MESSAGE BACKEND-------")
    message_to_delete = Message.query.get(message_id)
    print('MESSAGE TO DELETE:', message_to_delete)
    db.session.delete(message_to_delete)
    db.session.commit()
    return {'message': 'Message deleted'}

# @message_routes.route('/<server_id>', methods=['PUT'])
# @login_required
# def update_server(server_id):
#     """
#     Update an existing server
#     """
#     user_id = int(current_user.get_id())
#     form = ServerForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         server_to_update = Server.query.get(server_id)
#         data = form.data
#         server_to_update.name = data['name']
#         server_to_update.owner_id = user_id
#         server_to_update.label_image = data['label_image']
#         server_to_update.private = data['private']
#         db.session.commit()
#         return 'Server updated'
#     return
