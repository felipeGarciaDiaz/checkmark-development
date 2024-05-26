class ExtractUniqueKeys:
    def __init__(self, data):
        self.data = data

    def extract_unique_keys(self):
        loads = []
        
        try: # Added error handling
            
            for each in self.data['data'][:10]:
                
                if 'hit' not in each: # Added safety checks incase hit is not found for a searched query record here also.
                    continue
                
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
                loads.append([x for x in array if all(x not in y for y in loads)])
                return loads


        except Exception as error:
            print(error);
            return[];
    
    
    
    
#     [['type_of_record',
#   'system_of_origin',
#   'record_schema_type',
#   'meta_data_source_date',
#   'meta_data_source_file',
#   'title_concatenated',
#   'title_concatenated_sort',
#   'representative_date',
#   'display_names_persons',
#   'display_names_organizations',
#   'primary_titles_list_title_primary_title_title_proper',
#   'primary_titles_list_title_primary_title_statement_of_responsibility',
#   'primary_titles_list_title_primary_title_medium',
#   'copyright_number_for_display_list_copyright_number_type',
#   'copyright_number_for_display_list_copyright_number',
#   'copyright_number_for_display_list_copyright_date',
#   'control_number',
#   'copyright_number_for_display',
#   'name_undifferentiated_role',
#   'number_of_pages',
#   'parent_document_control_number',
#   'parent_document_title',
#   'recordation_date',
#   'recordation_number',
#   'recordation_number_range',
# ...
#  [],
#  [],
#  [],
#  ['author_statement_list_author_work_for_hire_statement'],
#  []]
