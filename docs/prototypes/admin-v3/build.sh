#!/bin/sh
# Builds the design mock used for the admin v3 screenshots. Needs React 18 UMD files beside index.html.
npx esbuild docs/prototypes/admin-v3/app.jsx --jsx-factory=React.createElement --jsx-fragment=React.Fragment --outfile=docs/prototypes/admin-v3/app.js
