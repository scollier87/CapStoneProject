from .db import db
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship
from .user import User
import datetime
# from .booking import Booking

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    event_time = db.Column(db.DateTime, nullable=False)
    how_many_kids = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    created_at =db.Column(db.DateTime, default=datetime.datetime.utcnow)


    owner = relationship("User", back_populates="events")
    bookings = relationship("Booking", back_populates="event")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'event_time': self.event_time,
            'how_many_kids': self.how_many_kids,
            'description': self.description,
            'cost': self.cost,
            'created_at': self.created_at,
            # 'bookings': self.bookings.to_dict(),
        }