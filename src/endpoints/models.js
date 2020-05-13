
module.exports = (buildRequest) => {
    return {
        getAll: () => {},
        create: (payload) => {},
        get: (id) => {},
        update: (id, payload) => {},
        delete: (id) => {},

        labels: {
            getAll: () => {},
            get: (id) => {},
            update: (id, payload) => {},
        },

        train: {},
        predict: {},
    },
};