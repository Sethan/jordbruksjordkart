import mysql.connector
import re
import csv

a=0
with open("kommuneAreal.csv", encoding="ISO-8859-1") as f:
    reader=csv.reader(f, delimiter=";", quotechar='"')
    for a in reader:
        print(a[2])


with open("kommune.csv", encoding="ISO-8859-1") as f:
    reader=csv.reader(f, delimiter=";", quotechar='"')
    counter=0
    for row in reader:
        if counter==5:
            break
        else:
            print(re.findall(r'\D+',row[0]))
            print(re.findall(r'\d+',row[0]))

            for x in range(2, len(row)-1):
                print(row[x])
        counter+=1

#mydb = mysql.connector.connect(
 # host="localhost",
  #user="digiKartAdmin",
  #passwd="CSOI-83ee-676e-991b-3f20-6a41",
  #database="mydb"
#)
#mycursor = mydb.cursor()

#mycursor.execute("SHOW TABLES")
#for x in mycursor:
 #   print(x)

