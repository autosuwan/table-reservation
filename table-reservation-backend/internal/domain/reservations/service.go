package reservations

import (
	"context"
)

type Service interface {
	CreateReservation(ctx context.Context, input CreateReservationDTO) error
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo: repo}
}

func (s *service) CreateReservation(ctx context.Context, input CreateReservationDTO) error {
	// Convert DTO to Reservation model
	reservation := &Reservation{
		People:        input.People,
		ReservedAt:    input.ReservedAt,
		ReservationID: input.ReservationID,
	}

	return s.repo.CreateReservation(ctx, reservation)
}
