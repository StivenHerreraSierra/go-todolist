package responses

import (
	"encoding/json"
	"log"
)

type ErrorResponse struct {
	Err string `json:"error"`
}

func ReportError(message string) []byte {
	jsonMessage, err := json.Marshal(ErrorResponse{
		Err: message,
	})

	if err != nil {
		log.Println(err)
	}

	return jsonMessage
}
