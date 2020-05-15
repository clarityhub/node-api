/**
 * Models is the utility class, check out api.models for
 * the raw API calls.
 */
describe('models', () => {
    const clarityhub = require('../../../src')({
        accessKeyId: process.env.ACCESS_KEY_ID,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
    });

    it('has a create method', () => {
        expect(typeof clarityhub.models.create).toBe('function');
    });

    it('has a get method', () => {
        expect(typeof clarityhub.models.get).toBe('function');
    });

    it('can create and CRUD a model', async () => {
        const myModel = await clarityhub.models.create({
            name: 'npm package test model',
            description: 'test description',
        });

        expect(myModel.data.name).toBe('npm package test model');

        await myModel.update({
            name: 'npm package test model new name'
        });

        expect(myModel.data.name).toBe('npm package test model new name');

        // Training
        
        await myModel.train([
            {
                utterance: 'hello world',
                label: 'greeting',
            },
            {
                utterance: 'good morning',
                label: 'greeting',
            },
            {
                utterance: 'how do I login',
                label: 'auth',
            },
            {
                utterance: 'how do I reset my password',
                label: 'auth',
            }
        ]);

        // Predict Similar
        const predictions = await myModel.predictSimilar('hi there');

        expect(Array.isArray(predictions)).toBeTruthy();
        expect(typeof predictions[0].utterance).toBe('string');
        expect(Array.isArray(predictions[0].similar)).toBeTruthy();
        expect(typeof predictions[0].similar[0].utterance).toBe('string');

        // Predict Label
        const labelPredictions = await myModel.predictSimilar('hi there');

        expect(Array.isArray(labelPredictions)).toBeTruthy();
        expect(typeof labelPredictions[0].utterance).toBe('string');
        expect(Array.isArray(labelPredictions[0].similar)).toBeTruthy();
        expect(typeof labelPredictions[0].similar[0].label).toBe('string');
        expect(labelPredictions[0].similar[0].label).toBe('greeting');

        // Update Label
        const labels = await myModel.getLabels();
        
        expect(Array.isArray(labels)).toBeTruthy();

        const firstLabel = labels[0];

        expect(typeof firstLabel.update).toBe('function');

        await firstLabel.update('user label');

        expect(firstLabel.data.userLabel).toBe('user label');

        // Delete Model
        const result = await myModel.delete(); 

        expect(result).toBeTruthy();
    }, 30000 /* long timeout, this test could take a while */);
});
