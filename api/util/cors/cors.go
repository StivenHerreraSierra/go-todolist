package cors

import (
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func EnableCors(w *http.ResponseWriter) {
	godotenv.Load()

	(*w).Header().Set("Access-Control-Allow-Origin", os.Getenv("FRONTEND-ORIGIN"))
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
}
