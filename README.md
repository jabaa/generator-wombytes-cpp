# C++ Project Generator

A [Yeoman](http://yeoman.io/) generator for Wombytes C++ projects.

[![Build Status](https://app.travis-ci.com/jabaa/generator-wombytes-cpp.svg?branch=main)](https://app.travis-ci.com/github/jabaa/generator-wombytes-cpp)
[![Code Coverage](https://codecov.io/gh/jabaa/generator-wombytes-cpp/branch/main/graph/badge.svg)](https://codecov.io/gh/jabaa/generator-wombytes-cpp)
[![License](https://img.shields.io/packagist/l/doctrine/orm.svg)](LICENSE.md)

Buildsystem: CMake  
Package Manager: Conan  
IDE Support: Visual Studio Code  
Dev Environment: Docker Container Debian 10

Packages:

- fmt 9.0.0
- Boost 1.79.0
- GSL 4.0.0
- Poco 1.12.1

## Requirements

- CMake
- Conan
- cpplint

## Getting started

1.  Install [Yeoman](http://yeoman.io/)

        npm install -g yo

2.  Install generator

        npm install -g generator-wombytes-cpp

3.  Scaffold project

        yo wombytes-cpp
