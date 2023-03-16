from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    image_url = db.Column(db.String)

    parent = relationship("User", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'parent_id': self.parent_id,
            'image_url': self.image_url
        }