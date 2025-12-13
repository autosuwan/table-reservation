package reservations

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type repository struct {
	db         *mongo.Database
	collection *mongo.Collection
}

// NewRepository creates a new instance of Repository
func NewRepository(db *mongo.Database) Repository {
	return &repository{
		db:         db,
		collection: db.Collection("reservations"),
	}
}

// CreateReservation inserts a new reservation into the database
func (r *repository) CreateReservation(ctx context.Context, reservation *Reservation) error {
	_, err := r.collection.InsertOne(ctx, reservation)
	return err
}

// FindAllReservation retrieves all reservations from the database
func (r *repository) FindAllReservation(ctx context.Context) ([]*Reservation, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var reservations []*Reservation
	if err := cursor.All(ctx, &reservations); err != nil {
		return nil, err
	}

	return reservations, nil
}

func (r *repository) GetQueueLength(ctx context.Context) (int, error) {
	count, err := r.collection.CountDocuments(ctx, bson.M{})
	if err != nil {
		return 0, err
	}

	return int(count), nil
}
