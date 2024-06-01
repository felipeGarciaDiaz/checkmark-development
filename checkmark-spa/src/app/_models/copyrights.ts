export interface ICopyrightMain {
    id?: number;
    type_of_record: string;
    system_of_origin: string;
    registration_number: string;
    record_schema_type: string;
    meta_data_source_date: Date;
    meta_data_source_file: string;
    first_published_date: Date;
    first_published_date_as_year: number;
    first_published_date_as_date: Date;
    title_concatenated: string;
    title_concatenated_sort: string;
    representative_date: Date;
    description_based_on_list: string;
    organizations: string;
    display_names: string;
    other_titles: string;
    issues_registered_list: string;
    claimants_list: string;
    author_statement_list: string;
    primary_titles_list: string;
    copyright_number_for_display_list: string;
    registration_number_list: string;
    type_of_work_to_english: string;
    control_number: string;
    copyright_number_for_display: string;
    frequency_of_publication: string;
    latest_transaction_date_and_time: Date;
    originating_control_number: string;
    physical_description_extent: string;
    publication_year: number;
    registration_class: string;
    system_control_number: string;
    registration_status: string;
    date_record_entered_on_file: string;
    type_of_work: string;
  }
export interface ICopyrightResponse {
    isSuccessful: boolean;
    data: ICopyrightMain[];
    message: string;
}