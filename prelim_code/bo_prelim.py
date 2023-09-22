from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    email = db.Column(db.String(255))
    display_name = db.Column(db.String(255))
    password = db.Column(db.String(255))
    date_of_birth = db.Column(db.Date(255))
    profile_image = db.Column(db.String(255))

    # Relationships
    servers = db.relationship('Server', back_populates='owner')
    channels = db.relationship('Channel', back_populates='owner')
    messages = db.relationship('Message', back_populates='user')
    reactions = db.relationship('Reaction', back_populates='user')
    direct_messages_sent = db.relationship('DirectMessage', foreign_keys='DirectMessage.sender_id', back_populates='sender')
    direct_messages_received = db.relationship('DirectMessage', foreign_keys='DirectMessage.recipient_id', back_populates='recipient')

class Server(db.Model):
    __tablename__ = 'servers'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    label_image = db.Column(db.String)
    private = db.Column(db.Boolean)

    # Relationships
    owner = db.relationship('User', back_populates='servers')
    messages = db.relationship('Message', back_populates='server')

class Channel(db.Model):
    __tablename__ = 'channels'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    server_id = db.Column(db.Integer)
    label_image = db.Column(db.String)
    private = db.Column(db.Boolean)

    # Relationships
    owner = db.relationship('User', back_populates='channels')
    messages = db.relationship('Message', back_populates='channel')

class Message(db.Model):
    __tablename__ = 'messages'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    server_id = db.Column(db.Integer, db.ForeignKey('servers.id'))
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'))
    message = db.Column(db.Text)

    # Relationships
    user = db.relationship('User', back_populates='messages')
    server = db.relationship('Server', back_populates='messages')
    channel = db.relationship('Channel', back_populates='messages')
    reactions = db.relationship('Reaction', back_populates='message')

class Reaction(db.Model):
    __tablename__ = 'reactions'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_text = db.Column(db.Text)

    # Relationships
    message = db.relationship('Message', back_populates='reactions')
    user = db.relationship('User', back_populates='reactions')

class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    message_text = db.Column(db.Text)

    # Relationships
    sender = db.relationship('User', foreign_keys=[sender_id], back_populates='direct_messages_sent')
    recipient = db.relationship('User', foreign_keys=[recipient_id], back_populates='direct_messages_received')

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'reaction_type': self.reaction_type,
        }
