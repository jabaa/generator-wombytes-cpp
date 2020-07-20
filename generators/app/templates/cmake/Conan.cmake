execute_process(COMMAND conan install ${CMAKE_SOURCE_DIR} --build missing)

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup(TARGETS)
