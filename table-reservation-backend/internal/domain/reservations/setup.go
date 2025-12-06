package reservations

import "go.mongodb.org/mongo-driver/mongo"

// Setup initializes all dependencies for the reservations domain
// and returns a configured Handler ready to be used in routes
func Setup(db *mongo.Database) *Handler {
	// Create repository with database connection
	repo := NewRepository(db)

	// Create service with repository dependency
	service := NewService(repo)

	// Create handler with service dependency
	handler := NewHandler(service)

	return handler
}
