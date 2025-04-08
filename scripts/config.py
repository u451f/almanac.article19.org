import os

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
data_dir = os.path.join(almanac_path, "assets/data")

a_dir = "authorship"
l_dir = "leadership"
i_dir = "influence"

dash_dir = "dashboard/"
landing_dir = "overview/"

#dashboard paths
leadership_data_path = os.path.join(data_dir, dash_dir, l_dir)
authorship_data_path = os.path.join(data_dir, dash_dir, a_dir)
influence_data_path = os.path.join(data_dir, dash_dir, i_dir)

mail_archives_path = "../../archives/"

# a general dictionary of corrections for names and affilations.
corrections = {
    "Adobe Systems" : "Adobe",
    "Akamai" : "Akamai Technologies",
    "Brave" : "Brave Software",
    "Apple Inc." : "Apple",
    "CDT" : "Center for Democracy and Technology",
    "Center for Democracy & Technology" : "Center for Democracy and Technology",
    "Center for Democracy" : "Center for Democracy and Technology",
    "Digicert Inc." : "Digicert",
    "SiemensAG" : "Siemens",
    "Siemens AG" : "Siemens",
    "Vigil Security LLC" : "Vigil Security",
    "Vigil Security, LLC" : "Vigil Security",
    "Ciena Coroporation" : "Ciena",
    "Ciena Corporation" : "Ciena",
    "Akami" : "Akamai Technologies",
    "Akami Technologies" : "Akamai Technologies",
    "Mark Nottingham via Datatracker" : "Mark Nottingham",
    "Nokia CA/Ottowa" : "Nokia",
    "Nokia - CA/Ottawa" : "Nokia",
    "Nokia - CA/Ottowa" : "Nokia",
    "Nokia - CA\/Ottawa" : "Nokia",
    "Nokia - FR/Paris-Saclay" : "Nokia",
    "Nokia - DE/Stuttgart" : "Nokia",
    "Internet-Drafts@ietf.org" : "internet-drafts@ietf.org",
    "The New Yor Times" : "The New York Times",
    "Sinodun IT" : "Sinodun",
    "Sinodun Internet Technologies" : "Sinodun",
    "deSEC, Technische Universität Berlin" : "deSEC",
    "deSEC, Secure Systems Engineering" : "deSEC",
    "deSEC, SSE - Secure Systems Engineering" : "deSEC",
    "Verisign Labs" : "Verisign",
    "John R Levine" : "John Levine",
    "Dyn, Inc." : "Dyn",
    "Google LLC" : "Google",
    "Google, LLC." : "Google",
    "Google Inc" : "Google",
    "Google, Inc" : "Google",
    "Google, Inc." : "Google",
    "Google Inc." : "Google",
    "Google Switzerland GmbH" : "Google",
    "Google Switzerland" : "Google",
    "Huawei Technologies" : "Huawei",
    "Huawei Technology" : "Huawei",
    "Huawei Device Co. Ltd": "Huawei",
    "Huawei Device Co. Ltd.": "Huawei",
    "Huawei Technologies Co., Ltd.": "Huawei",
    "Huawei Technologies Co. Ltd.": "Huawei",
    "Huawei Technologies Co. Ltd": "Huawei",
    "Huawei Network.IO Innovation Lab" : "Huawei",
    "Internet Systems Consortium, Inc." : "Internet Systems Consortium",
    "Cisco Systems" : "Cisco",
    "Brocade Communications" : "Brocade",
    "RtBrick India" : "RtBrick Inc",
    "Telefonica I+D" : "Telefonica",
    "Telefonica Investigacion y Desarrollo" : "Telefonica",
    "University of Electro-Communications" : "University of Electro Communications",
    "Cloudflare Ltd." : "Cloudflare",
    "Cloudflare, Inc." : "Cloudflare",
    "ETH Zürich" : "ETH Zurich",
    "NTT Communications Corporation" : "Nippon Telegraph and Telephone Corporation (NTT)",
    "NTT Corporation" : "Nippon Telegraph and Telephone Corporation (NTT)",
    "NTT" : "Nippon Telegraph and Telephone Corporation (NTT)",
    "KDDI Corporation" : "KDDI",
    "KDDI R&D Labs" : "KDDI",
    "KDDI R&D Laboratories, Inc." : "KDDI",
    "Juniper" : "Juniper Networks",
    "Meta " : "Meta",
    "Meta Platforms, Inc." : "Meta",
    "Meta Platforms" : "Meta",
    '"IETF Secretariat "" agenda@ietf.org' : "IETF Secretariat",
    '"IETF Secretariat" agenda@ietf.org' : 'IETF Secretariat',
    '"IETF Secretariat "" <agenda@ietf.org>' : 'IETF Secretariat',
    "The IESG" : "IESG",
    "internetdrafts@ietf.org" : "IETF",
    "ZTE Corporation" : "ZTE",
    "Futurewei Technologies" : "Futurewei",
    "Futurewei Technologies (Huawei)" : "Futurewei",
    "Comcast NBC Universal" : "NBCUniversal",
    "brent.zundel@evernym.com" : "Zundel, Brent",
    "=Drummond Reed" : "Drummond Reed",
    "=?utf-8?B?4ZCv4Zep4ZGOIFThkYzhl6nhkY7hkY4g76O/?=\n <vantuan632000@icloud.com>" : "<vantuan632000@icloud.com>",
    "Orange " : "Orange",
    "BROADCOM CORPORATION" : "Broadcom Corporation",
    "Sam Weiler" : "Samuel Weiler",
    "Eggert, Lars" : "Lars Eggert",
    "World Wide Web Consortium" : "W3C",
    "Blumenthal, Uri - 0553 - MITLL" : "Uri Blumenthal",
    "Nominum, Inc." : "Nominum",
    "Oracle+Dyn" : "Oracle",
    "Oracle + Dyn" : "Oracle",
    "Parsons, Inc." : "Parsons",
    "VeriSign, Inc." : "Verisign",
    "dimitri papadimitriou" : "Dimitri Papadimitriou",
    "Mahend Negi" : "Mahendra Singh Negi",
    "Théophile Wallez" : "Theophile Wallez",
    "Sofía Celi" : "Sofia Celi",
    "Christopher Wood" : "Christopher A. Wood",
    "Ben Schwartz" : "Benjamin Schwartz",
    "Mankin, Allison" : "Allison Mankin",
    "Wessels, Duane" : "Duance Wessels"
}