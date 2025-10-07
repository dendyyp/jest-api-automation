var supertest = require('supertest')
const request = supertest('https://reqres.in')

let headers = {};

beforeAll(() => {
    headers = {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json'
    };
});

describe('Get Users', () => {
    it('should return users data', async () => {
        const response = await request
            .get('/api/users?page')
            .set('Content-Type', 'application/json')
            .expect(200)

        console.log(response.body);
        expect(Array.isArray(response.body.data)).toBe(true);
    });
});

describe('Post New Users', () => {
    it('should success register new users', async () => {
        const body = {
            "name": 'Dendy',
            "job": 'QA Engineer'
        };

        const response = await request
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .set(headers)
            .send(body)
            .expect(201);

        console.log(response.body);
        expect(response.body).toHaveProperty('name', 'Dendy');
        expect(response.body).toHaveProperty('job', 'QA Engineer');
    })
})