from app.models import image
from flask import Blueprint, request
from ..models import Image, db


image_routes = Blueprint('images', __name__)

@image_routes.route('')
def images():
    images = Image.query.all()

    return {'images': [ {
        'id' : image.id,
        'parent_id' : image.parent_id,
        'image_url' : image.image_url,
    } for image in images]}

@image_routes.route('', methods=['POST'])
def new_image():
    image = Image (
        parent_id=int(request.json['parent_id']),
        image_url=request.json['image_url']
        )
    db.session.add(image)
    db.session.commit()

    return image.to_dict()

@image_routes.route('/<int:id>', methods=['PUT'])
def edit_image(id):
    image = Image.query.get(id)
    image.parent_id=request.json['parent_id']
    image.image_url=request.json['image_url']

    db.session.add(image)
    db.session.commit()

    return image.to_dict()

@image_routes.route('/<int:id>', methods=['DELETE'])
def delete_image(id):
    image = Image.query.get(id)

    db.session.delete(image)
    db.session.commit()

    return {}