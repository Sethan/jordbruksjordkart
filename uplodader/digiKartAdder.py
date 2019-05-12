import mysql.connector
import csv
<<<<<<< HEAD
import sys

=======
import re
import math
>>>>>>> 9000265607f54ebd3c48e97f81139b9b611fab11
with open("fylkeAreal.csv", encoding="UTF-8") as f:
    reader=csv.reader(f, delimiter=";")
    mydb = mysql.connector.connect(
            host="localhost",
            user="digiKartAdmin",
            passwd="CSOI-83ee-676e-991b-3f20-6a41",
            database="mydb"
    )
    mycursor=mydb.cursor()
    mycursor.execute("DELETE FROM kommuner_over_tid")
    mycursor.execute("DELETE FROM kommune")
    mycursor.execute("DELETE FROM kommunelandbruksareal")
    mycursor.execute("DELETE FROM fylke")
    mydb.commit()
    for row in reader:
        sql = "INSERT INTO fylke (id,Navn,areal) VALUES (%s,%s,%s)"
        values =(row[0],row[1],row[2])
        mycursor.execute(sql,values)
    mydb.commit()


with open("JordbruksAreal.csv", encoding="ISO-8859-1") as f:
    reader=csv.reader(f, delimiter=";")
    counter=0
    mydb = mysql.connector.connect(
            host="localhost",
            user="digiKartAdmin",
            passwd="CSOI-83ee-676e-991b-3f20-6a41",
            database="mydb"
    )
    mycursor=mydb.cursor()
    years=[]
    for row in reader:
        with open("kommuneAreal.csv", encoding="UTF-8") as u:
            reader2=csv.reader(u, delimiter=";")
            if counter==0:
                for y in range(2,len(row)):
                    a=re.findall(r'\d+',row[y])
                    years.append(a[0])
            else:
                for x in reader2:
                       if x[0]==row[0]:
                           sql = "INSERT INTO kommune (id,Navn,Areal,startaar,sluttaar,fylke_id) VALUES (%s,%s,%s,%s,%s,%s)"
                           values =(x[0],x[1],x[2],x[3],x[4],math.floor(int(row[0])/100))
                           mycursor.execute(sql,values)
                           for n in range(2,len(row)):
                               sql2 = "INSERT INTO kommunelandbruksareal (Landbruksareal,Aar, Kommune_id) VALUES (%s, %s, %s)"
                               if row[n]=="NULL":
                                   row[n]=None
                               values2 = (row[n],years[n-2],x[0])
                               mycursor.execute(sql2,values2)
            print("Number %d" %counter)
            counter+=1
<<<<<<< HEAD
sys.exit()
=======
    mydb.commit()
print("done!")
>>>>>>> 9000265607f54ebd3c48e97f81139b9b611fab11
