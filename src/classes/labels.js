class Label {
    constructor(modelId, labelId, data, api) {
        this._api = api;
        this.modelId = modelId,
        this.labelId = labelId,
        this.data = data;
    }

    async update(userLabel) {
        const response = await this._api.models.labels.update(this.modelId, this.labelId, {
            userLabel,
        });

        this.data = response.data.item;

        return this;
    }
}

module.exports = (api) => {
    return {
        getAll(modelId) {
            if (!modelId) {
                throw new Error('Clarity Hub: "modelId" is a required');
            }
            const response = await api.models.labels.getAll(modelId)
            
            const labels = response.data.items.map((item) => {
                return new Label(modelId, item.labelId, item, api);
            });

            return labels;
        },
        get(modelId, labelId) {
            if (!modelId) {
                throw new Error('Clarity Hub: "modelId" is a required');
            }

            if (!labelId) {
                throw new Error('Clarity Hub: "modelId" is a required');
            }

            const response = await api.models.labels.getAll(modelId)
            const item = response.data.item;

            return new Label(modelId, item.labelId, item, api);
        }
    };
};
module.exports.Label = Label;