from bigbang.analysis.datatracker import *
import config
import os

wgs = {}
wgs.update(config.working_groups)

for sdo in wgs:
    for wg in wgs[sdo]:
        print(sdo, wg)
        df = rfc_authors_from_working_group(wg)

        df = df.rename(columns={
            "date" : "submission_date"
        })

        try:
            df.drop(columns="name", inplace=True)
        except Exception as e:
            print(e)

        if "affiliation" in df:
            print(f"correcting affiliations of {sdo} {wg}")
            df["affiliation"] = df["affiliation"].map(lambda x: config.corrections.get(x, x))

        path = os.path.join(config.authorship_data_path, f"{sdo}-{wg}.csv")
        print(path)
        df.to_csv(path_or_buf=path)