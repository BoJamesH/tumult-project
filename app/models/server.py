from .db import db, environment, SCHEMA
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    label_image = db.Column(db.String)
    private = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    owner = db.relationship('User', back_populates='owned_servers')
    server_member = db.relationship('User', back_populates='server_membership')

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

server_member = db.Table(
    "server_members",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("server_id", db.Integer, db.ForeignKey("servers.id"), primary_key=True)
)
