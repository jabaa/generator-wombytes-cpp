#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

FROM mcr.microsoft.com/vscode/devcontainers/base:debian-10

# This Dockerfile adds a non-root user with sudo access. Use the "remoteUser"
# property in devcontainer.json to use it. On Linux, the container user's GID/UIDs
# will be updated to match your local UID/GID (when using the dockerFile property).
# See https://aka.ms/vscode-remote/containers/non-root-user for details.
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Configure apt and install packages
RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    #
    # Install C++ tools
    && apt-get -y install build-essential ninja-build cmake cmake-curses-gui cppcheck valgrind lcov \
    #
    # Install Clang
    && apt-get -y install clang clang-format clang-tidy clang-tools llvm lldb\
    #
    # Install pip3
    && apt-get -y install python3-pip \
    #
    # Install Conan
    && pip3 install conan \
    #
    # Install cpplint
    && pip3 install cpplint \
    #
    # Configure Conan
    && sudo -u $USERNAME CC=gcc CXX=g++ conan profile new default --detect \
    && sudo -u $USERNAME CC=clang CXX=clang++ conan profile new clang --detect \
    && sudo -u $USERNAME conan profile update settings.compiler.libcxx=libstdc++11 default \
    && sudo -u $USERNAME conan profile update settings.compiler.libcxx=libstdc++11 clang \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
