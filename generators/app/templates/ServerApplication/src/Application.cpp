#include "Application.hpp"
#include <Poco/Net/HTTPServer.h>
#include "HTTPRequestHandlerFactory.hpp"

void Application::initialize(Poco::Util::Application& self) {
    loadConfiguration();
    Poco::Util::ServerApplication::initialize(self);
}

void Application::uninitialize() { Poco::Util::ServerApplication::uninitialize(); }

void Application::reinitialize(Poco::Util::Application& self) { Poco::Util::ServerApplication::reinitialize(self); }

void Application::defineOptions(Poco::Util::OptionSet& options) {
    Poco::Util::ServerApplication::defineOptions(options);
}

void Application::handleOption(const std::string& name, const std::string& value) {
    Poco::Util::ServerApplication::handleOption(name, value);
}

int Application::main(const std::vector<std::string>&) {
    Poco::Net::HTTPServer server(new HTTPRequestHandlerFactory, 8080);

    server.start();
    waitForTerminationRequest();
    server.stop();
    return Application::EXIT_OK;
}
