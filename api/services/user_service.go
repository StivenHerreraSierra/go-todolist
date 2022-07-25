package services

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"dev.com/web/auth"
	"dev.com/web/database/repos"
	"dev.com/web/models"
	"dev.com/web/util/cors"
	"dev.com/web/util/hash"
	"dev.com/web/util/responses"
	"github.com/golang-jwt/jwt"
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
	cors.EnableCors(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

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

		if err.Error() == "duplicated email" {
			w.WriteHeader(http.StatusBadRequest)
			w.Write(responses.ReportError("email already registered, try another"))
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write(responses.ReportError("something goes wrong"))
		}
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(responses.ReportMessage("New user was created"))
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	cors.EnableCors(&w)

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

	tokenExpirationTime := time.Now().Add(1 * time.Minute)
	token, err := auth.SignToken(credential.User_email, tokenExpirationTime)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	refreshExpirationTime := time.Now().Add(7 * 24 * time.Hour)
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
	w.Write(responses.ReportMessage("Logged user"))
}

func Logout(w http.ResponseWriter, r *http.Request) {
	tokenExpirationTime := time.Now().Add(1)
	refreshExpirationTime := time.Now().Add(1)

	http.SetCookie(w, auth.Cookie("token", "", tokenExpirationTime))
	http.SetCookie(w, auth.Cookie("refresh-token", "", refreshExpirationTime))
}

func RefreshToken(w http.ResponseWriter, r *http.Request) {
	cors.EnableCors(&w)

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	refreshCookie, err := r.Cookie("refresh-token")

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusBadRequest)
		if err == http.ErrNoCookie {
			w.Write(responses.ReportError("refresh token not found " + err.Error()))
		} else {
			w.Write(responses.ReportError(err.Error()))
		}
		return
	}

	refreshToken, claims, err := auth.ParseTokenWithClaims(refreshCookie.Value)

	if err != nil {
		log.Println(err)
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write(responses.ReportError(err.Error()))
			return
		} else if ve, ok := err.(*jwt.ValidationError); ok {
			w.WriteHeader(http.StatusUnauthorized)

			if ve.Errors&jwt.ValidationErrorExpired != 0 {
				log.Println("expired refresh token")
				w.Write(responses.ReportError("expired refresh token"))
				return
			} else if ve.Errors&jwt.ValidationErrorNotValidYet != 0 {
				log.Println("inactived refresh token")
				w.Write(responses.ReportError("inactived refresh token"))
				return
			} else if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				log.Println("malformed refresh token")
				w.Write(responses.ReportError("malformed refresh token"))
				return
			}
		}

		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError(err.Error()))
		return
	}

	if !refreshToken.Valid {
		log.Println(err)
		w.WriteHeader(http.StatusUnauthorized)
		w.Write(responses.ReportError("invalid token"))
		return
	}

	tokenExpirationTime := time.Now().Add(1 * time.Minute)
	newToken, err := auth.SignToken(claims.User_email, tokenExpirationTime)

	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write(responses.ReportError("something goes wrong"))
		return
	}

	http.SetCookie(w, auth.Cookie("token", newToken, tokenExpirationTime))

	w.WriteHeader(http.StatusOK)
	w.Write(responses.ReportMessage("token refreshed"))
}
