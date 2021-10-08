package routes

import (
	"github.com/gin-gonic/gin"

	"pokemon/helper"
)

func Catch(c *gin.Context) {

	rn := helper.RandomNumber(2)

	// 0 = fail , 1 = success
	if rn == 0 {
		c.JSON(200, gin.H{
			"message": "fail",
		})
	} else {
		c.JSON(200, gin.H{
			"message": "success",
		})
	}
}
