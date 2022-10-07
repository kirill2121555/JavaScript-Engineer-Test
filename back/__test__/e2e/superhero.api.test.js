const request = require('supertest')
const app = require('../../index')

describe('/superheros', () => {

    it(' superheros should return 200 and body', async () => {
        await request(app)
            .get('/superheros?serch=')
            .expect(200)
            .then(res => {
                expect(res.body).toBeTruthy();
            })
    })

})

describe('/crud', () => {
    let id
    it(' createSuperhero should return 201 and Object ', async () => {
        await request(app)
            .post('/superhero')
            .send({ name_picture: [], nickname: 'nickname111', real_name: 'real_name', origin_description: 'origin_description', superpowers: 'superpowers', catch_phrase: 'catch_phrase' })
            .expect(201)
            .then(res => {
                expect(res.body).toBeTruthy();
                expect(res.body.nickname).toBe('nickname111')
                id = res.body._id
            })
    })
    it(' getSuperhero should return 200 and Object ', async () => {
        await request(app)
            .get('/superhero/' + id)
            .expect(200)
            .then(res => {
                expect(res.body).toBeTruthy();
                expect(res.body.nickname).toBe('nickname111')
            })
    })
    it(' updateSuperhero should return 201 and Object ', async () => {
        await request(app)
            .put('/superhero/' + id)
            .send({ oldimages: [], new_name_picture: [], nickname: 'nickname111_updated', real_name: 'real_name_updated', origin_description: 'origin_description_updated', superpowers: 'superpowers_updated', catch_phrase: 'catch_phrase_updated' })
            .expect(201)
            .then(res => {
                expect(res.body).toBeTruthy();
            })
    })
    it(' getSuperhero should return 200 and Object ', async () => {
        await request(app)
            .get('/superhero/' + id)
            .expect(200)
            .then(res => {
                expect(res.body).toBeTruthy();
                expect(res.body.real_name).toEqual('real_name_updated')
            })

    })
    it(' deleteSuperhero should return 204 ', async () => {
        await request(app)
            .delete('/superhero/' + id)
            .expect(204)
    })
    it(' getSuperhero should return 200 and Object ', async () => {
        await request(app)
            .get('/superhero/' + id)
            .expect(400)
            .then(res => {
                expect(res.body).toBe('could not find the superhero');
            })
    })
})
