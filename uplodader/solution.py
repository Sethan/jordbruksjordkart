import mysql.connector
import csv
import re
import math


mydb = mysql.connector.connect(
        host="localhost",
        user="digiKartAdmin",
        passwd="CSOI-83ee-676e-991b-3f20-6a41",
        database="mydb"
)
mycursor=mydb.cursor()
mycursor.execute("DELETE FROM kommune")
mycursor.execute("DELETE FROM kommunelandbruksareal")
mycursor.execute("DELETE FROM fylke")
mydb.commit()

with open("fylkeAreal.csv", encoding="UTF-8") as f:
    reader=csv.reader(f, delimiter=";")
    for row in reader:
        sql = "INSERT INTO fylke (id,Navn,areal) VALUES (%s,%s,%s)"
        values =(row[0],row[1],row[2])
        mycursor.execute(sql,values)
    mydb.commit()


with open("kommuneAreal.csv", encoding="UTF-8") as u:
    reader=csv.reader(u, delimiter=";")
    for x in reader:
        sql = "INSERT INTO kommune (id,Navn,Areal,startaar,sluttaar,fylke_id) VALUES (%s,%s,%s,%s,%s,%s)"
        values =(x[0],x[1],x[2],x[3],x[4],math.floor(int(x[0])/100))
        mycursor.execute(sql,values)
    mydb.commit()

with open("JordbruksAreal.csv", encoding="ISO-8859-1") as f:
    reader=csv.reader(f, delimiter=";")
    counter=0
    years=[]
    for row in reader:
        if counter==0:
            for y in range(2,len(row)):
                a=re.findall(r'\d+',row[y])
                years.append(a[0])
            counter+=1
        else:
            for n in range(2,len(row)):
                sql2 = "INSERT INTO kommunelandbruksareal (Landbruksareal,Aar, Kommune_id) VALUES (%s, %s, %s)"
                if row[n]=="NULL":
                   row[n]=None
                values2 = (row[n],years[n-2],row[0])
                mycursor.execute(sql2,values2)
                print(values2)
            print("Number %d" %counter)
            counter+=1
        mydb.commit()
print("done!")
