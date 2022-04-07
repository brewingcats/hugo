var BrewingCatsCore;
(function (BrewingCatsCore) {
    class Config {
    }
    Config.Version = '1.13';
    Config.SiteVersion = '';
    Config.ProjectId = '';
    Config.TelemetryEnabled = true;
    Config.ClientId = '';
    Config.SessionId = '';
    Config.TelemetryUrl = '';
    Config.StatsUrl = '';
    Config.ThemeColor = '';
    Config.LinkHoverColor = '';
    Config.UseGenericGdpr = false;
    Config.WarnLocalhost = false;
    BrewingCatsCore.Config = Config;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
