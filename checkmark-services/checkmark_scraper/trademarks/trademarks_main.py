import os
import time
import requests
import concurrent.futures
from tqdm import tqdm
import sqlalchemy as db
from sqlalchemy import Table, Column, Integer, String, Boolean, MetaData, Text
from sqlalchemy.dialects.mysql import insert
from dotenv import load_dotenv
from urllib.parse import quote_plus
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Load environment variables from .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '../../../.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    raise FileNotFoundError(f"Could not find .env file at path: {dotenv_path}")

# Fetch environment variables
DB_USER = os.getenv('MARIA_DB_USER')
DB_PASS_ENCODED = quote_plus(os.getenv('MARIA_DB_PASS'))
DB_NAME = os.getenv('MARIA_DB_NAME')
DB_HOST = os.getenv('MARIA_DB_HOST')
DB_PORT = os.getenv('MARIA_DB_PORT')

session = requests.Session()
session.headers.update({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'})

def fetch_data(batch):
    url = f"https://tsdr.uspto.gov/multi/sn?ids={','.join(batch)}"
    logging.info(f"Fetching data for batch: {batch}")
    retries = 3
    for _ in range(retries):
        response = session.get(url)
        if response.status_code == 200:
            logging.info(f"Data fetched successfully for batch: {batch}")
            return response.json()
        elif response.status_code == 503:
            logging.warning("503 error, retrying after delay...")
            time.sleep(5)
        time.sleep(1)  # Add a delay of one second between requests
    logging.error(f"Failed to fetch data for batch: {batch} after {retries} retries")
    return None

def process_data(data):
    if not data or 'transactionList' not in data:
        return []

    results = []
    for transaction in data['transactionList']:
        for trademark in transaction.get('trademarks', []):
            result = create_result_dict(trademark)
            results.append(result)
    return results

def create_result_dict(trademark):
    return {
        "serialNumber": f"{trademark['status']['serialNumber']:08d}",
        "filingDate": trademark['status']['filingDate'],
        "status": trademark['status']['status'],
        "markElement": trademark['status'].get('markElement', ''),
        "descOfMark": trademark['status'].get('descOfMark', ''),
        "trademark": trademark['status'].get('trademark', False),
        "serviceMark": trademark['status'].get('serviceMark', False),
        "certificationMark": trademark['status'].get('certificationMark', False),
        "collectiveMembershipMark": trademark['status'].get('collectiveMembershipMark', False),
        "ownerName": trademark['parties']['ownerGroups'].get('20', [{}])[0].get('name', ''),
        "ownerAddress": f"{trademark['parties']['ownerGroups'].get('20', [{}])[0].get('address1', '')} {trademark['parties']['ownerGroups'].get('20', [{}])[0].get('address2', '')}".strip(),
        "ownerCity": trademark['parties']['ownerGroups'].get('20', [{}])[0].get('city', ''),
        "ownerState": trademark['parties']['ownerGroups'].get('20', [{}])[0].get('addressStateCountry', {}).get('stateCountry', {}).get('name', ''),
        "ownerZip": trademark['parties']['ownerGroups'].get('20', [{}])[0].get('zip', ''),
        "ownerCountry": trademark['parties']['ownerGroups'].get('20', [{}])[0].get('addressStateCountry', {}).get('iso', {}).get('name', ''),
        "gsDescription": trademark['gsList'][0].get('description', '') if trademark['gsList'] else '',
        "gsClassCode": trademark['gsList'][0].get('primeClassCode', '') if trademark['gsList'] else ''
    }

def generate_batches(start, end, batch_size):
    current = start
    while current >= end:
        batch = [f"{i:08d}" for i in range(current, max(current - batch_size, end - 1), -1)]
        current -= batch_size
        yield batch

def insert_data(engine, table, data):
    retries = 3
    while retries > 0:
        try:
            with engine.connect() as connection:
                stmt = insert(table).values(data)
                on_duplicate_key_stmt = stmt.on_duplicate_key_update(
                    {col.name: col for col in stmt.excluded if col.name != 'serialNumber'}
                )
                connection.execute(on_duplicate_key_stmt)
                return
        except db.exc.SQLAlchemyError as e:
            logging.error(f"Integrity error while inserting data: {e}")
            retries -= 1
            time.sleep(5)
    logging.error("Failed to insert data after 3 retries")

def create_table(engine):
    metadata = MetaData()
    trademarks_table = Table(
        'trademarks', metadata,
        Column('serialNumber', String(8), primary_key=True),
        Column('filingDate', String(10)),
        Column('status', Integer),
        Column('markElement', String(255)),
        Column('descOfMark', Text),
        Column('trademark', Boolean),
        Column('serviceMark', Boolean),
        Column('certificationMark', Boolean),
        Column('collectiveMembershipMark', Boolean),
        Column('ownerName', String(255)),
        Column('ownerAddress', String(255)),
        Column('ownerCity', String(255)),
        Column('ownerState', String(255)),
        Column('ownerZip', String(10)),
        Column('ownerCountry', String(255)),
        Column('gsDescription', Text),
        Column('gsClassCode', String(10))
    )
    metadata.create_all(engine)
    return trademarks_table

def trademarks_scraper_main():
    start = 73434000
    end = 0
    batch_size = 5  # Adjust based on rate limiting and performance

    engine = db.create_engine(f'mysql+pymysql://{DB_USER}:{DB_PASS_ENCODED}@{DB_HOST}:{DB_PORT}/{DB_NAME}')

    metadata = db.MetaData()

    try:
        trademarks_table = db.Table('trademarks', metadata, autoload_with=engine)
    except db.exc.NoSuchTableError:
        trademarks_table = create_table(engine)
        logging.info("Table 'trademarks' created successfully.")

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        future_to_batch = {executor.submit(fetch_data, batch): batch for batch in generate_batches(start, end, batch_size)}
        
        for future in tqdm(concurrent.futures.as_completed(future_to_batch), total=(start - end) // batch_size + 1):
            try:
                data = future.result()
                batch_results = process_data(data)
                if batch_results:
                    insert_data(engine, trademarks_table, batch_results)
                    logging.info(f"Inserted batch results: {batch_results}")
            except Exception as e:
                logging.error(f"An error occurred while processing batch: {future_to_batch[future]}, error: {e}")
                continue

if __name__ == "__main__":
    try:
        trademarks_scraper_main()
    except Exception as e:
        logging.critical(f"Script terminated due to an unexpected error: {e}")
