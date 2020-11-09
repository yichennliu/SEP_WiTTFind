# Contribution

Thank you for your interest in contributing to the *wittfind-web* project.
This guide details how to contribute in a way that is efficient for everyone.

# Issue tracker

Whenever you found a problem or want to file a bug report please
use the *wittfind-issues* tracker [here](https://gitlab.cis.uni-muenchen.de/wast/wittgenstein-issues/issues)
or use the feedback page [here](http://wittfind.cis.lmu.de/?feedback).

## Issue tracker guidelines

Please search the issue tracker first before submitting your own. A bug report
should be described as detailed as possible, e.g. if you write a bug report
please provide detailed steps to reproduce the bug or provide relevant logs and
error messages.

All issues should be written in English, but you're welcome to write in German.

# Merge requests

We welcome merge requests with fixes and improvements to the *wittfind-web*
code, tests, and/or further documentation.

## Merge request guidelines

If you can, please submit a merge request with the fix or improvements including
unittests. In general bug fixes that include a regression test should be merged
quickly, while new shiny features without proper unittests are very likely to
to be merged later. The workflow to make a merge request is:

* Clone the *wittfind-web* repository from: `git@gitlab.cis.uni-muenchen.de:wast/wittfind-web.git`

* Create a new feature branch, e.g. labeled with `feature/meaningful-description`.
  If there's any issue available, please include the issue number in the branch
  name like: `feature/issue-42`

* Write code/bug fixes new features and please also include test cases for them

* Commit often and push to your feature branch

* Provide a merge request [here](https://gitlab.cis.uni-muenchen.de/wast/wittfind-web/merge_requests)

* In this merge request you should describe all implemented features and please
  link any relevant issues.

* Be prepared to answer questions and incorporate feedback after your submission

Please keep the change in a single merge request as small as possible.

# Style guides

Please refer to our [coding style](CODINGSTYLE.md) document when writing code in
*javascript*.

# *WAST* documentation wiki

Please also have a look at the *WAST* documentation wiki [here](https://gitlab.cis.uni-muenchen.de/wast/wast-doc/wikis/home)

# Sources

This guide is heavily inspired by the excellent [GitLab](https://gitlab.com/groups/gitlab-org)
constributing guide, which is available [here](https://gitlab.com/gitlab-org/gitlab-ce/blob/master/CONTRIBUTING.md).
