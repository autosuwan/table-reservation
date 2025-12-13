package reservations

import (
	"context"

)

type Repository interface {
	CreateReservation(ctx context.Context, r *Reservation) error
	FindAllReservation(ctx context.Context) ([]*Reservation, error)
	GetQueueLength(ctx context.Context) (int, error)
}