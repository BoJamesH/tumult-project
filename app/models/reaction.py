from .db import db, environment, SCHEMA
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

class Reaction(db.Model):
    __tablename__ = 'reactions'

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reaction_type = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    message = db.relationship('Message', back_populates='reactions')
    user = db.relationship('User', back_populates='reactions')

    def to_dict(self):
        return {
            'id': self.id,
            'message_id': self.message_id,
            'user_id': self.user_id,
            'reaction_type': self.reaction_type,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
