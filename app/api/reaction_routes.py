from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, db, Reaction
from app.forms.reaction_form import ReactionForm

reaction_routes = Blueprint('reactions', __name__)

@reaction_routes.route('/<message_id>', methods=['POST'])
@login_required
def post_reaction(message_id):
    """
    Post a new reaction to a message
    """
    user_id = current_user.get_id()

    form = ReactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_reaction = Reaction(
            user_id = user_id,
            message_id = message_id,
            reaction_type = data['reaction_type']
        )
        db.session.add(new_reaction)
        db.session.commit()
        return {"Success": "Reaction creation success"}
    return {"Error": "Reaction creation failed"}

@reaction_routes.route('/<reaction_id>', methods=['DELETE'])
@login_required
def delete_reactions(reaction_id):
    """
    Delete a reaction
    """
    reaction_to_delete = Reaction.query.get(reaction_id)
    db.session.delete(reaction_to_delete)
    db.session.commit()
    return {'message': 'Reaction deleted'}

@reaction_routes.route('')
@login_required
def get_reactions():
    """
    Get ALL THE REACTIONS!!!
    """
    reactions = Reaction.query.all()
    return {'reactions': [reaction.to_dict() for reaction in reactions]}
