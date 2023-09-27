from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

server_members = db.Table(
    "server_members",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column("server_id", db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True)
)

if environment == "production":
	server_members.schema = SCHEMA

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    label_image = db.Column(db.String)
    private = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner = db.relationship('User', back_populates='owned_servers')
    server_channels = db.relationship('Channel', back_populates='channel_servers', cascade='all, delete-orphan')
    server_member = db.relationship('User', back_populates='server_membership', secondary=server_members)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'owner_id': self.owner_id,
            'label_image': self.label_image,
            'private': self.private,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
