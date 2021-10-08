package helper

func Fib(n int) int {

	var list []int

	for i := 0; i <= n; i++ {
		if i == 0 {
			list = append(list, 0)
		} else if i == 1 || i == 2 {
			list = append(list, 1)
		} else {
			list = append(list, (list[len(list)-2] + list[len(list)-1]))
		}
	}

	return list[len(list)-1]
}
