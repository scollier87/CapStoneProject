from app.models import db, Event
from datetime import datetime

def seed_events():
    demo_event_1 = Event(owner_id=1, event_time=datetime(2021, 9, 21, 12, 0, 0), how_many_kids=3, description='')