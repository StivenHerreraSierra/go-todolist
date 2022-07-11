package auth

import (
	"net/http"
	"os"
	"time"

	"dev.com/web/services/responses"
	"github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
)

type Claims struct {
	User_email string `json:"user_email"`
	jwt.StandardClaims
}

func SignToken(email string, expirationTime time.Time) (string, error) {
	claims := &Claims{
		User_email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	//Declare the token with the algorithm used for signing, and the claims.
	//Con SigningMethodES256 da error por invalid type en la key.
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	//Create the JWT string
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	return tokenString, err
}

func ValidateAndContinue(handler func(w http.ResponseWriter, r *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("token")

		if err != nil {
			if err == http.ErrNoCookie {
				w.Write(responses.ReportError("jwt token not found. " + err.Error()))
			} else {
				w.Write(responses.ReportError("error: " + err.Error()))
			}

			w.WriteHeader(http.StatusBadRequest)
			return
		}

		tokenString := cookie.Value
		claims := &Claims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("SECRET")), nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write(responses.ReportError(err.Error()))
				return
			}

			w.WriteHeader(http.StatusBadRequest)
			w.Write(responses.ReportError(err.Error()))
			return
		}

		if !token.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write(responses.ReportError("invalid token"))
			return
		}

		r.Header.Set("email", claims.User_email)
		handler(w, r)
	})
}

func Cookie(name string, value string, expirationTime time.Time) *http.Cookie {
	return &http.Cookie{
		Name:     name,
		Value:    value,
		Expires:  expirationTime,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteNoneMode,
		Secure:   true, //required by SameSite
	}
}

func init() {
	godotenv.Load()
}
