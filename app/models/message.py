from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

class Message(db.Model):
    __tablename__ = 'messages'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')))
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')))
    message_text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = db.relationship('User', back_populates='user_messages')
    channel = db.relationship('Channel', back_populates='channel_messages')
    message_reactions = db.relationship('Reaction', back_populates='message')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_id': self.server_id,
            'channel_id': self.channel_id,
            'message_text': self.message_text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
