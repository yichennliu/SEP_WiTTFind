import re
import os
for root, dirs, files in os.walk("."):
    for filename in files:
        if filename.endswith(".html"):
            filepath = os.path.join(root,filename)
            newText = []
            with open(filepath, "r") as readfile:
                text = readfile.readlines()
               
                for line in text:
                    line =line.replace("bower_components", "components")
                    line =line.replace("screenshot", "screenshot nav-link")
                    line =line.replace("navbar-inverse navbar-static-top" ,"navbar-dark bg-dark navbar-expand-lg")
                    if re.search("bootstrap-theme\.min\.css", line) or re.search("bootstrap-multiselect\.css", line):
                        pass
                    else:
                        newText.append(line)
            with open(filepath, "w") as writefile:
                writefile.writelines(newText)

"""
try:
se = re.search('bower_components', line).group()
print(se)
except (AttributeError):
print("no match")
"""
