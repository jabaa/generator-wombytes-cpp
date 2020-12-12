execute_process(COMMAND conan install ${CMAKE_SOURCE_DIR} --build missing WORKING_DIRECTORY ${CMAKE_BINARY_DIR})

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup(TARGETS)
