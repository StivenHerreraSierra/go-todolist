package hash

import (
	"golang.org/x/crypto/bcrypt"
)

func Hash(password string) (string, error) {
	bcrypt, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	return string(bcrypt), err
}

func CheckPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))

	return err == nil
}
