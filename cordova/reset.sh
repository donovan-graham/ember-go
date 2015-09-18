#!/bin/bash
rm -rf platforms/ plugins/

cordova plugins add cordova-plugin-crosswalk-webview@1.3.1 cordova-plugin-device@1.0.1 cordova-plugin-whitelist@1.0.0

cordova platforms add ios android