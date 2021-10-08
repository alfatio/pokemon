package helper

// return true if prime number and vice versa
func CheckPrime(n int) bool {

	if n < 2 {
		return false
	}

	sr := int(float64(n / 2))

	for i := 2; i <= sr; i++ {
		if n%i == 0 {
			return false
		}
	}

	return true
}
