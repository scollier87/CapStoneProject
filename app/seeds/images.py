from app.models import db, Image
from datetime import datetime

def seed_images():
    demo_image_1 = Image(parent_id=1, image_url='https://babysittingneeds.s3.us-west-1.amazonaws.com/Screen+Shot+2021-09-21+at+8.06.59+PM.png')
    demo_image_2 = Image(parent_id=1, image_url='https://babysittingneeds.s3.us-west-1.amazonaws.com/Screen+Shot+2021-09-21+at+8.07.22+PM.png')
    demo_image_3 = Image(parent_id=2, image_url='https://babysittingneeds.s3.us-west-1.amazonaws.com/boy-59171_1920.jpg')
    demo_image_4 = Image(parent_id=3, image_url='https://babysittingneeds.s3.us-west-1.amazonaws.com/kid-5844285_1920.jpg')

    db.session.add(demo_image_1)
    db.session.add(demo_image_2)
    db.session.add(demo_image_3)
    db.session.add(demo_image_4)

    db.session.commit()

def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()