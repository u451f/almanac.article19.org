import pandas as pd
import os

data_dir = "../almanac.article19.org/assets/data/"

dash_dir = "dashboard/"
landing_dir = "overview/"

a_dir = "authorship"
l_dir = "leadership"
i_dir = "influence"

dashboard_data_dir_path = os.path.join(data_dir, dash_dir)


## authorship

authorship_files = os.listdir(os.path.join(data_dir, dash_dir, a_dir))

adata = {
    'ietf' : [],
    'irtf' : [],
    'w3c' : []
}

for filename in authorship_files:
    wg = filename.split('-')[0]
    df = pd.read_csv(os.path.join(data_dir, dash_dir, a_dir, filename), index_col=0)
    
    adata[wg].append(df)

big_adfs = {}

for wg in adata:
    print(wg)
    df_list = adata[wg]
    
    
    big_adfs[wg] = pd.concat(df_list, ignore_index=True)
    
    top_10 = big_adfs[wg].groupby('affiliation') \
                         .count()['submission_date'] \
                         .sort_values(ascending=False)[:10].index

    big_adfs[wg] = big_adfs[wg][big_adfs[wg]['affiliation'].apply(lambda x: x in top_10)]
    
    big_adfs[wg]['year'] = big_adfs[wg]['submission_date'].apply(lambda x: x[:4])
    
    big_adfs[wg]
    
    big_adfs[wg] = big_adfs[wg].groupby(['affiliation', 'year']) \
                .count().reset_index() \
                .pivot(index='year', columns='affiliation', values='title') \
                .fillna(0)
    
    big_adfs[wg].to_csv(os.path.join(data_dir, landing_dir, a_dir, f"{wg}.csv"))



# influence

influence_files = os.listdir(os.path.join(data_dir, dash_dir, i_dir))

idata = {
    'ietf' : [],
    'irtf' : [],
    'w3c' : []
}

for filename in influence_files:
    wg = filename.split('-')[0]
    df = pd.read_csv(os.path.join(dashboard_data_dir_path, i_dir, filename),  index_col = 'Date')
    
    idata[wg].append(df)

big_dfs = {}

for wg in idata:
    df_list = idata[wg]
    
    index = df_list[0].index
    columns = df_list[0].columns
    
    big_dfs[wg] = pd.DataFrame({},{})
    
    add = lambda s1, s2: s1 + s2
    
    for df in df_list:
        big_dfs[wg] = big_dfs[wg].combine(other=df,func= add, fill_value=0)
        
    # filter by top 10 most active
    big_dfs[wg] = big_dfs[wg][big_dfs[wg].sum().sort_values(ascending=False)[:10].index]
    
    big_dfs[wg].to_csv(os.path.join(data_dir, landing_dir, i_dir, f"{wg}.csv"))


# leadership

leadership_files = os.listdir(os.path.join(data_dir, dash_dir,l_dir))

ldata = {
    'ietf' : [],
    'irtf' : [],
    'w3c' : []
}

for filename in leadership_files:
    wg = filename.split('-')[0]
    df = pd.read_csv(os.path.join(data_dir, dash_dir, l_dir, filename))
    
    ldata[wg].append(df)

big_ldfs = {}

for wg in ldata:
    idf = pd.read_csv(os.path.join(data_dir, landing_dir, i_dir, f"{wg}.csv"))
    
    dates = idf['Date']
    
    df_list = ldata[wg]
    
    big_ldfs[wg] = pd.DataFrame({},{})
    
    for ldf in df_list:
        cdf = pd.DataFrame(
            index = dates,
            columns = [x.strip() for x in ldf['affiliation'].unique()]
        ).fillna(0)
    
        for row in ldf.iterrows():
            aff = row[1]['affiliation'].strip()
    
            for date in dates:
                if date > row[1]['time_start'] and date < row[1]['time_end']:
                    cdf[aff][date] = cdf[aff][date] + 1
                    
        add = lambda s1, s2: s1 + s2
    
        big_ldfs[wg] = big_ldfs[wg].combine(other=cdf,func= add, fill_value=0)
        
    big_ldfs[wg] = big_ldfs[wg][big_ldfs[wg].sum().sort_values(ascending=False)[:10].index]
    
    big_ldfs[wg].to_csv(os.path.join(data_dir, landing_dir, l_dir, f"{wg}.csv"))

