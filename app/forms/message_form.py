from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class MessageForm(FlaskForm):
    message_text = StringField('message_text', validators=[DataRequired()])
