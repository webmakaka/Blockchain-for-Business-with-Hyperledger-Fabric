/**
 * Created by Anand.PratapSingh on 28-03-2018.
 */
const url = '//localhost:8000';

const apiMetadata = {
    prefix: '',
    version: ''
};
export const constants = {

};
export const rateApis = {
    changeRate: url + apiMetadata.prefix + '/property',
    getRates: url + apiMetadata.prefix + '/property'

};
