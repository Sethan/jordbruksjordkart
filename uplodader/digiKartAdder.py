import mysql.connector
import re
import csv

with open("kommune.csv") as f:
    reader=csv.reader(f, delimiter=";")
    counter=0
    mydb = mysql.connector.connect(
            host="localhost",
            user="digiKartAdmin",
            passwd="CSOI-83ee-676e-991b-3f20-6a41",
            database="mydb"
    )
    mycursor=mydb.cursor()
    mycursor.execute("DELETE FROM kommune")
    mycursor.execute("DELETE FROM kommunelandbruksareal")
    mydb.commit()
    years=[]
    for row in reader:  
        with open("kommuneAreal.csv", encoding="UTF-8") as u:
            reader2=csv.reader(u, delimiter=";")
            if counter==0:
                for y in range(2,len(row)):
                    a=re.findall(r'\d+',row[y])
                    years.append(a[0])
            elif counter==-3:
                break
            else:
                for x in reader2:
                       if x[0]==row[0]:
                           sql = "INSERT INTO kommune (id,Navn,Areal) VALUES (%s,%s,%s)"
                           values =(x[0],x[1],x[2])
                           mycursor.execute(sql,values)
                           mydb.commit()
                           for n in range(3,len(row)):
                               sql2 = "INSERT INTO kommunelandbruksareal (Landbruksareal,Aar, Kommune_id) VALUES (%s, %s, %s)"
                               values2 = (row[n],years[n-3],x[0])
                               mycursor.execute(sql2,values2)
                               mydb.commit()
                           break
            counter+=1


