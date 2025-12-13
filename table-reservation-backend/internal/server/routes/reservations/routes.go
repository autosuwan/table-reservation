package reservations

import (
	"github.com/autosuwan/table-reservation/table-reservation-backend/internal/domain/reservations"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, reservationHandler *reservations.Handler) {
	v1 := router.Group("/api/v1")
	{
		reservationRoutes := v1.Group("/reservations")
		{
			reservationRoutes.POST("", reservationHandler.CreateReservation)
			reservationRoutes.GET("", reservationHandler.GetReservations)
			reservationRoutes.GET("/queue-length", reservationHandler.GetQueueLength)
		}
	}

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "Table Reservation API is running",
		})
	})
}
