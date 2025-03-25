from bs4 import BeautifulSoup
import config
import os
import pandas as pd
from pprint import pprint as pp
import re
import urllib3

timeout = urllib3.util.Timeout(connect=2.0, read=7.0)

http = urllib3.PoolManager(timeout=timeout)

working_groups = config.w3c_working_groups

for g in working_groups:
    rows = []
    print(g)
    charters_api = f"https://api.w3.org/groups/{g[0]}/{g[1]}/charters"
    charters_resp = http.request("GET", charters_api)

    if charters_resp.status == 200:
        for link in charters_resp.json()['_links']['charters']:
            d = {
                'working_group' : f"{g[0]}/{g[1]}",
                'href' : link['href']
            }
            
            charter_resp = http.request("GET", link['href'])
            
            charter_text =  http.request("GET", charter_resp.json()['uri'])
            
            soup = BeautifulSoup(charter_text.data.decode('utf-8'), 'html.parser')
            
            charter_chairs_td_text = [
                tr for tr in soup.find_all("tr")
                if tr.find('th') is not None
                and 'Chairs' in tr.find('th').text][0].find('td').text
            
            old_chair_re = "(\w+ \w+) \(([\w ]+)\""
            chair_re = "(\w+ \w+)(, | \()([\w ]+)\)?"
            
            ms = re.finditer(chair_re, charter_chairs_td_text)
            
            for m in ms:          
                groups = m.groups()
                dd = d.copy()
                dd['name'] = groups[0]

                affil = groups[2]
                affil = affil.strip()
                affil = config.corrections.get(affil, affil)
                dd['affiliation'] = affil

                dd['time_start'] = charter_resp.json()['start']
                dd['time_end'] = charter_resp.json()['end']
            
                rows.append(dd)
    else:
        print(str(charters_resp.status) + " " + charters_api)
    
    df = pd.DataFrame(rows)
    print(df)
    if df.size > 0:
        path = os.path.join(config.leadership_data_path, f"w3c-{g[0]}-{g[1]}.csv")
        df.to_csv(path)