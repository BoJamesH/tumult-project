from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired
from app.models import Server

class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])

    # owner_id = IntegerField('owner_id', validators=[DataRequired()])
    private = BooleanField('private')

