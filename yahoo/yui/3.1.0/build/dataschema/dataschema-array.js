/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.1.0
build: 2026
*/
YUI.add('dataschema-array', function(Y) {

/**
 * Provides a DataSchema implementation which can be used to work with data stored in arrays.
 *
 * @module dataschema
 * @submodule dataschema-array
 */

/**
 * Array subclass for the DataSchema Utility.
 * @class DataSchema.Array
 * @extends DataSchema.Base
 * @static
 */
var LANG = Y.Lang,

    SchemaArray = {

        /////////////////////////////////////////////////////////////////////////////
        //
        // DataSchema.Array static methods
        //
        /////////////////////////////////////////////////////////////////////////////
        /**
         * Applies a given schema to given Array data.
         *
         * @method apply
         * @param schema {Object} Schema to apply.
         * @param data {Object} Array data.
         * @return {Object} Schema-parsed data.
         * @static
         */
        apply: function(schema, data) {
            var data_in = data,
                data_out = {results:[],meta:{}};

            if(LANG.isArray(data_in)) {
                if(LANG.isArray(schema.resultFields)) {
                    // Parse results data
                    data_out = SchemaArray._parseResults(schema.resultFields, data_in, data_out);
                }
                else {
                    data_out.results = data_in;
                }
            }
            else {
                data_out.error = new Error("Array schema parse failure");
            }

            return data_out;
        },

        /**
         * Schema-parsed list of results from full data
         *
         * @method _parseResults
         * @param fields {Array} Schema to parse against.
         * @param array_in {Array} Array to parse.
         * @param data_out {Object} In-progress parsed data to update.
         * @return {Object} Parsed data object.
         * @static
         * @protected
         */
        _parseResults: function(fields, array_in, data_out) {
            var results = [],
                result, item, type, field, key, value, i, j;

            for(i=array_in.length-1; i>-1; i--) {
                result = {};
                item = array_in[i];
                type = (LANG.isObject(item) && !LANG.isFunction(item)) ? 2 : (LANG.isArray(item)) ? 1 : (LANG.isString(item)) ? 0 : -1;
                if(type > 0) {
                    for(j=fields.length-1; j>-1; j--) {
                        field = fields[j];
                        key = (!LANG.isUndefined(field.key)) ? field.key : field;
                        value = (!LANG.isUndefined(item[key])) ? item[key] : item[j];
                        result[key] = Y.DataSchema.Base.parse(value, field);
                    }
                }
                else if(type === 0) {
                    result = item;
                }
                else {
                    //TODO: null or {}?
                    result = null;
                }
                results[i] = result;
            }
            data_out.results = results;

            return data_out;
        }
    };

Y.DataSchema.Array = Y.mix(SchemaArray, Y.DataSchema.Base);



}, '3.1.0' ,{requires:['dataschema-base']});
