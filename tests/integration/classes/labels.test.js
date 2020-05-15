describe('labels', () => {
    const clarityhub = require('../../../src')({
        accessKeyId: process.env.ACCESS_KEY_ID,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
    });

    it('has a getAll function', () => {
        expect(typeof clarityhub.labels.getAll).toBe('function');
    });

    it('throws an error if getAll is not called with a modelId', () => {
        expect(clarityhub.labels.getAll).toThrowError();
    });

    it('has a get function', () => {
        expect(typeof clarityhub.labels.get).toBe('function');
    });

    it('throws an error if get is not called with a modelId', () => {
        expect(clarityhub.labels.get).toThrowError();
    });

    it('throws an error if get is not called with a labelId', () => {
        expect(clarityhub.labels.get.bind(this, 'modelId')).toThrowError();
    });
});