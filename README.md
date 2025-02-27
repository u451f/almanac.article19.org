# Contribute

## Prerequisites

* Install [Jekyll](https://jekyllrb.com/docs/installation/).
* Clone this Git repository.
* You might also need to run `gem install` to install the Ruby gems
  associated with this website.
  - or `bundle install`

## Running the site locally

* cd into the Git repository
* run `bundle exec jekyll serve`
* navigate to http://localhost:4000/

## Building the _site for export

`bundle exec jekyll build`

## Building the _site and test links, scripts, images, markup

`rake test`

## Guess who! part of the site

### Adding new data to the dashboard

- Add CSV files to *assets/data/dashboard/* either to the *authorship*,
  *leadership* or *influence* folder. The file should be named after
  this scheme: *$sdo_$wg*, e.g. *ietf_add.csv*
- Add the working group concerned by this data to *_data/guess_who_dashboard_working_groups.yaml*
- Don't add files for SDOs here.

### Adding new data for the overview page

- Add CSV files to *assets/data/dashboard/* either to the *authorship*,
  *leadership* or *influence* folder. The file should be named after
  this scheme: *$sdo*, e.g. *ietf.csv*
- Only add files for SDOs here.

### JS libraries

We use the Plotly Javascript library. It's quite heavy per se, but
custom bundles can be created. [Documentation](https://github.com/plotly/plotly.js/blob/master/CUSTOM_BUNDLE.md)

This was done:

```
mkdir bundle
npm i plotly.js
cd node_modules/plotly.js
npm i
npm run custom-bundle -- --out almanac-bundle --traces scatter,bar --transforms none
cp dist/plotly-almanac-bundle.min.js ../../assets/js/lib/
```

→ then load the new file in _includes/header.html
