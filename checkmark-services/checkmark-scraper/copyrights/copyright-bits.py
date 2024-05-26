import requests
import json
from scraper_copyright_utils.scrape_unique_keys import ExtractUniqueKeys
from scraper_copyright_utils.scrape_shared_keys import FindSharedKeys
from scraper_copyright_utils.scrape_hidden_keys import SearchHiddenCommonKeys

def setup_url():
    start_date = '2024-01-30'
    end_date = '2024-05-24'
    base_url = 'https://api.publicrecords.copyright.gov/search_service_external/simple_search_dsl'
    query = ','.join([chr(hex_value) for hex_value in range(0x61, 0x7b)])  # a-z
    url = f"{base_url}?page_number=1&query={query}&field_type=keyword&records_per_page=500&sort_order=asc&highlight=true&model="
    url += f'&date_field=representative_date&start_date={start_date}%2000:00:00&end_date={end_date}%2000:00:00'
    return url

def fetch_data(url):
    response = requests.get(url)
    print(f'Code: {response.status_code}')
    return json.loads(response.text)

def main():
    url = setup_url()
    data = fetch_data(url)
    unique_keys_class = ExtractUniqueKeys(data)
    shared_keys_class = FindSharedKeys(data)
    hidden_keys_class = SearchHiddenCommonKeys(data)

    print("Unique keys:", unique_keys_class.extract_unique_keys())
    shared_keys, count_shared = shared_keys_class.find_shared_keys()
    print("Shared keys:", shared_keys)
    print("Number of shared keys:", count_shared)
    hidden_keys, count_hidden = hidden_keys_class.search_hidden_common_keys()
    print("Hidden common keys:", hidden_keys)
    print("Number of hidden common keys:", count_hidden)

if __name__ == "__main__":
    main()
    
# Reviewer Comments:
# - Code is well structred, easy to read, and efficiently collects data from the site as needed.
# - Code works quickly, it seems fairly modular, and each portion in the jupyter notebook was well documented as well.

# Recomenndations:
# - There was no error handling so I added some basic error handling to each of the functions.
# - I went ahead and split the code into there own files, classes, and functions as this will grow a lot it will be easier to manage.
# - I recommend using python sets instead of arrays i.e. loads = [] should instead be load = set(), then update code to work with sets.
# - If parts of the code are repeated, consider creating a function to handle the repeated code.