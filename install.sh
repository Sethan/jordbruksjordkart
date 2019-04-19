#!/bin/sh
apt update
apt-get install mysql-server -y
apt-get install git
apt-get install nodejs -y
apt-get install python3-pip -y
apt-get install python3.7 -y
apt-get install npm
python3.7 -m pip install mysql-connector
git init
git clone https://github.com/Sethan/jordbruksjordkart.git
mysql -e "source jordbruksjordkart/modeller/script.sql"
mysql -e "GRANT ALL PRIVILEGES ON mydb.* TO 'digiKartAdmin'@'localhost' IDENTIFIED BY 'CSOI-83ee-676e-991b-3f20-6a41'"
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
npm install -g forever
forever start jordbruksjordkart/start.js
cd jordbruksjordkart/uplodader
python3.7 digiKartAdder.py
