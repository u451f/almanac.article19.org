

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

affiliations_path = "../../raw_data/affiliations" # need to add the working group and csv
affil_time_start_column = 'Time start (mm/yyyy)'
affil_time_end_column = 'Time end (mm/yyyy)'

almanac_path = ".."
leadership_data_path = "assets/data/dashboard/leadership/"
authorship_data_path = "assets/data/dashboard/authorship/"
influence_data_path = "assets/data/dashboard/influence/"


mail_archives_path = "../../archives/"

# a general dictionary of corrections for names and affilations.
corrections = {
    "Adobe Systems" : "Adobe",
    "Akamai" : "Akamai Technologies",
    "Brave" : "Brave Software",
    "Apple Inc." : "Apple",
    "CDT" : "Center for Democracy and Technology",
    "Digicert Inc." : "Digicert",
    "SiemensAG" : "Siemens",
    "Vigil Security" : "Vigil Security LLC",
    "Ciena Coroporation" : "Ciena",
    "Ciena Corporation" : "Ciena",
    "Akami" : "Akamai Technologies",
    "Akami Technologies" : "Akamai Technologies",
    "Nokia CA/Ottowa" : "Nokia",
    "Internet-Drafts@ietf.org" : "internet-drafts@ietf.org",
    "The New Yor Times" : "The New York Times",
    "Sinodun IT" : "Sinodun",
    "Sinodun Internet Technologies" : "Sinodun",
    "deSEC, Technische Universität Berlin" : "deSEC",
    "deSEC, Secure Systems Engineering" : "deSEC",
    "deSEC, SSE - Secure Systems Engineering" : "deSEC",
    "Verisign Labs" : "Verisign",
    "John Levine" : "John R. Levine",
    "Dyn, Inc." : "Dyn",
    "Google LLC" : "Google"
}

"""
    3 different versions of Cloudflare (see ietf-tls)
    Nominum and Noiminum, Inc.
    Digicert and Digicert Inc.
    6 different versions of Google + Google Switzerland GmbH (see ietf-tls)
    Dell and Dell EMC and EMC
    Juniper and Juniper Networks
    Huawei in many forms
    KDDI in 4 different forms (ietf-pce has all of them)
    Rtbrick Inc. and Rtbrick India
    Telefonica in 3 different versions
    University of Electro Communications and University of Electro-Communications
    2 versions of NTT (see ietf-tls)
    "W3C Invited Expert" and "Invited Expert", I suspect they should be merged
    "Center for Democracy" - 
      I do suspect that should be "Center for Democracy and Technology (CDT)", 
      which shows up elsewhere under the acronym "CDT" and as "Center for Democracy and Technology"
    Google and "Google Switzerland" are still separate entities.
    "Parsons" and "Parsons Inc."
"""