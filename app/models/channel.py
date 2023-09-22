from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

channel_members = db.Table(
    "channel_members",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("channel_id", db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), primary_key=True)
)

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    server_id = db.Column(db.Integer)
    private = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    channel_owner = db.relationship('User', back_populates='owned_channels')
    channel_member = db.relationship('User', back_populates='channel_membership', secondary=channel_members)
    channel_messages = db.relationship('Message', back_populates='channel')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'server_id': self.server_id,
            'private': self.private,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
