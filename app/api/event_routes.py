from app.models import event
from flask import Blueprint, request
from ..models import Event, Booking, User, db
# from datetime import datetime

event_routes = Blueprint('events', __name__)

@event_routes.route('')
def events():
    events = Event.query.all()
    bookings = Booking.query.all()

    # events = db.session.query(Event, User).join(User).all()
    # bookings = db.session.query(Booking, User).join(User).all()
    # return {"events":[event.to_dict() for event in events]}
    return {'events': [ {
        'id' : event.id,
        'owner_id' : event.owner.id,
        'event_time' : event.event_time,
        'duration' :event.duration,
        'how_many_kids' : event.how_many_kids,
        'description' : event.description,
        'cost' : event.cost,
        'created_at' : event.created_at,
        'bookings' : [ {
            'id' : booking.id,
            'owner_id' : booking.owner.id,
            'event_id' : booking.event.id,
            'first_name' : booking.first_name,
            'last_name' : booking.last_name,
            'created_at' : booking.created_at,
         }
        for booking in bookings if booking.event_id == event.id]
    } for event in events]}

@event_routes.route('', methods=['POST'])
def new_event():
    event = Event (
        owner_id=int(request.json['owner_id']),
        event_time=request.json['event_time'],
        duration=request.json['duration'],
        how_many_kids=request.json['how_many_kids'],
        description=request.json['description'],
        cost=request.json['cost'],
        created_at=request.json['created_at'],
        )
    db.session.add(event)
    db.session.commit()

    return event.to_dict()

@event_routes.route('/<int:id>', methods=['PUT'])
def edit_event(id):
    event = Event.query.get(id)
    event.event_time=request.json['event_time']
    event.duration=request.json['duration']
    event.how_many_kids=request.json['how_many_kids']
    event.description=request.json['description']
    event.cost=request.json['cost']

    db.session.add(event)
    db.session.commit()

    return event.to_dict()

@event_routes.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    event = Event.query.get(id)

    db.session.delete(event)
    db.session.commit()

    return {}