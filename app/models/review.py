from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer)
    body = db.Column(db.String(250))
    created_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'body': self.body,
            'created_at': self.created_at
        }