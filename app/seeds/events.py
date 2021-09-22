from app.models import db, Event
from datetime import datetime

def seed_events():
    demo_event_1 = Event(owner_id=1, event_time=datetime(2021, 9, 21, 12, 0, 0), how_many_kids=3, description='I need a babysitter for 3 wonderful kids. They enjoy home-cooked food and will usually fall asleep around 8pm. The name of the children are Addison, James and Charlotte. Thanks for your interest.', cost=30)
    demo_event_2 = Event(owner_id=2, event_time=datetime(2021, 9, 22,  12, 0, 0), how_many_kids=1, description='I would like a babysitter for 1 monster of a kid. The time will be to be determined. Cost is negotiable! Please Help.', cost=45)
    demo_event_3 = Event(owner_id=3, event_time=datetime(2021, 9, 22, 5, 3, 4), how_many_kids=1, description='I need help with a 4 month old. I work nights and need someone overnight. It will be for 8 hours. Thanks in advance.', cost=40)

    db.session.add(demo_event_1)
    db.session.add(demo_event_2)
    db.session.add(demo_event_3)

    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()