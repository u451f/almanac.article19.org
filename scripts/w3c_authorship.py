from bs4 import BeautifulSoup
import config
import os
import pandas as pd
from pprint import pprint as pp
import urllib3

timeout = urllib3.util.Timeout(connect=2.0, read=7.0)

http = urllib3.PoolManager(timeout=timeout)

working_groups = config.w3c_working_groups

groups_api = "https://api.w3.org/groups?page=1&items=100"
resp = http.request("GET", groups_api)
resp.json()

gtype = 'ig'
shortname = 'privacy'


def specifications_data(gtype, shortname):
    group_specs_api = f"https://api.w3.org/groups/{gtype}/{shortname}/specifications"
    print(group_specs_api)

    group_specs_resp = http.request("GET", group_specs_api)
    group_specs_resp.json()
    
    if group_specs_resp.status == 404:
        print("Status 404!")
        return []

    ### Paging here

    if 'specifications' in group_specs_resp.json()['_links']:
        specifications = group_specs_resp.json()['_links']['specifications']
    else:
        print("No specifications for this WG")
        return []
    
    print(len(specifications))
    
    for spec in specifications:
        print(spec['href'])
        spec_resp = http.request("GET", spec['href'])
    
        spec['description'] = spec_resp.json()['description']
        spec['shortname'] = spec_resp.json()['shortname']
    
        shortlink = spec_resp.json()['shortlink']
        spec['shortlink'] = shortlink
        
        spec['latest_version_title'] = spec_resp.json()['_links']['latest-version']['title']
        latest_version_href = spec_resp.json()['_links']['latest-version']['href']
        print(latest_version_href)
        latest_version = http.request("GET", latest_version_href).json()
        spec['latest_version'] = latest_version

        print(latest_version['_links']['editors']['href'])
        editors =  http.request("GET", latest_version['_links']['editors']['href']).json()
        
        # assumes no paging
        spec['editors'] = editors['_links']['editors']
        
        for editor in spec['editors']:
            print(editor['href'])
            editor_user = http.request("GET", editor['href']).json()
            
            if 'status' not in editor_user or editor_user['status'] != 404:
                editor['user'] = editor_user
            
                print(editor_user['_links']['affiliations']['href'])
                affiliations = http.request("GET", editor_user['_links']['affiliations']['href']).json()
                editor['user']['affiliations'] = affiliations['_links']['affiliations']
    
    return specifications


def authorship(specifications_data):
    rows = []
    
    for spec in specifications_data:
        for editor in spec['editors']:
            if 'user' in editor:
                for affiliation in editor['user']['affiliations']:
                    entry = {}
            
                    entry['affiliation'] = affiliation['title']
                    # no available email
                    entry['name'] = editor['title']
                    entry['submission_date'] = spec['latest_version']['date']
                    entry['shortlink'] = spec['shortlink']
                    entry['title'] = spec['title']
                    entry['rec-track'] = spec['latest_version']['rec-track']
                    entry['latest_version_status'] = spec['latest_version_title']

                    rows.append(entry)

    return rows


dfs = []
for g in working_groups:
    rows = []
    print(g)
    ag = authorship(specifications_data(g[0], g[1]))
    
    for a in ag:
        a['working_group'] = f"{g[0]}/{g[1]}"
    rows.extend(ag)
    
    df = pd.DataFrame(rows)
    #print(df)
    #df["affiliation"] = df["affiliation"].map(lambda x: config.corrections.get(x, x))
    dfs.append(df)

    if df.size > 0:
        path = os.path.join(config.authorship_data_path, f"w3c-{g[0]}-{g[1]}.csv")
        df.to_csv(path)




