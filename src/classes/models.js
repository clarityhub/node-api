const { Label } = require('./labels');

class Model {
    constructor(modelId, data, api) {
        this._api = api;
        this.modelId = modelId;
        this.data = data;
    }

    async update(payload) {
        const response = await this._api.models.update(this.modelId, payload);

        this.data = response.data.item;

        return this;
    }

    async delete() {
        const response = await this._api.models.delete(this.modelId);

        return response.status >= 200 && response.status < 300;
    }

    train(utterances) {
        return this._api.models.train(this.modelId, utterances);
    }

    async getLabels() {
        const response = await this._api.models.labels.getAll(this.modelId)
        
        const labels = response.data.items.map((item) => {
            return new Label(this.modelId, item.labelId, item, this._api);
        });

        return labels;
    }

    predictLabel(utterances) {
        return this._api.models.predict.labels(this.modelId, utterances);
    }

    async predictSimilar(utterances) {
        const response = await this._api.models.predict.similar(this.modelId, utterances);

        return response.data.items;
    }
}

module.exports = (api) => {
    return {
        get: async (id) => {
            const response = await api.models.get(id);
            const result = response.data;

            return new Model(id, result.item, api);
        },
        create: async (payload) => {
            const response = await api.models.create(payload);
            const result = response.data.item;

            return new Model(result.modelId, result, api);
        },
    };
};
module.exports.Model = Model;