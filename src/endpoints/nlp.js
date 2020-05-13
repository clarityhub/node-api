const { toArray } = require('../utilities');

module.exports = (buildRequest) => {
    return {
        sentiment: (utterances) => {
            const u = toArray(utterances);

            return buildRequest({
                url: '/nlp/sentiment',
                method: 'post',
                data: { utterances: u },
            });
        },
        toxicity: (utterances) => {
            const u = toArray(utterances);

            return buildRequest({
                url: '/nlp/toxicity',
                method: 'post',
                data: { utterances: u },
            });
        },
        topics: (utterances) => {
            const u = toArray(utterances);

            return buildRequest({
                url: '/nlp/topics',
                method: 'post',
                data: { utterances: u },
            });
        },
        embed: (utterances) => {
            const u = toArray(utterances);

            return buildRequest({
                url: '/nlp/embed',
                method: 'post',
                data: { utterances: u },
            });
        },
    };
};