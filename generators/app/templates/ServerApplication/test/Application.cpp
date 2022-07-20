#include "Application.hpp"
#include <boost/test/unit_test.hpp>
#include <thread>

BOOST_AUTO_TEST_CASE(Application_Main_Returns_OK) {
    Application app;
    const int argc = 1;
    char appname[] = "server";
    char* argv[1] = {appname};
    std::thread t([&app]() {
        std::this_thread::sleep_for(std::chrono::seconds(1));
        app.terminate();
    });
    BOOST_CHECK_EQUAL(app.run(argc, argv), Poco::Util::Application::EXIT_OK);
    t.join();
}
