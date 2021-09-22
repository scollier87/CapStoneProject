from app.models import db, Booking
from datetime import datetime

def seed_bookings():
    demo_booking_1 = Booking(owner_id=1, event_id=3, first_name='Sean', last_name='Collier', created_at=datetime(2021, 9, 22, 12, 0, 5))
    demo_booking_2 = Booking(owner_id=3, event_id=2, first_name='Bobby', last_name='Jones', created_at=datetime(2021, 9, 22, 12, 1, 0))
    demo_booking_3 = Booking(owner_id=2, event_id=1, first_name='Marnie', last_name='Barnes', created_at=datetime(2021, 9, 21, 12, 0, 5))

    db.session.add(demo_booking_1)
    db.session.add(demo_booking_2)
    db.session.add(demo_booking_3)

    db.session.commit()

def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()