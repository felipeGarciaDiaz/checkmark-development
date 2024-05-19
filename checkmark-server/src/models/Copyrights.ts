import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
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

class Copyright extends Model {
  public id!: number;
  public type_of_record!: string;
  public system_of_origin!: string;
  public registration_number!: string;
  public record_schema_type!: string;
  public meta_data_source_date!: Date;
  public meta_data_source_file!: string;
  public first_published_date!: Date;
  public first_published_date_as_year!: number;
  public first_published_date_as_date!: Date;
  public title_concatenated!: string;
  public title_concatenated_sort!: string;
  public representative_date!: Date;
  public description_based_on_list!: string;
  public organizations!: string;
  public display_names!: string;
  public other_titles!: string;
  public issues_registered_list!: string;
  public claimants_list!: string;
  public author_statement_list!: string;
  public primary_titles_list!: string;
  public copyright_number_for_display_list!: string;
  public registration_number_list!: string;
  public type_of_work_to_english!: string;
  public control_number!: string;
  public copyright_number_for_display!: string;
  public frequency_of_publication!: string;
  public latest_transaction_date_and_time!: Date;
  public originating_control_number!: string;
  public physical_description_extent!: string;
  public publication_year!: number;
  public registration_class!: string;
  public system_control_number!: string;
  public registration_status!: string;
  public date_record_entered_on_file!: string;
  public type_of_work!: string;
}

Copyright.init({
  type_of_record: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  system_of_origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registration_number: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  record_schema_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meta_data_source_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  meta_data_source_file: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  first_published_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  first_published_date_as_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  first_published_date_as_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title_concatenated: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title_concatenated_sort: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  representative_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description_based_on_list: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizations: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('organizations'));
    },
    set(value: any) {
      this.setDataValue('organizations', JSON.stringify(value));
    },
  },
  display_names: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('display_names'));
    },
    set(value: any) {
      this.setDataValue('display_names', JSON.stringify(value));
    },
  },
  other_titles: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('other_titles'));
    },
    set(value: any) {
      this.setDataValue('other_titles', JSON.stringify(value));
    },
  },
  issues_registered_list: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('issues_registered_list'));
    },
    set(value: any) {
      this.setDataValue('issues_registered_list', JSON.stringify(value));
    },
  },
  claimants_list: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('claimants_list'));
    },
    set(value: any) {
      this.setDataValue('claimants_list', JSON.stringify(value));
    },
  },
  author_statement_list: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('author_statement_list'));
    },
    set(value: any) {
      this.setDataValue('author_statement_list', JSON.stringify(value));
    },
  },
  primary_titles_list: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('primary_titles_list'));
    },
    set(value: any) {
      this.setDataValue('primary_titles_list', JSON.stringify(value));
    },
  },
  copyright_number_for_display_list: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('copyright_number_for_display_list'));
    },
    set(value: any) {
      this.setDataValue('copyright_number_for_display_list', JSON.stringify(value));
    },
  },
  registration_number_list: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('registration_number_list'));
    },
    set(value: any) {
      this.setDataValue('registration_number_list', JSON.stringify(value));
    },
  },
  type_of_work_to_english: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  control_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  copyright_number_for_display: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  frequency_of_publication: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latest_transaction_date_and_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  originating_control_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  physical_description_extent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publication_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  registration_class: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  system_control_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registration_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_record_entered_on_file: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type_of_work: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'registrations',
  timestamps: false,
});

export default Copyright;