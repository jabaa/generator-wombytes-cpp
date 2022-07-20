#include "HTTPRequestHandlerFactory.hpp"
#include "HTTPRequestHandler.hpp"

Poco::Net::HTTPRequestHandler* HTTPRequestHandlerFactory::createRequestHandler(const Poco::Net::HTTPServerRequest&) {
    return new HTTPRequestHandler();
}