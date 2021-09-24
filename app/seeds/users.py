from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username ='Demo_User',parent_pic='https://babysittingneeds.s3.us-west-1.amazonaws.com/Screen+Shot+2021-09-21+at+3.25.53+PM.png', email='demo@aa.io', first_name='Sean', last_name='Collier', password='password')
    marnie = User(
        username='Marnie_User',parent_pic='https://babysittingneeds.s3.us-west-1.amazonaws.com/woman-3083390_1280.jpg', first_name='Marnie', last_name='Barnes', email='marnie@aa.io', password='password')
    bobbie = User(
        username='Bobbie_User',parent_pic='https://babysittingneeds.s3.us-west-1.amazonaws.com/family-2811003_1280.jpg', first_name='Bobby', last_name='Jones', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
