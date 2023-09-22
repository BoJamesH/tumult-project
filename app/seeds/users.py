from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='Demo1', email='demo1@aa.io', password='password', display_name='Demo1')
    demo2 = User(
        username='Demo2', email='demo2@aa.io', password='password', display_name='Demo2')
    ryan = User(
        username='Ryan', email='ryan@aa.io', password='password', display_name='Ryan')
    jordan = User(
        username='Jordan', email='jordan@aa.io', password='password', display_name='Jordan')
    nick = User(
        username='Nick', email='nick@aa.io', password='password', display_name='Nick')
    bo = User(
        username='BoJames', email='bo@aa.io', password='password', display_name='BoJames')


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(jordan)
    db.session.add(ryan)
    db.session.add(nick)
    db.session.add(bo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
