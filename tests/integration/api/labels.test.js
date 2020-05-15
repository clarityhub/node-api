describe('api.model.labels', () => {
    const clarityhub = require('../../../src')({
        accessKeyId: process.env.ACCESS_KEY_ID,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
    });

    describe('getAll', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.models.labels.getAll).toBe('function');
        });

        it('throws an error if no model id supplied', async () => {
            expect(await clarityhub.api.models.labels.getAll).toThrowError();
        });
    });

    describe('get', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.models.labels.get).toBe('function');
        });

        it('throws an error if no model id supplied', async () => {
            expect(await clarityhub.api.models.labels.get).toThrowError();
        });

        it('throws an error if no label id supplied', async () => {
            expect(await clarityhub.api.models.labels.get.bind(this, 'modelId')).toThrowError();
        });
    });

    describe('update', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.models.labels.update).toBe('function');
        });

        it('throws an error if no id supplied', async () => {
            expect(await clarityhub.api.models.labels.update).toThrowError();
        });

        it('throws an error if no payload supplied', async () => {
            expect(await clarityhub.api.models.labels.update.bind(this, 'id')).toThrowError();
        });
    });

    /**
     * Wrapping up the lifecycle CRU methods since we need
     * a modelId to test them
     */
    describe('cru label', () => {
        it('handles crud', async () => {
            let response = await clarityhub.api.models.create({
                name: 'npm package test model',
                description: 'test description',
            });
            let result = response.data;
        
            expect(result.item.modelId).toBeTruthy();
    
            const id = result.item.modelId;
    
            response = await clarityhub.api.models.labels.getAll(id);
            result = response.data;
    
            expect(Array.isArray(result.items)).toBeTruthy();
    
            // TODO will need some labels to be able to do the rest of the
            // tests

            // TODO get(modelId, labelId)

            // TODO put(modelId, labelId, payload)
        });
    });
});