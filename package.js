Package.describe({
  name: 'seakaytee:autoform-codemirror',
  version: '0.9.0',
  summary: 'Autoform text editor using CodeMirror',
  git: 'https://github.com/cpravetz/meteor-autoform-codemirror',
  documentation: 'README.md'
});

Npm.depends({
	"codemirror": "6.0.1",
    "@codemirror/commands": "6.0.1",
    "@codemirror/lang-markdown": "0.20.0",
    "@codemirror/lang-javascript": "6.0.1",
    "@codemirror/language": "6.2.1",
    "@codemirror/lint": "6.0.0",
    "@codemirror/search": "6.0.1",
 //   "@codemirror/state": "6.1.1",
    "@codemirror/view": "6.2.0"
});

Package.onUse(function(api) {
  api.versionsFrom('2.3');
  api.use('ecmascript');
  api.use(['templating', 'reactive-var'], 'client');
  api.use('aldeed:autoform');
  api.addFiles([
    'mirror.html',
    'mirror.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('seakaytee:autoform-codemirror');
});
