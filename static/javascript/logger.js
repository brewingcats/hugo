var BrewingCatsCore;
(function (BrewingCatsCore) {
    let LogCategory;
    (function (LogCategory) {
        LogCategory["Bootstrap"] = "Bootstrap";
        LogCategory["GDPR"] = "GDPR";
        LogCategory["ComponentSetup"] = "ComponentSetup";
        LogCategory["Configuration"] = "Configuration";
        LogCategory["ComponentInteraction"] = "ComponentInteraction";
    })(LogCategory = BrewingCatsCore.LogCategory || (BrewingCatsCore.LogCategory = {}));
    let LogType;
    (function (LogType) {
        LogType["Debug"] = "Debug";
        LogType["Info"] = "Info";
        LogType["Warning"] = "Warning";
        LogType["Error"] = "Error";
    })(LogType = BrewingCatsCore.LogType || (BrewingCatsCore.LogType = {}));
    class Logger {
        static customTrace(client, message, logType, caller, tagId, category, metrics) {
            const cleanStyle = [
                'text-shadow: 1px 1px black',
            ].join(';');
            const consoleFormat = [
                'text-shadow: 1px 1px gray',
                'border-radius: 2px',
                'color: black',
                'background: cyan'
            ].join(';');
            const warnFormat = [
                'text-shadow: 1px 1px gray',
                'border-radius: 2px',
                'color: black',
                'background: yellow'
            ].join(';');
            const errFormat = [
                'text-shadow: 1px 1px gray',
                'border-radius: 2px',
                'color: black',
                'background: red'
            ].join(';');
            const accent = [
                'color: cyan'
            ].join(';');
            let timestamp = new Date();
            let consoleTimestamp = `%c[%c${timestamp.getFullYear()}${timestamp.getMonth()}${timestamp.getDay()}%c.` +
                `%c${timestamp.getHours()}${timestamp.getMinutes()}${timestamp.getSeconds()}]`;
            let prefix = `${consoleTimestamp}%c BrewingCats %c`;
            if (!BrewingCatsCore.Config.TelemetryEnabled) {
                console.log(`${prefix}Telemetry is disabled on this client`, accent, cleanStyle, accent, cleanStyle, warnFormat, cleanStyle);
                return;
            }
            if (metrics === undefined) {
                metrics = {};
            }
            metrics['SessionId'] = BrewingCatsCore.Config.SessionId;
            metrics['ClientId'] = BrewingCatsCore.Config.ClientId;
            let idx = `${timestamp.toISOString().split('-')[0]}${timestamp.toISOString().split('-')[1]}`;
            let log = {
                timestamp: timestamp.getTime(),
                client: client,
                caller: caller,
                category: category,
                type: logType,
                tagId: tagId,
                message: message,
                metrics: metrics,
                indexId: idx
            };
            switch (logType) {
                case LogType.Debug: {
                    console.log(`${prefix}${log.message}`, accent, cleanStyle, accent, cleanStyle, consoleFormat, cleanStyle);
                    console.trace(log);
                    break;
                }
                case LogType.Warning: {
                    console.log(`${prefix}${log.message}`, accent, cleanStyle, accent, cleanStyle, warnFormat, cleanStyle);
                    console.warn(log);
                    break;
                }
                case LogType.Error: {
                    console.log(`${prefix}${log.message}`, accent, cleanStyle, accent, cleanStyle, errFormat, cleanStyle);
                    console.error(log);
                    break;
                }
                default:
                    console.log(`${prefix}${log.message}`, accent, cleanStyle, accent, cleanStyle, consoleFormat, cleanStyle);
                    console.log(log);
            }
            if (!window.location.origin.includes('localhost')) {
                let request = {
                    body: JSON.stringify(log),
                    method: 'POST',
                    mode: 'cors',
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    headers: {
                        'Accept': '*/*',
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                        'Origin': window.location.origin
                    }
                };
                let p = fetch(BrewingCatsCore.Config.TelemetryUrl, request).then((response) => {
                    response.json().then((v) => { console.log(v); });
                });
            }
            else {
                if (false == BrewingCatsCore.Config.WarnLocalhost) {
                    BrewingCatsCore.Config.WarnLocalhost = true;
                    console.log(`${prefix}Skipped Telemetry service on localhost`, accent, cleanStyle, accent, cleanStyle, warnFormat, cleanStyle);
                }
            }
        }
        static trace(log) {
            Logger.customTrace(log.client, log.message, log.type, log.caller, log.tagId, log.category, log.metrics);
        }
        static traceLog(message, logType, caller, tagId, category, metrics) {
            Logger.customTrace('BrewingCatsCore', message, logType, caller, tagId, category, metrics);
        }
        static traceInfo(message, caller, tagId, category, metrics) {
            Logger.traceLog(message, LogType.Info, caller, tagId, category, metrics);
        }
        static traceDebug(message, caller, tagId, category, metrics) {
            Logger.traceLog(message, LogType.Debug, caller, tagId, category, metrics);
        }
        static traceWarn(message, caller, tagId, category, metrics) {
            Logger.traceLog(message, LogType.Warning, caller, tagId, category, metrics);
        }
        static traceError(message, caller, tagId, category, metrics) {
            Logger.traceLog(message, LogType.Error, caller, tagId, category, metrics);
        }
    }
    BrewingCatsCore.Logger = Logger;
    class TraceLog {
    }
    BrewingCatsCore.TraceLog = TraceLog;
})(BrewingCatsCore || (BrewingCatsCore = {}));
if (window.BrewingCatsCore === undefined) {
    window.BrewingCatsCore = BrewingCatsCore;
}
