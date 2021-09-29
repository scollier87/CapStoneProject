from .db import db
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship
class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)

    owner = relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'body': self.body,
            'created_at': self.created_at
        }