#include "Application.hpp"
#include <boost/test/unit_test.hpp>

BOOST_AUTO_TEST_CASE(Application_Main_Returns_OK) {
  Application app;
  BOOST_CHECK_EQUAL(app.run(), Poco::Util::Application::EXIT_OK);
}
