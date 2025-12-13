package reservations

import "github.com/gin-gonic/gin"

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) CreateReservation(c *gin.Context) {
	var dto CreateReservationDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.Create(c, dto); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Reservation created successfully"})
}

func (h *Handler) GetReservations(c *gin.Context) {
	reservations, err := h.service.Get(c)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"data":  reservations,
		"count": len(reservations),
	})
}

func (h *Handler) GetQueueLength(c *gin.Context) {
	queueLength, err := h.service.GetQueueLength(c)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"data": queueLength})
}
