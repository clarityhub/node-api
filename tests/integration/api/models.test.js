// TODO afterall, clean up models

describe('api.models', () => {
    const clarityhub = require('../../../src')({
        accessKeyId: process.env.ACCESS_KEY_ID,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
    });

    describe('getAll', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.models.getAll).toBe('function');
        });

        it('returns an array when called', async () => {
            const response = await clarityhub.api.models.getAll();
            const result = response.data;


            expect(Array.isArray(result.items)).toBeTruthy();
        });
    });

    describe('create', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.models.create).toBe('function');
        });

        it('throws an exception if payload is not provided', async () => {
            expect(await clarityhub.api.models.create).toThrowError();
        });

        it('throws an exception if name is not provided', async () => {
            expect(await clarityhub.api.models.create.bind(this, {
                description: 'test model',
            })).toThrowError();
        });

        it('returns the model when created', async () => {
            const response = await clarityhub.api.models.create({
                name: 'npm package test model',
                description: 'test description',
            });
            const result = response.data;
    
            expect(result.item.modelId).toBeTruthy();
            expect(result.item.name).toBe('npm package test model');
            expect(result.item.description).toBe('test description');
        });
    });

    describe('get model', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.models.get).toBe('function');
        });

        it('throws if no id is provided', async () => {
            expect(await clarityhub.api.models.get).toThrowError();
        });
    });

    describe('update model', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.models.update).toBe('function');
        });

        it('throws if no id is provided', async () => {
            expect(await clarityhub.api.models.update).toThrowError();
        });
    });

    describe('delete model', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.models.delete).toBe('function');
        });

        it('throws if no id is provided', async () => {
            expect(await clarityhub.api.models.delete).toThrowError();
        });
    });

    /**
     * Wrapping up the lifecycle CRUD methods since we need
     * a modelId to test them
     */
    describe('crud model', () => {
        it('handles crud', async () => {
            let response = await clarityhub.api.models.create({
                name: 'npm package test model',
                description: 'test description',
            });
            let result = response.data;
        
            expect(result.item.modelId).toBeTruthy();
    
            const id = result.item.modelId;
    
            response = await clarityhub.api.models.get(id);
            result = response.data;
    
            expect(result.item.modelId).toBeTruthy();
            expect(result.item.name).toBe('npm package test model');
    
            response = await clarityhub.api.models.update(id, {
                name: 'npm package test 2',
                description: 'second description',
            });
            result = response.data;
    
            expect(result.item.modelId).toBeTruthy();
            expect(result.item.name).toBe('npm package test 2');
            expect(result.item.description).toBe('second description');
    
            response = await clarityhub.api.models.delete(id);
            result = response.data;
    
            expect(result.item.modelId).toBeTruthy();
            expect(result.item.name).toBe('npm package test 2');
            expect(result.item.description).toBe('second description');
        });
    });
});