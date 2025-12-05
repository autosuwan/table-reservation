package reservations

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Reservation struct {
    ID primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
    People int `bson:"people" json:"people"`
	ReservedAt time.Time `bson:"reserved_at" json:"reserved_at"`
	ReservationID string `bson:"reservation_id" json:"reservation_id"`
}
