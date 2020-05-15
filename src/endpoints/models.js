const { toArray } = require('../utilities');

module.exports = (buildRequest) => {
    return {
        getAll: () => {
            return buildRequest({
                url: '/infer/models',
                method: 'get',
            });
        },
        create: (payload) => {
            if (!payload) {
                throw new Error('Clarity Hub: payload is a required');
            }
            if (!payload.name) {
                throw new Error('Clarity Hub: "name" is a required value in the payload');
            }

            return buildRequest({
                url: '/infer/models/',
                method: 'post',
                data: payload,
            });
        },

        get: (id) => {
            if (!id) {
                throw new Error('Clarity Hub: "id" is a required');
            }

            return buildRequest({
                url: `/infer/models/${id}`,
                method: 'get',
            });
        },
        update: (id, payload) => {
            if (!id) {
                throw new Error('Clarity Hub: "id" is a required');
            }
            if (!payload) {
                throw new Error('Clarity Hub: payload is a required');
            }

            return buildRequest({
                url: `/infer/models/${id}`,
                method: 'put',
                data: payload,
            });
        },
        delete: (id) => {
            if (!id) {
                throw new Error('Clarity Hub: "id" is a required');
            }

            return buildRequest({
                url: `/infer/models/${id}`,
                method: 'delete',
            });
        },

        labels: {
            getAll: (modelId) => {
                if (!modelId) {
                    throw new Error('Clarity Hub: "modelId" is a required');
                }
                
                return buildRequest({
                    url: `/infer/models/${modelId}/labels`,
                    method: 'get',
                });
            },
            get: (modelId, labelId) => {
                if (!modelId) {
                    throw new Error('Clarity Hub: "modelId" is a required');
                }
                if (!labelId) {
                    throw new Error('Clarity Hub: "labelId" is a required');
                }
                
                return buildRequest({
                    url: `/infer/models/${modelId}/labels/${labelId}`,
                    method: 'get',
                });
            },
            update: (modelId, labelId, payload) => {
                if (!modelId) {
                    throw new Error('Clarity Hub: "modelId" is a required');
                }
                if (!labelId) {
                    throw new Error('Clarity Hub: "labelId" is a required');
                }
                if (!payload) {
                    throw new Error('Clarity Hub: "payload" is a required');
                }
                
                return buildRequest({
                    url: `/infer/models/${modelId}/labels/${labelId}`,
                    method: 'put',
                    data: payload
                });
            },
        },

        train: (modelId, utterances) => {
            if (!modelId) {
                throw new Error('Clarity Hub: "modelId" is a required');
            }
            if (!utterances) {
                throw new Error('Clarity Hub: "utterances" is a required');
            }

            const u = toArray(utterances);

            return buildRequest({
                url:  `/infer/models/${modelId}/train`,
                method: 'post',
                data: { utterances: u },
            });
        },

        predict: {
            labels: (modelId, utterances) => {
                if (!modelId) {
                    throw new Error('Clarity Hub: "modelId" is a required');
                }
                if (!utterances) {
                    throw new Error('Clarity Hub: "utterances" is a required');
                }

                const u = toArray(utterances);

                return buildRequest({
                    url:  `/infer/models/${modelId}/predict/labels`,
                    method: 'post',
                    data: { utterances: u },
                });
            },

            similar: (modelId, utterances) => {
                if (!modelId) {
                    throw new Error('Clarity Hub: "modelId" is a required');
                }
                if (!utterances) {
                    throw new Error('Clarity Hub: "utterances" is a required');
                }

                const u = toArray(utterances);

                return buildRequest({
                    url:  `/infer/models/${modelId}/predict/similar`,
                    method: 'post',
                    data: { utterances: u },
                });
            },
        },
    };
};