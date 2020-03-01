#include "Application.hpp"

Application::Application(int argc, char* argv[])
    : Poco::Util::Application(argc, argv) {}

void Application::initialize(Poco::Util::Application& self) {
  Poco::Util::Application::initialize(self);
}

void Application::uninitialize() { Poco::Util::Application::uninitialize(); }

void Application::reinitialize(Poco::Util::Application& self) {
  Poco::Util::Application::reinitialize(self);
}

void Application::defineOptions(Poco::Util::OptionSet& options) {
  Poco::Util::Application::defineOptions(options);
}

void Application::handleOption(
    const std::string& name, const std::string& value) {
  Poco::Util::Application::handleOption(name, value);
}

int Application::main(const std::vector<std::string>& args) {
  return Poco::Util::Application::main(args);
}
