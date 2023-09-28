from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length

class MessageForm(FlaskForm):
    message_text = StringField('message_text', validators=[DataRequired(), Length(min = 1, max= 4000, message=None)])
