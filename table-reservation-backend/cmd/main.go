package main

import (
	"log"
	"os"

	"github.com/autosuwan/table-reservation/table-reservation-backend/config"
	"github.com/autosuwan/table-reservation/table-reservation-backend/internal/domain/reservations"
	reservationRoutes "github.com/autosuwan/table-reservation/table-reservation-backend/internal/server/routes/reservations"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
	}

	// Connect to database
	client, err := config.ConnectDatabase()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Get database instance
	dbName := os.Getenv("MONGODB_DATABASE")
	if dbName == "" {
		dbName = "table_reservation" // default database name
	}
	db := client.Database(dbName)

	// Setup domains (dependency injection)
	reservationHandler := reservations.Setup(db)

	// Setup Gin router
	router := gin.Default()

	// Setup CORS middleware
	allowedOrigins := []string{"http://localhost:3000"}
	if frontendURL := os.Getenv("FRONTEND_URL"); frontendURL != "" {
		allowedOrigins = append(allowedOrigins, frontendURL)
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Setup routes
	reservationRoutes.SetupRoutes(router, reservationHandler)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	log.Printf("Server is running on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
