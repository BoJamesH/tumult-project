from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    reaction_type = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    # # Strugglebus
    message = db.relationship('Message', back_populates='message_reactions')
    user = db.relationship('User', back_populates='user_reactions')

    def to_dict(self):
        return {
            'id': self.id,
            'message_id': self.message_id,
            'user_id': self.user_id,
            'reaction_type': self.reaction_type,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
