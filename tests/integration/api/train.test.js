describe('api.model.train', () => {
    const clarityhub = require('../../../src')({
        accessKeyId: process.env.ACCESS_KEY_ID,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
    });

    it('is a function', () => {
        expect(typeof clarityhub.api.models.train).toBe('function');
    });

    it('throws an error if no model id supplied', async () => {
        expect(await clarityhub.api.models.train).toThrowError();
    });

    it('throws an error if no model payload supplied', async () => {
        expect(await clarityhub.api.models.train.bind(this, 'modelId')).toThrowError();
    });
});