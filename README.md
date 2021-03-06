enxoo
=====

enxoo sfdx cli extensions

[![Version](https://img.shields.io/npm/v/enxoo.svg)](https://npmjs.org/package/enxoo)
[![CircleCI](https://circleci.com/gh/maciejsimm/enxoo-cli/tree/master.svg?style=shield)](https://circleci.com/gh/maciejsimm/enxoo-cli/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/maciejsimm/enxoo-cli?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/enxoo-cli/branch/master)
[![Codecov](https://codecov.io/gh/maciejsimm/enxoo-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/maciejsimm/enxoo-cli)
[![Greenkeeper](https://badges.greenkeeper.io/maciejsimm/enxoo-cli.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/maciejsimm/enxoo-cli/badge.svg)](https://snyk.io/test/github/maciejsimm/enxoo-cli)
[![Downloads/week](https://img.shields.io/npm/dw/enxoo.svg)](https://npmjs.org/package/enxoo)
[![License](https://img.shields.io/npm/l/enxoo.svg)](https://github.com/maciejsimm/enxoo-cli/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g enxoo
$ enxoo COMMAND
running command...
$ enxoo (-v|--version|version)
enxoo/0.1.24 darwin-x64 node-v8.12.0
$ enxoo --help [COMMAND]
USAGE
  $ enxoo COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`enxoo enxoo:cpq:config:init -d <string> [-b] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#enxoo-enxoocpqconfiginit--d-string--b--v-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`enxoo enxoo:cpq:prd:describe -d <string> [-b] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#enxoo-enxoocpqprddescribe--d-string--b--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`enxoo enxoo:cpq:prd:import -p <array> -d <string> [-b] [-r] [-c <array>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#enxoo-enxoocpqprdimport--p-array--d-string--b--r--c-array--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`enxoo enxoo:cpq:prd:retrieve -p <array> -d <string> [-b] [-r] [-c <array>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#enxoo-enxoocpqprdretrieve--p-array--d-string--b--r--c-array--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`enxoo enxoo:cpq:settings:import -d <string> [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#enxoo-enxoocpqsettingsimport--d-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`enxoo enxoo:cpq:settings:retrieve -d <string> [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#enxoo-enxoocpqsettingsretrieve--d-string--v-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `enxoo enxoo:cpq:config:init -d <string> [-b] [-v <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ enxoo enxoo:cpq:config:init -d <string> [-b] [-v <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --b2b                                                                         boolean determining if export/import
                                                                                    B2B specific objects

  -d, --dir=dir                                                                     (required) directory with product
                                                                                    .jsons, please don't use special
                                                                                    characters for folder names

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [src/commands/enxoo/cpq/config/init.ts](https://github.com/maciejsimm/enxoo-cli/blob/v0.1.24/src/commands/enxoo/cpq/config/init.ts)_

## `enxoo enxoo:cpq:prd:describe -d <string> [-b] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ enxoo enxoo:cpq:prd:describe -d <string> [-b] [-v <string>] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --b2b                                                                         boolean determining if export/import
                                                                                    B2B specific objects

  -d, --dir=dir                                                                     (required) directory with product
                                                                                    .jsons, please don't use special
                                                                                    characters for folder names

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [src/commands/enxoo/cpq/prd/describe.ts](https://github.com/maciejsimm/enxoo-cli/blob/v0.1.24/src/commands/enxoo/cpq/prd/describe.ts)_

## `enxoo enxoo:cpq:prd:import -p <array> -d <string> [-b] [-r] [-c <array>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ enxoo enxoo:cpq:prd:import -p <array> -d <string> [-b] [-r] [-c <array>] [-v <string>] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --b2b                                                                         boolean determining if export/import
                                                                                    B2B specific objects

  -c, --currencies=currencies                                                       comma separated list of currencies
                                                                                    ISO codes for which we want to
                                                                                    export/import PricebookEntries

  -d, --dir=dir                                                                     (required) directory with product
                                                                                    .jsons, please don't use special
                                                                                    characters for folder names

  -p, --products=products                                                           (required) comma separated list of
                                                                                    product names, e.g.:
                                                                                    'GEPL,IPLC,VPN,Colocation Space'.
                                                                                    Use '*ALL' keyword to take all
                                                                                    products.

  -r, --related                                                                     boolean determining if export/import
                                                                                    related products and charge
                                                                                    references

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [src/commands/enxoo/cpq/prd/import.ts](https://github.com/maciejsimm/enxoo-cli/blob/v0.1.24/src/commands/enxoo/cpq/prd/import.ts)_

## `enxoo enxoo:cpq:prd:retrieve -p <array> -d <string> [-b] [-r] [-c <array>] [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ enxoo enxoo:cpq:prd:retrieve -p <array> -d <string> [-b] [-r] [-c <array>] [-v <string>] [-u <string>] [--apiversion 
  <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --b2b                                                                         boolean determining if export/import
                                                                                    B2B specific objects

  -c, --currencies=currencies                                                       comma separated list of currencies
                                                                                    ISO codes for which we want to
                                                                                    export/import PricebookEntries

  -d, --dir=dir                                                                     (required) directory with product
                                                                                    .jsons, please don't use special
                                                                                    characters for folder names

  -p, --products=products                                                           (required) comma separated list of
                                                                                    product names, e.g.:
                                                                                    'GEPL,IPLC,VPN,Colocation Space'.
                                                                                    Use '*ALL' keyword to take all
                                                                                    products.

  -r, --related                                                                     boolean determining if export/import
                                                                                    related products and charge
                                                                                    references

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [src/commands/enxoo/cpq/prd/retrieve.ts](https://github.com/maciejsimm/enxoo-cli/blob/v0.1.24/src/commands/enxoo/cpq/prd/retrieve.ts)_

## `enxoo enxoo:cpq:settings:import -d <string> [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ enxoo enxoo:cpq:settings:import -d <string> [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --dir=dir                                                                     (required) directory with product
                                                                                    .jsons, please don't use special
                                                                                    characters for folder names

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [src/commands/enxoo/cpq/settings/import.ts](https://github.com/maciejsimm/enxoo-cli/blob/v0.1.24/src/commands/enxoo/cpq/settings/import.ts)_

## `enxoo enxoo:cpq:settings:retrieve -d <string> [-v <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

print a greeting and your org IDs

```
USAGE
  $ enxoo enxoo:cpq:settings:retrieve -d <string> [-v <string>] [-u <string>] [--apiversion <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --dir=dir                                                                     (required) directory with product
                                                                                    .jsons, please don't use special
                                                                                    characters for folder names

  -u, --targetusername=targetusername                                               username or alias for the target
                                                                                    org; overrides default target org

  -v, --targetdevhubusername=targetdevhubusername                                   username or alias for the dev hub
                                                                                    org; overrides default dev hub org

  --apiversion=apiversion                                                           override the api version used for
                                                                                    api requests made by this command

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation
```

_See code: [src/commands/enxoo/cpq/settings/retrieve.ts](https://github.com/maciejsimm/enxoo-cli/blob/v0.1.24/src/commands/enxoo/cpq/settings/retrieve.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
