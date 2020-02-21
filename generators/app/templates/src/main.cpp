#include <gsl/span>
#include <iostream>
#include <cstdlib>

int main(int argc, char *argv[]) {
  gsl::span<char*> arguments(argv, argc);
  std::cout << arguments[0] << '\n';
  return EXIT_SUCCESS;
}
