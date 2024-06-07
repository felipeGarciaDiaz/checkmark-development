import requests
import json
import math
import time
import numpy as np # type: ignore
import datetime
from datetime import timedelta

def form_response(start_date, end_date): # This function is to declutter function_np()
    return requests.get('https://api.publicrecords.copyright.gov/search_service_external/simple_search_dsl?page_number=1&query=' + ','.join([chr(hex_value) for hex_value in range(0x61, 0x7b)]) + f'&field_type=keyword&records_per_page=500&sort_field=representative_date&sort_order=desc&highlight=true&model=&date_field=representative_date&start_date={start_date}%2000:00:00&end_date={end_date}%2000:00:00')
def function_np(start_date, end_date):
    last_date = end_date
    output = np.array([])
    control_numbers = set()
    copyright_numbers = set()
    
    while True:
        print(start_date, last_date)
        response = form_response(start_date, last_date)
        if response.status_code != 200:
            return print(f'Code: {response.status_code}')
        json_object = json.loads(response.text)

        hit_count = json_object['metadata']['hit_count']
        search_count = sum(json_object['metadata']['histogram']['filtered']['type_of_record'].values())
        print(f'Hit: {hit_count}, Search: {search_count}')

        if hit_count > 500: # <=500 case
            for page in range(1, math.ceil(hit_count / 500) + 1):
                print(page, end=',')
                response = requests.get(f'https://api.publicrecords.copyright.gov/search_service_external/simple_search_dsl?page_number={page}&query=' + ','.join([chr(hex_value) for hex_value in range(0x61, 0x7b)]) + f'&field_type=keyword&records_per_page=500&sort_field=representative_date&sort_order=desc&highlight=true&model=&date_field=representative_date&start_date={start_date}%2000:00:00&end_date={last_date}%2000:00:00')
                try:
                    json_object = json.loads(response.text)
                except Exception as error:
                    print(f'Status Code: {response.status_code}')
                    print(f'Error: {error}')
                json_object_omit_output = [each_result['hit'] for each_result in json_object['data'] if each_result['hit']['copyright_number_for_display_list'][0]['copyright_number'] not in copyright_numbers or each_result['hit']['control_number'] not in control_numbers]
                #output = np.append(output, json_object_omit_output) # Omits redundancies
                
                for each_hit in json_object_omit_output: # each_hit is every unique hit decreasing chronologically from the end_date
                    output = np.append(output, each_hit)
                
                [copyright_numbers.add(each_result['hit']['copyright_number_for_display_list'][0]['copyright_number']) for each_result in json_object['data']] # Yes, these are necessary
                [control_numbers.add(each_result['hit']['control_number']) for each_result in json_object['data']] # No, I don't know why
        last_date = [x['representative_date'] for x in json_object_omit_output][-1]
        
        if search_count < 50000:
            break
        
    
    print('')
    return output
st = time.time()
test = function_np('2022-03-01', '2022-05-20')
print(f"Scraped {len(test)} hits in {round(time.time() - st,2)}s")
len(test) # 54274