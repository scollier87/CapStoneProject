from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship
from .user import User
from .event import Event

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('events.id')), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)

    owner = relationship("User", back_populates="bookings")
    event = relationship("Event", back_populates="bookings")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'event_id': self.event_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'created_at': self.created_at

        }