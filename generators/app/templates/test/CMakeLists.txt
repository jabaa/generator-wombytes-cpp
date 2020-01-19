add_executable(<%= projectName %>_test main.cpp)
target_link_libraries(<%= projectName %>_test CONAN_PKG::fmt CONAN_PKG::boost)
target_compile_features(<%= projectName %>_test PUBLIC cxx_std_17)
add_test(NAME <%= projectName %>_test COMMAND <%= projectName %>_test)
