from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_servers():
    server1 = Server(
        name='Server1',
        owner_id=1,
        label_image='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        private=False
    )

    server2 = Server(
        name='Server2',
        owner_id=2,
        label_image='https://images.pexels.com/photos/3777200/pexels-photo-3777200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        private=False
    )

    server3 = Server(
        name='Server3',
        owner_id=3,
        label_image='https://spaceplace.nasa.gov/gallery-sun/en/solar-flare.en.jpg',
        private=False
    )

    server4 = Server(
        name='Server4',
        owner_id=4,
        label_image='https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
        private=False
    )

    server5 = Server(
        name='Server5',
        owner_id=5,
        label_image='https://media.istockphoto.com/id/636379014/photo/hands-forming-a-heart-shape-with-sunset-silhouette.jpg?s=612x612&w=0&k=20&c=CgjWWGEasjgwia2VT7ufXa10azba2HXmUDe96wZG8F0=',
        private=False
    )

    server6 = Server(
        name='Server6',
        owner_id=6,
        label_image='https://img.freepik.com/premium-photo/planet-earth-illustration_691833-247.jpg?w=360',
        private=False
    )

    server7 = Server(
        name='Server7',
        owner_id=1,
        label_image='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        private=False
    )

    server8 = Server(
        name='Server8',
        owner_id=2,
        label_image='https://images.pexels.com/photos/3777200/pexels-photo-3777200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        private=False
    )

    server9 = Server(
        name='Server9',
        owner_id=3,
        label_image='https://spaceplace.nasa.gov/gallery-sun/en/solar-flare.en.jpg',
        private=False
    )

    server10 = Server(
        name='Server10',
        owner_id=4,
        label_image='https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
        private=False
    )

    server11 = Server(
        name='Server11',
        owner_id=5,
        label_image='https://media.istockphoto.com/id/636379014/photo/hands-forming-a-heart-shape-with-sunset-silhouette.jpg?s=612x612&w=0&k=20&c=CgjWWGEasjgwia2VT7ufXa10azba2HXmUDe96wZG8F0=',
        private=False
    )

    server12 = Server(
        name='Server12',
        owner_id=6,
        label_image='https://img.freepik.com/premium-photo/planet-earth-illustration_691833-247.jpg?w=360',
        private=False
    )

    server13 = Server(
        name='Server13',
        owner_id=1,
        label_image='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        private=False
    )

    server14 = Server(
        name='Server14',
        owner_id=2,
        label_image='https://images.pexels.com/photos/3777200/pexels-photo-3777200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        private=False
    )

    server15 = Server(
        name='Server15',
        owner_id=3,
        label_image='https://spaceplace.nasa.gov/gallery-sun/en/solar-flare.en.jpg',
        private=False
    )

    server16 = Server(
        name='Server16',
        owner_id=4,
        label_image='https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
        private=False
    )

    server17 = Server(
        name='Server17',
        owner_id=5,
        label_image='https://media.istockphoto.com/id/636379014/photo/hands-forming-a-heart-shape-with-sunset-silhouette.jpg?s=612x612&w=0&k=20&c=CgjWWGEasjgwia2VT7ufXa10azba2HXmUDe96wZG8F0=',
        private=False
    )

    server18 = Server(
        name='Server18',
        owner_id=6,
        label_image='https://img.freepik.com/premium-photo/planet-earth-illustration_691833-247.jpg?w=360',
        private=False
    )

    server19 = Server(
        name='Server19',
        owner_id=1,
        label_image='https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        private=False
    )

    server20 = Server(
        name='Server20',
        owner_id=2,
        label_image='https://images.pexels.com/photos/3777200/pexels-photo-3777200.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        private=False
    )

    db.session.add(server1)
    db.session.add(server2)
    db.session.add(server3)
    db.session.add(server4)
    db.session.add(server5)
    db.session.add(server6)
    db.session.add(server7)
    db.session.add(server8)
    db.session.add(server9)
    db.session.add(server10)
    db.session.add(server11)
    db.session.add(server12)
    db.session.add(server13)
    db.session.add(server14)
    db.session.add(server15)
    db.session.add(server16)
    db.session.add(server17)
    db.session.add(server18)
    db.session.add(server19)
    db.session.add(server20)
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
