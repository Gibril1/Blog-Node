const express = require('express')
const request = require('supertest')
const mongoose = require('mongoose')
require("dotenv").config();
const blogRoute = require('../routes/blogRoutes')
const app = express()

const { getTestUserToken, createBlog } = require('../config/utils');


app.use(express.json())
app.use('/api/v1/blogs', blogRoute)


const clearDatabase = async () => {
    await mongoose.connection.dropDatabase()
}

let testUserToken
let testUserID
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
    const { token, id } = await getTestUserToken()
    testUserToken = token
    testUserID = id
}, 1000000);

afterAll(async () => {
    await clearDatabase()
    await mongoose.connection.close();
}, 1000000);


describe('Testing the endpoints for creating blogs', () => {
    describe('POST /api/v1/blogs', () => {

        test('failure - Unauthenticated User', async () => {
            try {
                
                const { statusCode } = await request(app)
                    .post('/api/v1/blogs')
                    .send({
                        title: 'This is a test title',
                        content: 'This is a test content'
                    })
                expect(statusCode).toBe(401)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Not authorized'
                })
            }
        })

        test('failure - Missing fields', async () => {
            try {

                const { statusCode } = await request(app)
                    .post('/api/v1/blogs')
                    .set('Authorization', `Bearer ${testUserToken}`)
                    .send({
                        title: '',
                        content: 'This is a test content'
                    })
                expect(statusCode).toBe(400)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Please enter all fields'
                })
            }
        })

        test('success - Create Blog', async () => {
            try {
                const { statusCode, body } = await request(app)
                    .post('/api/v1/blogs')
                    .set('Authorization', `Bearer ${testUserToken}`)
                    .send({
                        author: testUserID,
                        title: 'This is a test title',
                        content: 'This is a test content'
                    })
                expect(statusCode).toBe(201)
                expect(body).toMatchObject({
                    author: testUserID.toString(),
                    title: 'This is a test title',
                    content: 'This is a test content'
                })
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: error.message
                })
            }
        })
    })
})


describe('Testing endpoints for getting all blogs', () => {
    describe('GET /api/v1/blogs', () => {
        test('success - Get All Blogs', async () => {
            const { body, statusCode } = await request(app)
                .get('/api/v1/blogs')
            expect(statusCode).toBe(200)
            expect(body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        content: expect.any(String),
                        _id: expect.any(String),
                    })
                ])
            )
        })
    })
})


describe('Test endpoints for updating a blog', () => {
    describe('PUT /api/v1/blogs/:id', () => {
        test('fail - Route cannot be found - no params', async() => {
            const { statusCode } = await request(app)
                .put('/api/v1/blogs')
            expect(statusCode).toBe(404)
        })

        test('fail - Unauthorised User', async () => {
            try {
                const { statusCode, body } = await request(app)
                    .put('/api/v1/blogs/46')
                expect(statusCode).toBe(401)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Not Authorized'
                })
            }
        })

        test('fail - Incorrect params ', async () => {
            try {
                const { statusCode } = await request(app)
                    .put('/api/v1/blogs/46')
                    .set('Authorization', `Bearer ${testUserToken}`)
                
                expect(statusCode).toBe(400)

            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Invalid blog ID'
                })
            }
        })

        test('success - Update Blog', async () => {
            const blog = await createBlog()
            const { statusCode, body } = await request(app)
                .put(`/api/v1/blogs/${blog._id.toString()}`)
                .set('Authorization', `Bearer ${testUserToken}`)
                .send({
                    title: 'This is an updated test title',
                    content: 'This is an updated test content'
                })
            
            expect(statusCode).toBe(200)
            expect(body).toMatchObject({
                author: testUserID.toString(),
                title: 'This is an updated test title',
                content: 'This is an updated test content',
                _id: blog._id.toString()
            })
        })
    })
})

describe('Test endpoints for deleting a blog', () => {
    describe('DELETE /api/v1/blogs/:id', () => {
        test('fail - Route cannot be found - no params', async() => {
            const { statusCode } = await request(app)
                .delete('/api/v1/blogs')
            expect(statusCode).toBe(404)
        })

        test('fail - Unauthorised User', async () => {
            try {
                const { statusCode, body } = await request(app)
                    .delete('/api/v1/blogs/46')
                expect(statusCode).toBe(401)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Not Authorized'
                })
            }
        })

        test('fail - Incorrect params ', async () => {
            try {
                const { statusCode } = await request(app)
                    .delete('/api/v1/blogs/46')
                    .set('Authorization', `Bearer ${testUserToken}`)
                
                expect(statusCode).toBe(400)

            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Invalid blog ID'
                })
            }
        })

        test('success - Delete Blog', async () => {
            const blog = await createBlog()
            const { statusCode, body } = await request(app)
                .delete(`/api/v1/blogs/${blog._id}`)
                .set('Authorization', `Bearer ${testUserToken}`)
            
            expect(statusCode).toBe(200)
            expect(body).toEqual({
                id: blog._id.toString()
            })
        })
    })
})



