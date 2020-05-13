describe('api.models', () => {
    const clarityhub = require('../../src')({
        accessKeyId: process.env.ACCESS_KEY_ID,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
    });


    describe('getAll', () => {
        it('is a function', () => {
            expect(typeof clarityhub.models.getAll).toBe('function');
        });
    });
});