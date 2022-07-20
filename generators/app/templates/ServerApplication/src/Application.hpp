#pragma once

#include <Poco/Util/OptionSet.h>
#include <Poco/Util/ServerApplication.h>
#include <string>
#include <vector>

class Application : public Poco::Util::ServerApplication {
public:
    Application() = default;

protected:
    void initialize(Poco::Util::Application& self) override;
    void uninitialize() override;
    void reinitialize(Poco::Util::Application& self) override;
    void defineOptions(Poco::Util::OptionSet& options) override;
    void handleOption(const std::string& name, const std::string& value) override;
    int main(const std::vector<std::string>& args) override;
};
