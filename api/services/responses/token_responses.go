package responses

import "encoding/json"

type TokenResponse struct {
	//Token        string `json:"jwt-token"`
	RefreshToken string `json:"refresh-token"`
}

//func JsonTokenResponse(token string, refreshToken string) []byte {
func JsonTokenResponse(refreshToken string) []byte {
	jsonMessage, _ := json.Marshal(&TokenResponse{
		//Token:        token,
		RefreshToken: refreshToken,
	})

	return jsonMessage
}
