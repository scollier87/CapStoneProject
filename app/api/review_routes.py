from app.models import review
from flask import Blueprint, request
from ..models import Review, User, db

review_routes = Blueprint('reviews', __name__)

@review_routes.route('')
def reviews():
    reviews = Review.query.all()
    users = User.query.all()

    return {'reviews': [ {
        'id' : review.id,
        'owner_id' : review.owner.id,
        'body' : review.body,
        'created_at': review.created_at,
        'users' : [ {
            'id' : user.id,
            'parent_pic' : user.parent_pic,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        for user in users if user.id == review.owner_id]
    } for review in reviews]}

@review_routes.route('', methods=['POST'])
def new_review():
    review = Review (
        owner_id=int(request.json['owner_id']),
        body=request.json['body'],
        created_at=request.json['created_at'],
        )
    db.session.add(review)
    db.session.commit()

    return review.to_dict()

@review_routes.route('/<int:id>', methods=['PUT'])
def edit_review(id):
    review = Review.query.get(id)
    review.body=request.json['body']
    review.created_at=request.json['created_at']

    db.session.add(review)
    db.session.commit()

    return review.to_dict()

@review_routes.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()

    return {}