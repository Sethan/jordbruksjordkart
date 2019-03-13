apt update
apt-get install mysql-server -y
apt-get install git
apt-get install nodejs -y
apt-get install python3-pip -y
python3.7 -m pip install mysql-connector
git init
git clone https://github.com/Sethan/jordbruksjordkart.git


cat /jordbruksjordkart/modeller/script.sql | mysql -u root -p

python3.7 /jordbruksjordkart/uplodader/digiKartAdder.py
python3.7 /jordbruksjordkart/uploader/digiKartLinker.py



nodejs /jordbruksjordkart/start.js
