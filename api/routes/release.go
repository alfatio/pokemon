package routes

import (
	"pokemon/helper"

	"github.com/gin-gonic/gin"
)

func Release(c *gin.Context) {

	rn := helper.RandomNumber(20) + 1

	isPrime := helper.CheckPrime(rn)

	if isPrime {
		c.JSON(200, gin.H{
			"message": "success",
			"prime":   rn,
		})
	} else {
		c.JSON(200, gin.H{
			"message": "fail",
			"prime":   rn,
		})
	}

}
