describe('api.nlp', () => {
    const clarityhub = require('../../../src')({
        accessKeyId: process.env.ACCESS_KEY_ID,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
    });

    describe('sentiment', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.nlp.sentiment).toBe('function');
        });

        it('returns data for an utterance', async () => {
            const response = await clarityhub.api.nlp.sentiment('today is a good day');
            const result = response.data;
    
            expect(result.items).toHaveLength(1);
            expect(result.items[0].utterance).toBe('today is a good day');
            expect(typeof result.items[0].vote).toBe('string');
            expect(typeof result.items[0].comparative).toBe('number');
        });

        it('returns data for an array of utterances', async () => {
            const response = await clarityhub.api.nlp.sentiment([
                'today is a good day',
                'tomorrow will be even better'
            ]);
            const result = response.data;
    
            expect(result.items).toHaveLength(2);
            expect(result.items[0].utterance).toBe('today is a good day');
            expect(result.items[1].utterance).toBe('tomorrow will be even better');
        });
    });

    describe('toxicity', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.nlp.toxicity).toBe('function');
        });

        it('returns data for an utterance', async () => {
            const response = await clarityhub.api.nlp.toxicity('today is a good day');
            const result = response.data;
    
            expect(result.items).toHaveLength(1);
            expect(result.items[0].utterance).toBe('today is a good day');
            expect(typeof result.items[0].labels).toBe('object');
        });

        it('returns data for an array of utterances', async () => {
            const response = await clarityhub.api.nlp.toxicity([
                'today is a good day',
                'tomorrow will be even better'
            ]);
            const result = response.data;
    
            expect(result.items).toHaveLength(2);
            expect(result.items[0].utterance).toBe('today is a good day');
            expect(result.items[1].utterance).toBe('tomorrow will be even better');
        });
    });

    describe('topics', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.nlp.topics).toBe('function');
        });

        it('returns data for an utterance', async () => {
            const response = await clarityhub.api.nlp.topics('today is a good day');
            const result = response.data;
    
            expect(result.items).toHaveLength(1);
            expect(result.items[0].utterance).toBe('today is a good day');
            expect(Array.isArray(result.items[0].topics)).toBeTruthy();
        });

        it('returns data for an array of utterances', async () => {
            const response = await clarityhub.api.nlp.toxicity([
                'today is a good day',
                'tomorrow will be even better'
            ]);
            const result = response.data;
    
            expect(result.items).toHaveLength(2);
            expect(result.items[0].utterance).toBe('today is a good day');
            expect(result.items[1].utterance).toBe('tomorrow will be even better');
        });
    });

    describe('embed', () => {
        it('is a function', () => {
            expect(typeof clarityhub.api.nlp.embed).toBe('function');
        });

        it('returns data for an utterance', async () => {
            const response = await clarityhub.api.nlp.embed('today is a good day');
            const result = response.data;
    
            expect(result.items).toHaveLength(1);
            expect(result.items[0].utterance).toBe('today is a good day');
            expect(Array.isArray(result.items[0].embedding)).toBeTruthy();
        });

        it('returns data for an array of utterances', async () => {
            const response = await clarityhub.api.nlp.toxicity([
                'today is a good day',
                'tomorrow will be even better'
            ]);
            const result = response.data;
    
            expect(result.items).toHaveLength(2);
            expect(result.items[0].utterance).toBe('today is a good day');
            expect(result.items[1].utterance).toBe('tomorrow will be even better');
        });
    });
});