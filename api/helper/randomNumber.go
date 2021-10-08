package helper

import (
	"math/rand"
	"time"
)

// will return from 0 to n-1 on random
func RandomNumber(n int) int {
	rand.Seed(time.Now().Unix())

	return rand.Intn(n)
}
