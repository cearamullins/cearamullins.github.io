#!/usr/bin/python3
import cgi, os
import cgitb; cgitb.enable()
import json
import sys
from datetime import date
import base64
import portalocker
import re

sys.stdout.write("Content-Type: application/json")
sys.stdout.write("\n")
sys.stdout.write("\n")

# retrieving the exhibit data
fs = cgi.FieldStorage()

# retrieving exhibit content information
exhibitContent = json.loads(fs.getvalue("exhibitContent"))
result = {} # create instance of result

# get all general information
result['filename'] = exhibitContent['filename']
result['creators'] = exhibitContent['creator']
result['exhibitCover'] = exhibitContent['exhibitCover']
result['coverImage'] = exhibitContent['coverImage']
result['template'] = exhibitContent['template']

result['contents'] = json.loads(exhibitContent['contents'])

# fetch exhibit system information
with open("cearamullins.github.io/json/exhibitData.json", 'r') as f:
   data = json.load(f)
systemData = data["systemData"]
noExhibits = systemData["noExhibits"]
noExhibits = noExhibits + 1
systemData["noExhibits"] = noExhibits

# update system record
with open("/home/ubuntu/json/noExhibits.json", 'w') as f:
   portalocker.lock(f, portalocker.LOCK_EX)
   json.dump(data,f,indent=4)

exID = str(noExhibits)
today = date.today()
lastUpdated = today.strftime("%d/%m/%Y")

# convert from base64 -> decode file
coverData = base64.b64decode((result['exhibitCover']).split(',')[1])

title = result['filename']
creators = result['creators']
#coverImage = result['coverImage']
template = result['template']
exhibitTitle = title

if " " in title:
   title.replace(" ", "")

# save exhibit cover
# create a new unique filename
filename = "/home/ubuntu/public_html/exhibitCovers/"+title+"_"+exID+"Exhibit.jpg"
with open(filename, 'wb') as f:
   f.write(coverData)

coverImage = "./exhibitCovers/"+title+"_"+exID+"Exhibit.jpg"

#save template
with open("/home/ubuntu/json/aTest.json", 'r') as f:
   exhibitData = json.load(f)
   exhibits = exhibitData["exhibits"]

exhibits[exID] = {"title":exhibitTitle,"creators":creators,"coverImage":coverImage,"template":template,"lastUpdated":lastUpdated,"comments":[]}
contents = exhibitData["contents"]
contents[exID] = result['contents']
with open("/home/ubuntu/json/aTest.json", 'w') as f:
   portalocker.lock(f, portalocker.LOCK_EX)
   json.dump(exhibitData,f,indent=4)
result["message"] = "added exhibit"
result["newID"] = exID

print(json.dumps(result))

pdfName = re.sub('[^A-Za-z0-9]+', '', pdfName)

html = "../demoHTML/"+pdfName+"_"+id+".html"
pdf = "../pdfs/"+pdfName+"_"+id+".pdf"
#delete existing pdf
try:
    os.system("[ -e %s ] && rm %s" %(pdf,pdf))
    os.system("sudo wkhtmltopdf --log-level none --disable-smart-shrinking --page-size a4 --margin-bottom 0 --margin-left 0 --margin-right 0 --margin-top 0 --zoom 0.52 %s %s" %(html,pdf))

except:
    pass