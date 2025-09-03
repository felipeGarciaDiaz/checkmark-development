class SearchHiddenCommonKeys:
    def __init__(self, data):
        self.data = data

    def search_hidden_common_keys(self):
        loads = []
        try:
            for i, each in enumerate(self.data['data']):
                test = each['hit'].copy()
                array = []
                type_of_record = test.get('type_of_record', '')
                for each_key in test:
                    temp = each_key
                    if isinstance(test[each_key], dict):
                        for each_key2 in test[each_key]:
                            new_key = temp + '_' + each_key2
                            array.append(new_key)
                            array.append(new_key.replace(type_of_record, 'X'))
                    elif isinstance(test[each_key], list):
                        for each_element in test[each_key]:
                            if isinstance(each_element, dict):
                                for each_key2 in each_element:
                                    new_key = temp + '_' + each_key2
                                    array.append(new_key)
                                    array.append(new_key.replace(type_of_record, 'X'))
                            else:
                                array.append(temp)
                                array.append(temp.replace(type_of_record, 'X'))
                    else:
                        array.append(temp)
                        array.append(temp.replace(type_of_record, 'X'))
                if not loads:
                    loads = array
                else:
                    loads = [x for x in array if x in loads]
            return loads, len(loads)
        except Exception as error:
            print(error)
            return [], 0
    
    
#     (['type_of_record',
#   'system_of_origin',
#   'record_schema_type',
#   'meta_data_source_date',
#   'meta_data_source_file',
#   'title_concatenated',
#   'title_concatenated_sort',
#   'representative_date',
#   'primary_titles_list_title_primary_title_title_proper',
#   'copyright_number_for_display_list_copyright_number_type',
#   'copyright_number_for_display_list_copyright_number',
#   'copyright_number_for_display_list_copyright_date',
#   'control_number',
#   'copyright_number_for_display',
#   'system_control_number',
#   'date_record_entered_on_file',
#   'X_date',
#   'X_number'],
