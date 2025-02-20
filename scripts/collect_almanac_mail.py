#!/usr/bin/python
import config
import subprocess, sys

archive_path = "../archive-test/"

wgs = {}
wgs.update(config.working_groups)


## This is fast
for sdo in wgs:
    for wg in wgs[sdo]:


        if wg in config.working_group_mailing_list_fixes:
            arx_wg = config.working_group_mailing_list_fixes[wg]
        else:
            arx_wg = wg

        command = f"rsync -v -r rsync.ietf.org::mailman-archive/{arx_wg} {config.mail_archives_path}"

        print(command)
        

## This can take a long time

w3c_command = f"bigbang collect-mail --file W3C.txt --archives {config.mail_archives_path}"
print(w3c_command)
subprocess.run(w3c_command, shell = True, executable="/bin/bash")