import json
import urllib2
import datetime
import time

urls = ["ftp://nasdaqtrader.com/SymbolDirectory/nasdaqlisted.txt",
        "ftp://nasdaqtrader.com/SymbolDirectory/otherlisted.txt"]

open('../stocks.json', 'w')

def createJSON():
    objects = []

    for url in urls:
        fp = urllib2.urlopen(url)
        mybytes = fp.read()
        mystr = mybytes.decode("utf8")
        fp.close()
        mystr = mystr.split("\n")

        for n in range(len(mystr)):
            line = mystr[n].split("|")
            try:
                line.remove("\r")
                line.replace("Common Stock", ' ')
            except: pass
            for x in range(8-len(line)):
                line.append(" ")
            obj = {"Symbol":line[0],
                   "Security Name":line[1],
                   "Market Category":line[2],
                   "Test Issue":line[3],
                   "Financial Status":line[4],
                   "Round Lot Size":line[5],
                   "EFT":line[6] ,
                   "NextShares":line[7]}
            objects.append(obj)


    print("Please wait... Writing to JSON.")

    with open('../stocks.json', 'a') as f:
        json.dump(objects, f)

    print("Data Written to JSON.")

def checkTime():
    now = datetime.datetime.now()
    if(now.hour == 23):
        print('Cleaning File: Stocks.json')
        with open('stocks.json', 'w+') as f:
            pass
        print('Finished Cleaning File: Stocks.json') 

        for x in urls:
            createJSON(urls[x])

        print('Updated Stock list at: {}').format(now)
    else:
        time.sleep(1800)
        print('Checking Time: {}').format(now)
        checkTime()


createJSON()