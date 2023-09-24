from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_messages():
    message1 = Message(
        user_id=1, server_id=1, channel_id=1, message_text='Hello')
    message2 = Message(
        user_id=2, server_id=2, channel_id=2, message_text='How are you?')
    message3 = Message(
        user_id=3, server_id=3, channel_id=3, message_text='See you Later')
    message4 = Message(
        user_id=4, server_id=4, channel_id=4, message_text='Hola')
    message5 = Message(
        user_id=5, server_id=5, channel_id=5, message_text='Bonjour')
    message6 = Message(
        user_id=6, server_id=6, channel_id=6, message_text='Nihao')
    message7 = Message(
        user_id=5, server_id=1, channel_id=1, message_text='Guuntag')
    message8 = Message(
        user_id=6, server_id=2, channel_id=2, message_text='Sayanora')


    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
