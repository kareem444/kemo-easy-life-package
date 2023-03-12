const { regex, notRegex, requiredIf } = require('simple-body-validator');

class Validate {
    //#region properties
    static required = 'required';
    static isTrue = 'accepted';
    static alpha = `alpha`;
    static alphaDash = `alpha_dash`;
    static alphaNum = `alpha_num`;
    static array = `array`;
    static boolean = `boolean`;
    static confirmed = `confirmed`;
    static date = `date`;
    static isFalse = 'declined';
    static email = "email";
    static json = "json";
    static integer = 'strict|integer';
    static nullable = 'nullable';
    static numeric = 'strict|numeric';
    static object = 'object';
    static requiredAndNullable = 'present';
    static string = 'string';
    static url = 'url';
    static validateOnlyIfExist = 'sometimes';
    //#endregion

    //#region setters
    static isTrueIf({ anotherFiled, anotherFiledValue }) {
        return `accepted_if:${anotherFiled},${anotherFiledValue}`
    };
    static dateAfter(date) {
        return `after:${date}`
    };
    static dateAfterOrEqual(date) {
        return `after_or_equal:${date}`
    };
    static dateBefore(date) {
        return `before:${date}`
    };
    static dateBeforeOrEqual(date) {
        return `before_or_equal:${date}`
    };
    static between({ min, max }) {
        return `between:${min},${max}`
    };
    static dateEquals(date) {
        return `date_equals:${date}`
    };
    static isFalseIf({ anotherFiled, anotherFiledValue }) {
        return `declined_if:${anotherFiled},${anotherFiledValue}`
    };
    static differentThanField(field) {
        return `different:${field}`
    };
    static endsWith(values = []) {
        return `ends_with:${values.join(',')}`
    };
    static greaterThan(field) {
        return `gt:${field}`
    };
    static greaterThanOrEqual(field) {
        return `gte:${field}`
    };
    static in(values = []) {
        return `in:${values.join(',')}`
    };
    static lessThan(field) {
        return `lt:${field}`
    };
    static lessThanOrEqual(field) {
        return `lte:${field}`
    };
    static max(value) {
        return `max:${value}`
    };
    static min(value) {
        return `min:${value}`
    };
    static notIn(values = []) {
        return `not_in:${values.join(',')}`
    };
    static regex(data) {
        return regex(data)
    };
    static notRegex(data) {
        return notRegex(data)
    };
    static requiredIf(data) {
        return requiredIf(data)
    };
    static requiredWith(values = []) {
        return `required_with:${values.join(',')}`
    };
    static requiredWithAll(values = []) {
        return `required_with_all:${values.join(',')}`
    };
    static requiredWithout(values = []) {
        return `required_without:${values.join(',')}`
    };
    static requiredWithoutAll(values = []) {
        return `required_without_all:${values.join(',')}`
    };
    static same(field) {
        return `same:${field}`
    };
    static size(value) {
        return `size:${value}`
    };
    //#endregion
}

module.exports = Validate