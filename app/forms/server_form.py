from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired
from app.models import Server

class ServerForm(FlaskForm):
    sever_name = StringField('name', validators=[DataRequired()])
    server_imageUrl = StringField('password', validators=[DataRequired()])
    server_private = BooleanField('private')
