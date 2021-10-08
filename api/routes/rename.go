package routes

import (
	"fmt"
	"pokemon/helper"
	"strconv"

	"github.com/gin-gonic/gin"
)

type postRenameBody struct {
	Name    string `json:"name" binding:"required"`
	Nrename int    `json:"nRename" `
}

func Rename(c *gin.Context) {
	var body postRenameBody

	err := c.BindJSON(&body)

	fmt.Println(err)
	if err != nil {
		c.JSON(400, gin.H{
			"message": "missing required field",
		})
		c.Abort()
		return
	}

	fib := helper.Fib(body.Nrename)

	n := body.Name + "-" + strconv.Itoa(fib)

	c.JSON(200, gin.H{
		"name": n,
	})
}
