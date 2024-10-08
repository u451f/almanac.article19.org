# Contribute

## Prerequisites

* Install [https://jekyllrb.com/docs/installation/](Jeykyll).
* Clone this Git repository.
* You might need to run `gem install` to install the Ruby gems
  associated with this website.

## Running the site locally

* cd into the Git repository
* run `bundle exec jekyll serve`
* navigate to http://localhost:4000/dom-dashboard.html
  (this file will be renamed to ''guess-who-dashboard.html'' at some point)

## Adding new data to the dashboard

- Add CSV files to ''assets/data/dashboard/'' either to the ''authorship'',
  ''leadership'' or ''influence'' folder. The file should be named after
  this scheme: ''$sdo_$wg'', e.g. ''ietf_add''
- Add the working group concerned by this data to ''_data/dom_dashboard_working_groups.yaml''
  (This file will be renames to ''_data/guess_who_dashboard_working_groups.yaml'' at
  some point).

## Building the _site for export

`bundle exec jekyll build`

## Building the _site and test all links

`rake test`
