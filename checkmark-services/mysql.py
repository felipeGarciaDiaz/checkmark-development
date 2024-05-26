import os
from dotenv import load_dotenv
import pymysql

# setup the .env file in this directory.
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

# Database connection params
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')
DB_PORT = os.getenv('DB_PORT')

def get_db_connection(): # this code connecfs you to the mysql database that we setup earlier on your system.
    try:
        conn = pymysql.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
            port=int(DB_PORT),
            cursorclass=pymysql.cursors.DictCursor  # Return data as a dictionary
        )
        print("Database connection established")
        return conn
    except pymysql.MySQLError as e:
        print(f"Error connecting to the database: {e}")
        return None

# This method is jsut an example, I reccomend re-writing it where you need it
# This method jsut serves as an example on how you can add data into the sql database so we can use it on nodeJS.
# It's super simple, but you can and probably will need to expand on this, and ensure all the data is added and sent into there
# Coresponding and appropriate tables and places as well. Additionally ensure the data is turned to numbers, or strings, etc, when needed.
class DatabaseHandler: 
    def __init__(self, conn):
        self.conn = conn

    def add_temp_data(self):
        try:
            with self.conn.cursor() as cursor:
                # This is just reference for you to use as an example of how data can be added to the database by the use of python3 here.
                sql = "INSERT INTO copyrights (title, author) VALUES (%s, %s)"
                cursor.execute(sql, ('Example Title', 'Example Author'))
                self.conn.commit()
                print("Data added successfully")
        except Exception as e:
            print(f"Error inserting data: {e}")
            self.conn.rollback()

# Usage example
conn = get_db_connection()
if conn:
    db_handler = DatabaseHandler(conn)
    db_handler.add_temp_data()