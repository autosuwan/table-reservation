package reservations

import "time"

type CreateReservationDTO struct {
	People int `json:"people"`
	ReservedAt time.Time `json:"reserved_at"`
	ReservationID string `json:"reservation_id"`
}