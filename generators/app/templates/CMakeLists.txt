cmake_minimum_required(VERSION 3.13.4)

project(<%= projectName %> C CXX)

include(cmake/Conan.cmake)
include(cmake/CompilerWarnings.cmake)

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
