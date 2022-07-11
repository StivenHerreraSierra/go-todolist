package routes

import (
	"dev.com/web/services"
	"dev.com/web/services/auth"
	"github.com/gorilla/mux"
)

func InitRoutes(router *mux.Router) {
	router.HandleFunc("/user", services.GetUser).Methods("GET")
	router.HandleFunc("/user", services.SignUp).Methods("POST")
	router.HandleFunc("/signin", services.SignIn).Methods("POST", "OPTIONS")

	router.Handle("/task", auth.ValidateAndContinue(services.InsertTask)).Methods("POST")
	router.Handle("/tasks", auth.ValidateAndContinue(services.GetAllTasks)).Methods("GET")
	router.Handle("/task", auth.ValidateAndContinue(services.UpdateTask)).Methods("PATCH")
	router.Handle("/task/{task_id}", auth.ValidateAndContinue(services.DeleteTask)).Methods("DELETE")
}
