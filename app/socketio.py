from flask_socketio import SocketIO, emit
from app.models import Message, db, Reaction
import os

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://tumult.onrender.com",
        "https://tumult.onrender.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

@socketio.on("chat")
def handle_chat(data):
        new_chat = Message(
            message_text = data['message_text'],
            user_id = data['user_id'],
            server_id = data['server_id'],
            channel_id = data['channel_id']
        )

        db.session.add(new_chat)
        db.session.commit()
        emit("chat", data, broadcast=True)

@socketio.on("delete_message")
def delete_message(data):
    message_id = data["message_id"]
    message_to_delete = Message.query.get(message_id)
    db.session.delete(message_to_delete)
    db.session.commit()
    emit("delete_message", data, broadcast=True)

@socketio.on("update_message")
def update_message(data):
    message_id = data["message_id"]
    message_to_update = Message.query.get(message_id)
    message_to_update.message_text = data['message_text']
    db.session.commit()
    emit("update_message", data, broadcast=True)

@socketio.on('post_emoji')
def post_emoji(data):
     new_emoji = Reaction(
          message_id=data['message_id'],
          user_id=data['user_id'],
          reaction_type=data['reaction_type'],
     )
     db.session.add(new_emoji)
     db.session.commit()
     emit('post_emoji', data, broadcast=True)

@socketio.on('delete_emoji')
def delete_emoji(data):
     emoji_to_delete = Reaction.query.get(data['reaction_id'])
     db.session.delete(emoji_to_delete)
     db.session.commit()
     emit('delete_emoji', data, broadcast=True)
