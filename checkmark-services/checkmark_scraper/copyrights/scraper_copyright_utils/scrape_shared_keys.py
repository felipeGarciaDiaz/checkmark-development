class FindSharedKeys:
    def __init__(self, data):
        self.data = data

    def find_shared_keys(self):
        loads = []
        try:
            for each in self.data['data']:
                test = each['hit'].copy()
                array = []
                for each_key in test:
                    temp = each_key
                    if isinstance(test[each_key], dict):
                        for each_key2 in test[each_key]:
                            array.append(temp + '_' + each_key2)
                    elif isinstance(test[each_key], list):
                        for each_element in test[each_key]:
                            if isinstance(each_element, dict):
                                for each_key2 in each_element:
                                    array.append(temp + '_' + each_key2)
                            else:
                                array.append(temp)
                    else:
                        array.append(each_key)
                if not loads:
                    loads = array
                else:
                    loads = [x for x in loads if x in array]
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
#   'date_record_entered_on_file'],
#  16)