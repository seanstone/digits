#include <stdio.h>

int main(void) {
	int input = 336908259;
	printf("%d\n", input%10);
	printf("%d\n", (input/=10)%2);
	printf("%d\n", (input/=2)%256);
	printf("%d\n", (input/=256)%256);
	printf("%d\n", (input/=256)%256);
	printf("%d\n", (input/=256)%4);
	printf("%d\n", (input/=4)%2);
}
