package responses

import (
	"encoding/json"
	"log"
)

type MessageResponse struct {
	Message string `json:"message"`
}

func ReportMessage(message string) []byte {
	jsonMessage, err := json.Marshal(MessageResponse{
		Message: message,
	})

	if err != nil {
		log.Println(err)
	}

	return jsonMessage
}
