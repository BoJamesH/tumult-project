from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    label_image = StringField('label_image', validators=[DataRequired()])
    private = BooleanField('private')
