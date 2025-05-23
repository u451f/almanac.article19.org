# THINGS TO DO TO SET UP THE ALMANAC DATA

## setting up the python environment

Python 3.12 virtual environment:

`python3.12 -m venv .venv` -- but make sure your Python 3 is version 3.10 or above!

`source .venv/bin/activate`

`python -m pip install bigbang-py`

## getting raw data

### affiliation data

The "Missing Affiliations" data used to infer the affiliations of SDO participants
is personal information collected from the public web in service of the public interest.

It has been created and maintained by Article 19.
To get it, you need to request access from Article 19.
https://drive.google.com/drive/folders/1PUX8ScmtlrJGZFORlT9DCioo2ErnVyES?usp=sharing

Individual files will need to be named `affilations-{working group mailing list name}.csv`
in a directory indicated by `affiliations_path` in `config.py`.

This `{working group acronym}` should match the identifier of the working group _mailing list_.
(In some cases, that is different from the identifier of the working group.)

### corrections data

For the 'corrections' data -- key/value pairs for which the key is to be swapped to the
value, as a last pass on data cleaning -- should be provided in a .csv file.

This is indicated in `config.py`.

## configuring the data processing scripts

`config.py` contains:
 - lists of working groups to pull data from
 - paths to local raw data and corrections data
 - paths to populate the almanac

## Influence

### mailing list archives

#### IETF/IRTF and W3C

Running this script, in the bigbang environment, will pull all the IETF/IRTF and W3C mail archives and put them in a local directory.

`python collect_almanac_data.py`

### Influence

`python influence-mbox-affiliation.py`

## IETF / IRTF:

### Authorship

`python authorship_datatracker.py`

### Leadership - TODO 

`python leadership_datatracker_affiliations.py`

## W3C:

### Authorship

`python w3c_authorship.py`

### Leadership

`python w3c_leadership.py`

## Landing page

`python landing_page.py`