#!/usr/bin/env python
# coding: utf-8

# In[5]:


from bigbang.archive import Archive, open_list_archives

import bigbang.parse as parse
import bigbang.analysis.utils as utils
from bigbang.analysis.affiliation import *
import config

from datetime import datetime, date, timezone

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from pathlib import Path

import os
import subprocess

wgs = {}
wgs.update(config.working_groups)

wgs['w3c'] = []
wgs['w3c'].extend(config.w3c_working_groups )


config.working_group_mailing_list_fixes 
## TODO FIX THIS!

for sdo in wgs:
    for wg in wgs[sdo]:
        print(f"{sdo} {wg}")

        if wg in config.working_group_mailing_list_fixes:
            arx_wg = config.working_group_mailing_list_fixes[wg]
        else:
            arx_wg = wg

        # prepare the affiliation
        affilation_path = Path(os.path.join(config.affiliations_path, f"affiliations-{arx_wg}.csv"))

        if affilation_path.is_file():
            print(f"Affiliations from {affilation_path}")
            a_df = pd.read_csv(
                affilation_path, # hack for the W3C case
                parse_dates = [config.affil_time_start_column, config.affil_time_end_column]
            )
        else:
            dummy_wg = 'dnsop' ## hack...
            a_df = pd.read_csv(
                os.path.join(config.affiliations_path, f"affiliations-{dummy_wg}.csv"), # hack for the W3C case
                parse_dates = [config.affil_time_start_column, config.affil_time_end_column]
            )

        a_df[config.affil_time_start_column] = a_df[config.affil_time_start_column].apply(utils.clean_dates)
        a_df[config.affil_time_end_column] = a_df[config.affil_time_end_column].apply(lambda d : utils.clean_dates(d, start=False))
    
        # get the data

        try:
            arx_path = os.path.join(config.mail_archives_path, arx_wg)
            print(f"{arx_path}")
            data = open_list_archives(arx_wg, archive_dir = config.mail_archives_path)
        except Exception as e:
            print(e)

        arx = Archive(data)
    
        influence = affiliated_influence(arx, a_df, corrections = config.corrections)

        if isinstance(wg, tuple):
            wgp = f"{wg[0]}-{wg[1]}"
        else:
            wgp = wg
        path = os.path.join(config.influence_data_path, f"{sdo}-{wgp}.csv")
        print(path)
        influence.to_csv(path)





