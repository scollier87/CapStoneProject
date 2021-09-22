from app.models import db, Review
from datetime import datetime

def seed_reviews():
    demo_review_1 = Review(owner_id=1, body="Had a wonderful time with your kids, keep in touch.")
    demo_review_2 = Review(owner_id=2, body="The baby was wonderful. Thank you for the experience.")
    demo_review_3 = Review(owner_id=3, body="The young one was rough, but we got through it. Keep me in your contacts!")

    db.session.add(demo_review_1)
    db.session.add(demo_review_2)
    db.session.add(demo_review_3)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()