from bigbang.analysis.datatracker import *
import bigbang.analysis.utils as utils
import config
from datetime import datetime, date, timezone
import pandas as pd
import pytz
import os

wgs = {}
wgs.update(config.working_groups)


def affiliate_leadership(agg_leadership, affiliation):
    """
    agg_leadership : dataframe with columns name, person_uri, datetime_min, and datetime_max
    
    affiliation input : a dataframe with the following columns:
        Index(['Name', 'Email', 'Affiliation #', 'Affiliation', 'Time start (mm/yyyy)',
           'Time end (mm/yyyy)', 'Provenance (who, how, when)'],
          dtype='object')
        where 'Time start (mm/yyyy)' and 'Time end (mm/yyyy)' are parsed as dates.
    """

    records = []

    for row in l_agg_df.iterrows():
    
        name = row[0][0]
        tenure_start = row[1]['datetime_min']
        tenure_end = row[1]['datetime_max']

        a_matches = a_df[a_df['Name'] == name]
    
        for arow in a_matches.iterrows():
            affiliation = arow[1]['Affiliation'].strip()

            affiliation = config.corrections.get(affiliation, affiliation)
        
            affil_start = arow[1][config.affil_time_start_column]
            affil_end = arow[1][config.affil_time_end_column]

            record = {
                'name' : name,
                'affiliation' : affiliation,
                'time_start' : max([tenure_start, affil_start]) ,
                'time_end' : min([tenure_end, affil_end])
            }
            
            if record['time_start'] <= record['time_end']:
                records.append(record)
            
    affiliated_leadership_df = pd.DataFrame.from_records(records)
    
    return affiliated_leadership_df

for sdo in wgs:
    for wg in wgs[sdo]:
        print(wg)
    
        l_df, l_agg_df = leadership_ranges(wg)
    
        a_df = pd.read_csv(
            os.path.join(config.affiliations_path, f"affiliations-{wg}.csv"),
            parse_dates = [config.affil_time_start_column, config.affil_time_end_column]
        )
    
        
        a_df[config.affil_time_start_column] = a_df[config.affil_time_start_column].apply(utils.clean_dates)
        a_df[config.affil_time_end_column] = a_df[config.affil_time_end_column].apply(
            lambda d : utils.clean_dates(d, start=False)
            )
    
        leaders = affiliate_leadership(l_agg_df, a_df)
        path = os.path.join(config.leadership_data_path, f"{sdo}-{wg}.csv")
        leaders.to_csv(path) # problem -- ietf/irtf