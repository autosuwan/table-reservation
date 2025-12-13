package reservations

import (
	"context"
)

type Service interface {
	Create(ctx context.Context, input CreateReservationDTO) error
	Get(ctx context.Context) ([]*Reservation, error)
	GetQueueLength(ctx context.Context) (int, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo: repo}
}

func (s *service) Create(ctx context.Context, input CreateReservationDTO) error {
	reservation := &Reservation{
		People:        input.People,
		ReservedAt:    input.ReservedAt,
		ReservationID: input.ReservationID,
		Status:        input.Status,
	}

	return s.repo.CreateReservation(ctx, reservation)
}

func (s *service) Get(ctx context.Context) ([]*Reservation, error) {
	return s.repo.FindAllReservation(ctx)
}

func (s *service) GetQueueLength(ctx context.Context) (int, error) {
	return s.repo.GetQueueLength(ctx)
}
