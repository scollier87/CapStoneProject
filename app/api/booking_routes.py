from app.models import booking
from flask import Blueprint, request
from ..models import Event, Booking, db
# from datetime import datetime

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route('')
def bookings():
    bookings = Booking.query.all()
    events = Event.query.all()

    return {'bookings': [ {
        'id' : booking.id,
        'owner_id' : booking.owner.id,
        'event_id' : booking.event.id,
        'first_name' : booking.first_name,
        'last_name' : booking.last_name,
        'created_at' : booking.created_at,
        'events' : [ {
            'id' : event.id,
            'owner_id' : event.owner.id,
            'event_time' : event.event_time,
            'how_many_kids' : event.how_many_kids,
            'description' : event.description,
            'cost' : event.cost,
            'created_at' : event.created_at,
         }
        for event in events if event.id == booking.event_id]
    } for booking in bookings]}

@booking_routes.route('', methods=['POST'])
def new_booking():
    print('This is working***************')
    booking = Booking (
        owner_id=int(request.json['owner_id']),
        event_id=int(request.json['event_id']),
        first_name=request.json['first_name'],
        last_name=request.json['last_name'],
        created_at=request.json['created_at'],
        )
    db.session.add(booking)
    db.session.commit()

    return booking.to_dict()


@booking_routes.route('/<int:id>', methods=['DELETE'])
def delete_booking(id):
    booking = Booking.query.get(id)

    db.session.delete(booking)
    db.session.commit()

    return {}