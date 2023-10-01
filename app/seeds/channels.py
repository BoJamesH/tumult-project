from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_channels():

    channel1 = Channel(
        name='general',
        owner_id=1,
        server_id=1,
        private=False
    )

    channel2 = Channel(
        name='general',
        owner_id=2,
        server_id=2,
        private=False
    )

    channel3 = Channel(
        name='general',
        owner_id=3,
        server_id=3,
        private=False
    )

    channel4 = Channel(
        name='general',
        owner_id=4,
        server_id=4,
        private=False
    )

    channel5 = Channel(
        name='general',
        owner_id=5,
        server_id=5,
        private=False
    )

    channel6 = Channel(
        name='general',
        owner_id=1,
        server_id=6,
        private=False
    )

    channel7 = Channel(
        name='general',
        owner_id=2,
        server_id=7,
        private=False
    )

    channel8 = Channel(
        name='general',
        owner_id=3,
        server_id=8,
        private=False
    )

    channel9 = Channel(
        name='general',
        owner_id=4,
        server_id=9,
        private=False
    )

    channel10 = Channel(
        name='general',
        owner_id=5,
        server_id=10,
        private=False
    )

    channel11 = Channel(
        name='general',
        owner_id=1,
        server_id=11,
        private=False
    )

    channel12 = Channel(
        name='general',
        owner_id=2,
        server_id=12,
        private=False
    )

    channel13 = Channel(
        name='general',
        owner_id=3,
        server_id=13,
        private=False
    )

    channel14 = Channel(
        name='general',
        owner_id=4,
        server_id=14,
        private=False
    )

    channel15 = Channel(
        name='general',
        owner_id=5,
        server_id=15,
        private=False
    )

    channel16 = Channel(
        name='general',
        owner_id=1,
        server_id=16,
        private=False
    )

    channel17 = Channel(
        name='general',
        owner_id=2,
        server_id=17,
        private=False
    )

    channel18 = Channel(
        name='general',
        owner_id=3,
        server_id=18,
        private=False
    )

    channel19 = Channel(
        name='general',
        owner_id=4,
        server_id=19,
        private=False
    )

    channel20 = Channel(
        name='general',
        owner_id=5,
        server_id=20,
        private=False
    )


    db.session.add(channel1)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)
    db.session.add(channel7)
    db.session.add(channel8)
    db.session.add(channel9)
    db.session.add(channel10)
    db.session.add(channel11)
    db.session.add(channel12)
    db.session.add(channel13)
    db.session.add(channel14)
    db.session.add(channel15)
    db.session.add(channel16)
    db.session.add(channel17)
    db.session.add(channel18)
    db.session.add(channel19)
    db.session.add(channel20)
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
