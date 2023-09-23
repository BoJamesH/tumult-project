from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_servers():
    server1 = Server(
        name='Server1', owner_id=1, label_image='fakeurl', private=False)
    server2 = Server(
        name='Server2', owner_id=2, label_image='fakeurl', private=False)
    server3 = Server(
        name='Server3', owner_id=3, label_image='fakeurl', private=False)
    server4 = Server(
        name='Server4', owner_id=4, label_image='fakeurl', private=False)
    server5 = Server(
        name='Server1', owner_id=5, label_image='fakeurl', private=False)
    server6 = Server(
        name='Server1', owner_id=4, label_image='fakeurl', private=False)


    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
