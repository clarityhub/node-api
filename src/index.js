const assert = require('assert');
const axios = require('axios');

const nlp = require('./endpoints/nlp');

/**
 * @param config {accessKeyId, accessKeySecret, baseUrl}
 */
module.exports = (config) => {
    assert(config.accessKeyId);
    assert(config.accessKeySecret);

    const auth = {
        username: config.accessKeyId,
        password: config.accessKeySecret,
    };
    const headers = {
        'Content-Type': 'application/json',
    };
    const baseUrl = config.baseUrl ? config.baseUrl : 'https://api.clarityhub.io';

    const buildRequest = (options) => {
        return axios({
            url: `${baseUrl}${options.url}`,
            method: options.method,
            auth,
            headers,
            data: options.data,
        });
    };

    return {
        api: {
            nlp: nlp(buildRequest),
            models: models(buildRequest),
        },
        
    };
}