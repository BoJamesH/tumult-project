from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channels():
    channel1 = Channel(
        name='channel1', owner_id=1, server_id=1, private=False)
    channel2 = Channel(
        name='channel1', owner_id=2, server_id=2, private=False)
    channel3 = Channel(
        name='channel1', owner_id=3, server_id=3, private=False)
    channel4 = Channel(
        name='channel1', owner_id=4, server_id=4, private=False)
    channel5 = Channel(
        name='channel1', owner_id=5, server_id=5, private=False)
    channel6 = Channel(
        name='channel1', owner_id=4, server_id=6, private=False)
    channel7 = Channel(
        name='channel2', owner_id=1, server_id=1, private=False)
    channel8 = Channel(
        name='channel2', owner_id=2, server_id=2, private=False)


    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)
    db.session.add(channel7)
    db.session.add(channel8)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
