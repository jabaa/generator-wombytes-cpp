add_executable(<%= projectName %>_test main.cpp Application.cpp)
target_link_libraries(<%= projectName %>_test PUBLIC Application CONAN_PKG::boost)
add_test(NAME <%= projectName %>_test COMMAND <%= projectName %>_test)
