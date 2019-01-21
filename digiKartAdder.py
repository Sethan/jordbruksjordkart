import mysql.connector
import re
import csv

with open("kommune.csv") as f:
    reader=csv.reader(f, delimiter=";", quotechar='"')
    counter=0
    for row in reader:
        
        if counter<2:
            print(row)
        elif counter==50:
            break
        else:
            print(re.findall(r'\D+',row[0]))
            print(re.findall(r'\d+',row[0]))
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
    
