package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"pokemon/routes"
)

func main() {

	r := setupRouter()

	r.Run(":3001")

}

func setupRouter() *gin.Engine {

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Content-Type"},
	}))

	api := r.Group("/")
	{
		api.GET("/catch", routes.Catch)
		api.GET("/release", routes.Release)
		api.POST("/rename", routes.Rename)
	}

	return r
}
