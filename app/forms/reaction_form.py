from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ReactionForm(FlaskForm):
    reaction_type = StringField('reaction_type', validators=[DataRequired()])
