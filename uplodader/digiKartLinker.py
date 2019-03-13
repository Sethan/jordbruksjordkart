import math
import mysql.connector
import csv

with open("kommuneAreal.csv") as k:
    mydb = mysql.connector.connect(
            host="localhost",
            user="digiKartAdmin",
            passwd="CSOI-83ee-676e-991b-3f20-6a41",
            database="mydb"
    )
    mycursor=mydb.cursor()
    mycursor.execute("DELETE FROM kommuner_over_tid")
    mydb.commit()
    reader=csv.reader(k, delimiter=";")
    for row in reader:
        sql = "INSERT INTO kommuner_over_tid (aar,fylke_id,kommune_id) VALUES (%s,%s,%s)"
        values =(2016,math.floor(int(row[0])/100),row[0])
        mycursor.execute(sql,values)
    mydb.commit()
