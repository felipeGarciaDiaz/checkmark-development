"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Registration extends sequelize_1.Model {
}
Registration.init({
    type_of_record: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    system_of_origin: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    registration_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    record_schema_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    meta_data_source_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    meta_data_source_file: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    first_published_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    first_published_date_as_year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    first_published_date_as_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    title_concatenated: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    title_concatenated_sort: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    representative_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    description_based_on_list: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    organizations: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('organizations'));
        },
        set(value) {
            this.setDataValue('organizations', JSON.stringify(value));
        },
    },
    display_names: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('display_names'));
        },
        set(value) {
            this.setDataValue('display_names', JSON.stringify(value));
        },
    },
    other_titles: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('other_titles'));
        },
        set(value) {
            this.setDataValue('other_titles', JSON.stringify(value));
        },
    },
    issues_registered_list: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('issues_registered_list'));
        },
        set(value) {
            this.setDataValue('issues_registered_list', JSON.stringify(value));
        },
    },
    claimants_list: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('claimants_list'));
        },
        set(value) {
            this.setDataValue('claimants_list', JSON.stringify(value));
        },
    },
    author_statement_list: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('author_statement_list'));
        },
        set(value) {
            this.setDataValue('author_statement_list', JSON.stringify(value));
        },
    },
    primary_titles_list: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('primary_titles_list'));
        },
        set(value) {
            this.setDataValue('primary_titles_list', JSON.stringify(value));
        },
    },
    copyright_number_for_display_list: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('copyright_number_for_display_list'));
        },
        set(value) {
            this.setDataValue('copyright_number_for_display_list', JSON.stringify(value));
        },
    },
    registration_number_list: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        get() {
            return JSON.parse(this.getDataValue('registration_number_list'));
        },
        set(value) {
            this.setDataValue('registration_number_list', JSON.stringify(value));
        },
    },
    type_of_work_to_english: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    control_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    copyright_number_for_display: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    frequency_of_publication: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    latest_transaction_date_and_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    originating_control_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    physical_description_extent: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    publication_year: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    registration_class: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    system_control_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    registration_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date_record_entered_on_file: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type_of_work: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'registrations',
    timestamps: false,
});
exports.default = Registration;
