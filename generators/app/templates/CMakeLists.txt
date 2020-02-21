project(<%= projectName %> C CXX)
cmake_minimum_required(VERSION 3.13.4)

execute_process(COMMAND conan install ${CMAKE_SOURCE_DIR} --build missing)

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup(TARGETS)

find_package(Threads REQUIRED)

if ("${CMAKE_CXX_COMPILER_ID}" MATCHES "Clang" OR "${CMAKE_CXX_COMPILER_ID}" STREQUAL "GNU")
    add_compile_options(-Wall -Wextra -Wshadow -Wnon-virtual-dtor -pedantic -Wold-style-cast -Wcast-align -Wunused -Woverloaded-virtual -Wpedantic -Wconversion -Wsign-conversion -Wnull-dereference -Wdouble-promotion -Wformat=2 -Weffc++ -Werror)
    if ("${CMAKE_CXX_COMPILER_ID}" MATCHES "Clang")
        # add_compile_options(-Weverything)
    elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "GNU")
        add_compile_options(-Wmisleading-indentation -Wduplicated-cond -Wduplicated-branches -Wlogical-op -Wuseless-cast)
    endif ()
#elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Intel")
    # using Intel C++
#elseif ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "MSVC")
    # using Visual Studio C++
endif ()

option(ENABLE_CPPCHECK "Enable Cppcheck" on)
if (ENABLE_CPPCHECK)
    set(CMAKE_CXX_CPPCHECK cppcheck)
endif ()

option(ENABLE_CPPLINT "Enable cpplint" on)
if (ENABLE_CPPLINT)
    set(CMAKE_CXX_CPPLINT cpplint)
endif ()

option(ENABLE_CLANG_TIDY "Enable Clang-Tidy" on)
if (ENABLE_CLANG_TIDY)
    if ("${CMAKE_CXX_COMPILER_ID}" MATCHES "Clang")
        set(CMAKE_CXX_CLANG_TIDY clang-tidy)
    endif ()
endif ()

option(ENABLE_COVERAGE "Enable Coverage" off)

add_subdirectory(src)

enable_testing()
add_subdirectory(test)
