# WiTTFind-Web

This repository contains all files for the *WiTTFind* frontend.

# Build status

* [![build status](https://gitlab.cis.uni-muenchen.de/wast/wittfind-web/badges/master/build.svg)](https://gitlab.cis.uni-muenchen.de/wast/wittfind-web/commits/master)

# Requirements

The following libraries must be installed:

* `npm` - it takes care of downloading all necessary javascript libraries

# Getting started

To download all necessary javascript dependencies, just execute:

```bash
make npm
```
This will install all dependencies. To make them accessible to the frontend (as is defined in include/main.js) execute:

```bash
mkdir components
```

```bash
cp -r node_modules/* components/
```


## Development server

The *npm* package `light-server` can be used as a kind of development server.
Thus, no "full" webserver like *Apache* or *nginx* is needed. The `light-server`
package will be installed with the above command.


To start the `light-server` the following command can be used:

```bash
npm run dev
```

This starts a lightweight webserver on port *8080*. The startpage of
*WiTTFind* can be viewed in a webbrowser under `http://localhost:8080`.

# Makefile

The whole project is managed via `make`. Here's an overview of all Makefile
variables, which can be set:

| Name        | Default                                   | Description
| ------------| ----------------------------------------- | ---------------------------------------------
| `NPM_CMD`   | `npm`                                     | Defines filename for `npm`
| `NPM_OPT`   | `install`                                 | Defines configuration options for `npm`
| `NPM`       | `$(BOWER_CMD) $(BOWER_OPT)`               | Puts command and options for `npm` together

# Folder structure

```text
├── CHANGELOG.md
├── Helppage
│   ├── frequenzliste_adjektive.html
│   ├── frequenzliste_adv.html
│   ├── frequenzliste_det.html
│   ├── frequenzliste_en.html
│   ├── frequenzliste_intj.html
│   ├── frequenzliste_konj.html
│   ├── frequenzliste_nomen.html
│   ├── frequenzliste_part.html
│   ├── frequenzliste_pdet.html
│   ├── frequenzliste_prep.html
│   ├── frequenzliste_verben.html
│   └── frequenzliste_vpart.html
├── Makefile
├── README.md
├── SemantischeKlassen
│   ├── ... (various frequency lists)
├── code
│   ├── ... (various html files)
├── feedback.html
├── grapheditor.html
├── grapheditorii
│   ├── ... (various files for graph editor)
├── help.html
├── hook
│   └── issue-mailer.php
├── images
│   ├── banner-background.png
│   ├── branding-left-small.png
│   ├── branding-left.png
│   └── branding-right.png
├── include
│   ├── GraphEditorII.css
│   ├── autosuggestions.js
│   ├── changelog.js
│   ├── code.css
│   ├── code.js
│   ├── config.js
│   ├── feedback.js
│   ├── graph.js
│   ├── help.js
│   ├── main.js
│   ├── router.js
│   ├── search.js
│   ├── semantics.js
│   ├── settings.js
│   ├── translator.js
│   ├── tutorial.js
│   ├── wittfind.css
│   └── word-cloud.js   
├── index.html
├── make
│   ├── npm.make
│   ├── clean.make
│   └── describe.make
├── semantics.html
├── settings.html
├── translator.html
└── tutorial.html
```

## Folders

* `Helppage` contains html rendered lists for the help page of `wittfind-web`
* `SemantischeKlassen` contains many frequency lists for semantic categories
* `code` contains many lists and html files for the code page of `wittfind-web`
* `grapheditorii` contains all files for the (currently deprecated) graph editor
* `hook` contains files acting as *GitLab* hooks
* `images` contains all header images
* `make` contains various Makefile scripts

## Files

* `CHANGELOG.md`: a brief history of all important changes
* `Makefile`: the top level Makefile, includes the sub Makefiles (from `make` folder)
* `README.md`: main readme file
* `bower.json`: defines all client-side dependencies
* `feedback.html`: feedback page for `wittfind-web`
* `grapheditor.html`: (currently deprecated) grapheditor entry page
* `help.html`: entry point for help page
* `index.html`: main index paage
* `semantics.html`: entry point for semantics page
* `settings.html`: settings page
* `translator.html` translator page for Wittgensteins code
* `tutorial.html`: tutorial page

# Micro services

The `wittfind-web` site uses the following micro services requests for creating search, retrieve facsimile extracts or getting auto-suggestions.
They are maintained as an own git Projekt under the  CAST- gitlab group. Every micro-service has an own .ci pipeline for `deploy-testing` and `deploy-production`.
Currently every microservices run on the debian virtual-debian-linus-Host `cast2` under the user `schweter2`. 

Every Microservicc manages his own CI/CD environment under their git repository:
* .ci Pipelines will be found under the gitlab Menu:  CI/CD Pipelines. 
* logfiles for testing and buldiung pipelines will be found under the gitlab Menu:  CI/CD Jobs.


| Name           | Description                                                                       | Upstream repository
| -------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------
| `quadroreader` | The Quadroreader allows the user to present a set of facsimile in the web browser | [here](https://gitlab.cis.uni-muenchen.de/CAST/quadroreader)
| `wfa`          | Server for converting wf search results into an anchored xml compatible format    | [here](https://gitlab.cis.uni-muenchen.de/CAST/wfa_server)
| `axs`          | Server for anchored xml (stand-off markup)                                        | [here](https://gitlab.cis.uni-muenchen.de/CAST/anchored-data)
| `sis`          | Server for getting auto suggestions for a character sequence                      | [here](https://gitlab.cis.uni-muenchen.de/wast/sis3)

## Dataflow

A small overview of the dataflow of `wittfind-web` can be seen here:

![Dataflow-1](https://gitlab.cis.uni-muenchen.de/CAST/wfa_server/raw/master/workflow_1.png)

### Example: (wfa Server uses axs Server)

The following example uses the search pattern *undenkbaren* to explain the
data flow more detailed. The first request is sent to the `wfa` server:

```bash
curl 'http://wfa.wittfind.cis.uni-muenchen.de/' --data '{"query":"\"undenkbaren\"","max":200} | json_pp'
```

JSON:

```json
{
  "max" : 200,
  "query" : "\"undenkbaren\""
}
```

Then the `wfa` server would return something like this:

```json
{
  "/mounts/Users/student/schweter2/production-wf-wittfind/anchored-data/witt-data/ciswab/wab2cis/opensource_nachlass
  /Ms-114_OA/norm/Ms-114_OA_NORM-expanded-tagged-annotated.xml" : {
    "1831" : {
      "matches" : [
        {
          "end" : [ 224, 12, 8 ],
          "name" : "Ms-114,93r[2]_2",
          "start" : [ 224, 12, 8 ]
        }
      ]
    }
  }
}
```

The `wittfind-web` search core will iterate over all `matches` and sends
requests to the `axs` server to get the search results. The request to `axs`
looks like:

```bash
curl 'http://axs.wittfind.cis.uni-muenchen.de/api/v1' \
  --data '{"sentencenr": 1831, \
           "display_tags": 0, \
           "document": "Ms-114", \
           "display_raw_output": 1, \
           "highlighting": [{"start": [224,12,8], "end": [224,12,8]}]}'
```

JSON:

```json
{
  "display_tags" : 0,
  "display_raw_output" : 1,
  "document" : "Ms-114",
  "highlighting" : [
    {
      "end" : [
        24,
        12,
        8
      ],
      "start" : [
        224,
        12,
        8
      ]
    }
  ],
  "sentencenr" : 1831
}
```

The `axs` returns the following (shortened output):

```json
{
   "results" : [
      {
         "alternativenr" : 0,
         "end_highlighting" : 0,
         "lemma" : "die",
         "linenr" : 12,
         "pagenr" : 224,
         "paragraphnr" : 378,
         "sentencenr" : 1831,
         "start_highlighting" : 0,
         "tag" : "ART",
         "tokennr" : 7,
         "word" : "den"
      },
      {
         "alternativenr" : 0,
         "end_highlighting" : 1,
         "lemma" : "undenkbar",
         "linenr" : 12,
         "pagenr" : 224,
         "paragraphnr" : 378,
         "sentencenr" : 1831,
         "start_highlighting" : 1,
         "tag" : "ADJA",
         "tokennr" : 8,
         "word" : "undenkbaren"
      }
   ]
}
```

Then the search output can generate a nice output for a search result.

### Example: (wfa Server returns Results directly from wf Search-engine ("output=raw-mode")

The following example uses the search pattern *undenkbaren* to explain the
data flow more detailed. The first request is sent to the `wfa` server, containing the new Parameter `type` with Argumen `raw`

```bash
curl 'http://wfa.wittfind.cis.uni-muenchen.de/' --data '{"query":"\"undenkbaren\"","max":200,"type":"raw"}'
```
This is returned in Raw Mode directly from wf

```
abnr: 365
​ana: "abnr:365"
date: "date:19471210"
date_norm: "1947-12-10"
f: "Ms-135,82r"
matches: (1) […]
	​0: {…}
	gc: "+N"
	ic: ":aeN:deN:neN"
	id: 25046​​​
	linenr: 1​​​
	pagenr: 206​​​
	pos: 1​​​
tag: "NN"​​​
token: "Krokodil"​​​
tokennr: 38
​n: "Ms-135,82r[3]et82v[1]_2"
​no: 20
path: "/home/gitlab-ci/testing-witt-data/ciswab/wab2cis/opensource_nachlass/Ms-135_OA/norm/Ms-135_OA_NORM-expanded-tagged-annotated.xml"
satznr: 1142
```


### Autosuggestions

The frontend also displays auto suggestions for a given character sequence doing
API calls to `sis`. For the pattern "Erho" a request looks like:

```bash
curl 'http://sis.wittfind.cis.lmu.de/lemmasearch?query=Erho'
```

The `sis` response is:

```json
[
  {
    "lemma": "Erholung,4",
    "variants": [
      "Erholung,4"
    ]
  },
  {
    "lemma": "Erhörte,1",
    "variants": [
      "Erhörtes,1"
    ]
  }
]
```

# Configuring

All micro services can be configured in `include/config.js`. The default
configuration is:

| Name           | Host                                   | Port
| -------------- | -------------------------------------- | ----
| `quadroreader` | `dev.reader.wittfind.cis.lmu.de`       | 80
| `wfa`          | `dev.wfa.wittfind.cis.uni-muenchen.de` | 80
| `axs`          | `dev.axs.wittfind.cis.uni-muenchen.de` | 80
| `sis`          | `dev.sis.wittfind.cis.lmu.de`          | 80

# Infrastructure

All micro services for `wittfind-web` are monitored. See the *WAST*
[infrastructure](https://gitlab.cis.uni-muenchen.de/wast/infrastructure)
repository for latest status.

# Continuous Integration & Deployment

`wittfind-web` uses continuous integration and deployment in combination
with *GitLab*:

| URL                                | Server      | Branches
| ---------------------------------- | ----------  | ----------------------------------------
| `wittfind.cis.uni-muenchen.de`     | `marmolata` | **Only** pushes to `master` are deployed
| `dev.wittfind.cis.uni-muenchen.de` | `uschebti`  | Pushes to all branches are deployed

For more information see:

* GitLab CI [configuration](.gitlab-ci.yml) for `wittfind-web`
* GitLab CI [documentation](https://docs.gitlab.com/ee/ci/)

# Contributing

To contribute to `wittfind-web` please refer to the [contributing](CONTRIBUTING.md)
documentation.
