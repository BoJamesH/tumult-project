from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reactions():
    reaction1 = Reaction(
        message_id=1, user_id=1, reaction_type='1f60e')
    reaction2 = Reaction(
        message_id=2, user_id=2, reaction_type='1f1eb-1f1ee')
    reaction3 = Reaction(
        message_id=3, user_id=3, reaction_type='1f60e')
    reaction4 = Reaction(
        message_id=4, user_id=4, reaction_type='1f60e')
    reaction5 = Reaction(
        message_id=5, user_id=5, reaction_type='1f480')
    reaction6 = Reaction(
        message_id=5, user_id=6, reaction_type='1f480')


    db.session.add(reaction1)
    db.session.add(reaction2)
    db.session.add(reaction3)
    db.session.add(reaction4)
    db.session.add(reaction5)
    db.session.add(reaction6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()
