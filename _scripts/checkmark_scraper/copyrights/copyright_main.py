import requests
import json
from .scraper_copyright_utils.scrape_unique_keys import ExtractUniqueKeys
from .scraper_copyright_utils.scrape_shared_keys import FindSharedKeys
from .scraper_copyright_utils.scrape_hidden_keys import SearchHiddenCommonKeys



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


def copyrights_scraper_main():
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
    copyrights_scraper_main()
    
# Recommend Tips:
# 1. Look into using sets() instread of arrays. i.e. loads = [] should change to loads = set()
# 1.a Apparently it is more efficient, but look into it since you know more about python, if you
# do use set() make sure to update any code that was part of arrays, to ensure that it now works with set()

# 2. If you find yourself writig code thats similar to other code you wrote in this program, make that code
# into its own function so you can quickly re-use it, this also makes the code more scaleable for the future.

# 3. Finally just make sure to wrap important code that could fail in try except blocks, to keep the python
# program from crashing or erroring out, especially when this moves into the production level environment now.