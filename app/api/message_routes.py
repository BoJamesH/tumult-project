from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db, Channel, User
from app.forms.message_form import MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('')
@login_required
def get_channel_messages(server_id, channel_id):
    """
    Get all messages for a channel with user information nested in each message.
    """
    messages = Message.query.filter(Message.channel_id == channel_id).all()

    # Create a list of messages with user information nested inside
    messages_with_users = []
    for message in messages:
        message_dict = message.to_dict()  # Convert the message to a dictionary
        user = User.query.get(message.user_id)  # Assuming user_id is the foreign key in Message
        if user:
            message_dict['user'] = user.to_dict()  # Add user information to the message dictionary
        messages_with_users.append(message_dict)
    return {'messages': messages_with_users}


@message_routes.route('', methods=['POST'])
@login_required
def post_message(server_id, channel_id):
    """
    Post a new message to a channel
    """
    user_id = int(current_user.get_id())
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
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
def delete_message(server_id, channel_id, message_id):
    message_to_delete = Message.query.get(message_id)
    db.session.delete(message_to_delete)
    db.session.commit()
    return {'message': 'Message deleted'}

@message_routes.route('/<message_id>', methods=['PUT'])
@login_required
def update_message(server_id, channel_id, message_id):
    """
    Update an existing message
    """
    user_id = int(current_user.get_id())
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message_to_update = Message.query.get(message_id)
        data = form.data
        message_to_update.message_text = data['message_text']
        message_to_update.user_id = user_id
        db.session.commit()
        return {'message':'message updated'}
    return {'messge':'Failed to update message'}
