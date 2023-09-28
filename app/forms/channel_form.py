from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, InputRequired

class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()], )
    private = BooleanField('private')
