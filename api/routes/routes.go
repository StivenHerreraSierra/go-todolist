package routes

import (
	"dev.com/web/services"
	"dev.com/web/services/auth"
	"github.com/gorilla/mux"
)

func InitRoutes(router *mux.Router) {
	router.HandleFunc("/api/user", services.GetUser).Methods("GET")
	router.HandleFunc("/api/user/signup", services.SignUp).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/user/login", services.SignIn).Methods("POST", "OPTIONS")

	router.Handle("/api/task", auth.ValidateAndContinue(services.InsertTask)).Methods("POST")
	router.Handle("/api/tasks", auth.ValidateAndContinue(services.GetAllTasks)).Methods("GET")
	router.Handle("/api/task", auth.ValidateAndContinue(services.UpdateTask)).Methods("PATCH")
	router.Handle("/api/task/{task_id}", auth.ValidateAndContinue(services.DeleteTask)).Methods("DELETE")
}
