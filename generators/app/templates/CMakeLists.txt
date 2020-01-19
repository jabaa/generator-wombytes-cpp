project(<%= projectName %> C CXX)
cmake_minimum_required(VERSION 3.13.4)

execute_process(COMMAND conan install ${CMAKE_SOURCE_DIR} --build missing)

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup(TARGETS)

find_package(Threads REQUIRED)
set(CMAKE_CXX_CPPCHECK cppcheck)

if ("${CMAKE_CXX_COMPILER_ID}" MATCHES "Clang" OR "${CMAKE_CXX_COMPILER_ID}" STREQUAL "GNU")
    add_compile_options(-Wall -Wextra -Wshadow -Wnon-virtual-dtor -pedantic -Wold-style-cast -Wcast-align -Wunused -Woverloaded-virtual -Wpedantic -Wconversion -Wsign-conversion -Wnull-dereference -Wdouble-promotion -Wformat=2 -Weffc++ -Werror)
    if ("${CMAKE_CXX_COMPILER_ID}" MATCHES "Clang")
        # add_compile_options(-Weverything)
    elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "GNU")
    add_compile_options(-Wmisleading-indentation -Wduplicated-cond -Wduplicated-branches -Wlogical-op -Wuseless-cast)
    endif ()
elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Intel")
    # using Intel C++
elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "MSVC")
    # using Visual Studio C++
endif ()

set(CMAKE_CXX_CPPCHECK cppcheck)
set(CMAKE_CXX_CPPLINT cpplint)
if ("${CMAKE_CXX_COMPILER_ID}" MATCHES "Clang")
    set(CMAKE_CXX_CLANG_TIDY clang-tidy)
endif ()

add_subdirectory(src)

enable_testing()
add_subdirectory(test)
