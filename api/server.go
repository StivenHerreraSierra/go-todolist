package main

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"dev.com/web/routes"
	"github.com/gorilla/mux"
)

var router *mux.Router

func start_routes() {
	router = mux.NewRouter()

	routes.InitRoutes(router)
}

func start_server() {
	err := http.ListenAndServe(":8000", router)

	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error starting server: %s\n", err)
		os.Exit(1)
	}
}

func main() {
	start_routes()

	start_server()
}
