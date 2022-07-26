# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.241.1/containers/cpp/.devcontainer/base.Dockerfile

# [Choice] Debian / Ubuntu version (use Debian 11, Ubuntu 18.04/22.04 on local arm64/Apple Silicon): debian-11, debian-10, ubuntu-22.04, ubuntu-20.04, ubuntu-18.04
ARG VARIANT="bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/cpp:0-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get dist-upgrade -y \
    && apt-get -y install --no-install-recommends python3-pip \
    && pip3 install conan cpplint \
    && su vscode -c "conan profile new --detect default" \
    && su vscode -c "conan profile update settings.compiler.libcxx=libstdc++11 default" \
    && apt-get clean autoclean \
    && apt-get autoremove --yes \
    && rm -rf /var/lib/{apt,dpkg,cache,log}/
