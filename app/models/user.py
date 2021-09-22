from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship
from .review import Review


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    parent_pic = db.Column(db.String)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=True)
    last_name = db.Column(db.String(30), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    bookings = relationship("Booking", back_populates="owner")
    events = relationship("Event", back_populates="owner")
    images = relationship("Image", back_populates="parent")
    reviews = relationship("Review", back_populates="owner")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'parent_pic': self.parent_pic,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            # 'review_id': self.review_id
        }
