

working_groups = {
    'ietf' : [
        'add',
        'detnet',
        'dprive',
        'dnsop',
        'lamps',
        'mls',
        'masque',
        'nvo3',
        'ohai',
        'pce',
        'privacypass',
        'ppm',
        'quic',
        'rtcweb',
        'tls'
    ],
    'irtf' : [
        'dinrg',
        'hrpc',
        'panrg',
        'pearg'
    ]
}

# these tuples convey two parts of the working group's API path
# e.g. https://api.w3.org/groups/ig/privacy
w3c_working_groups = [
    ('cg', 'privacycg'),
    ('ig', 'privacy'),
    ('bg', 'web-adv'),
    ('cg', 'patcg'),
    ('wg', 'did')
]

working_group_mailing_list_fixes = {
    'dinrg' : 'din',
    'dprive' : 'dns-privacy',
    'lamps' : 'spasm',
    'privacypass': 'privacy-pass',
    ('cg', 'privacycg') : 'public-privacycg',
    ('ig', 'privacy') : 'public-privacy',
    ('bg', 'web-adv') : 'public-web-adv',
    ('cg', 'patcg') : 'public-patcg',
    ('wg', 'did') : 'public-did-wg'
}

# Working groups:
# - Privacy Community Group: `cg/privacycg'
# - Privacy Interest Group: `ig/privacy`
# - Improving Web Advertising Business Group,: `bg/web-adv`
# - Private Advertising Technology Community Group: `cg/patcg`
# - Decentralized Identifier Working Group: `wg/did`

affiliations_path = "raw_data/affiliations" # need to add the working group and csv
affil_time_start_column = 'Time start (mm/yyyy)'
affil_time_end_column = 'Time end (mm/yyyy)'

almanac_path = ".."
leadership_data_path = "assets/data/dashboard/leadership/"
authorship_data_path = "assets/data/dashboard/authorship/"
influence_data_path = "assets/data/dashboard/influence/"


mail_archives_path = "archives/"