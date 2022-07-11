package services

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"dev.com/web/database/repos"
	"dev.com/web/models"
	"dev.com/web/services/auth"
	"dev.com/web/services/hash"
	"dev.com/web/services/responses"
)

type getUserBody struct {
	Email string `json:"user_email"`
}

type Credential struct {
	User_email    string `json:"user_email"`
	User_password string `json:"user_password"`
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	var body getUserBody

	err := json.NewDecoder(r.Body).Decode(&body)
	email := body.Email

	if email == "" || err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	user, err := repos.GetUser(email)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	jsonResponse, jsonErr := json.Marshal(user)

	if jsonErr != nil {
		log.Println(jsonErr)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	var userRequest models.User

	err := json.NewDecoder(r.Body).Decode(&userRequest)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	hashedPassword, err := hash.Hash(userRequest.Password)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	userRequest.Password = hashedPassword

	err = repos.SignUp(userRequest)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var credential Credential

	err := json.NewDecoder(r.Body).Decode(&credential)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	hash_password, err := repos.ValidateLogin(credential.User_email)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	valid := hash.CheckPasswordHash(credential.User_password, hash_password)

	if !valid {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		w.Write(responses.ReportError("incorrect credentials"))
		return
	}

	tokenExpirationTime := time.Now().Add(2 * time.Hour)
	token, err := auth.SignToken(credential.User_email, tokenExpirationTime)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	refreshExpirationTime := time.Now().Add(2 * time.Hour)
	refreshToken, err := auth.SignToken(credential.User_email, refreshExpirationTime)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	http.SetCookie(w, auth.Cookie("token", token, tokenExpirationTime))
	http.SetCookie(w, auth.Cookie("refresh-token", refreshToken, refreshExpirationTime))

	w.WriteHeader(http.StatusOK)
	w.Write(responses.JsonTokenResponse("Welcome"))
}
