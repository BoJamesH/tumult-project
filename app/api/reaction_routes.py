from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db, Reaction
from app.forms.reaction_form import ReactionForm

reaction_routes = Blueprint('reactions', __name__)

@reaction_routes.route('', methods=['POST'])
@login_required
def post_reaction(message_id):
    """
    Post a new reaction to a message
    """
    user_id = int(current_user.get_id())
    form = ReactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print(data)
        new_reaction = Reaction(
            user_id = user_id,
            message_id = int(message_id),
            reaction_type = data['reaction_type']
        )
        db.session.add(new_reaction)
        db.session.commit()
        return {"Success": "Reaction creation success"}
    return {"Error": "Reaction creation failed"}
