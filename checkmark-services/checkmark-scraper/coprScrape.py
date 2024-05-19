import json
import requests

query = 'Realtor'
field_type = 'keyword'# 'name', 'title'
page_number = 1
records_per_page = 10 # Up to 500

url = f'https://api.publicrecords.copyright.gov/search_service_external/simple_search_dsl?page_number={page_number}&query={query}&field_type={field_type}&records_per_page={records_per_page}&sort_order=asc&highlight=true'

if False:
    date_field = 'representative_date'
    start_date, start_time = '2020-05-13', '00:00:00'
    end_date, end_time = '2024-05-14', '00:00:00'
    url = url + f'date_field={date_field}&start_date={start_date}%20{start_time}&end_date={end_date}%20{end_time}'

response = requests.get(url)
print('Status Code:', response.status_code)
response_json = json.loads(response.text)
