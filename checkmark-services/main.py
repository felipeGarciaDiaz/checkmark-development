from checkmark_scraper.copyrights.copyright_main import copyrights_scraper_main
from checkmark_scraper.trademarks.trademarks_main import trademarks_scraper_main
# from mysql import get_db_connection
# This is your main python file, all of the main methods for getting copyright, patents, and trademarks will be in this file when added.
# Additionally this file will also call the AI and other different python related services for the checkmark app project we are making.

def main():
    copyrights_scraper_main()
    trademarks_scraper_main()
    # get_db_connection()
    
if __name__ == "__main__":
    main()
    
    