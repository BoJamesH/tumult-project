from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ReactionForm(FlaskForm):
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    # message_id = IntegerField('message_id')
    reaction_type = StringField('reaction_type', validators=[DataRequired()])
