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
    mydb.commit()
    reader=csv.reader(k, delimiter=";")
    for row in reader:
        sql = "INSERT INTO kommuner_over_tid (aar,fylke_id,kommune_id) VALUES (%s,%s,%s)"
        values=""
        fid=math.floor(int(row[0])/100)
        if(math.floor(int(row[0])/100)>22):
            values=(2018,fid,row[0])
        else:
            values=(2016,fid,row[0])
        mycursor.execute(sql,values)
    mydb.commit()
quit()
