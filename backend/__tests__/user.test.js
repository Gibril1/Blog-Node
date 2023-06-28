const express = require('express')
const request = require('supertest')
const mongoose = require('mongoose')
require("dotenv").config();
const userRoute = require('../routes/userRoutes')

const app = express()

app.use(express.json())
app.use('/api/v1/users', userRoute)

const clearDatabase = async () => {
    await mongoose.connection.dropDatabase()
}


beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
}, 10000);


afterAll(async () => {
    await clearDatabase()
    await mongoose.connection.close();
}, 10000);



describe('Testing the endpoints for registration', () => {
    describe('POST /api/v1/users', () => {
        
        it('failure - Missing fields', async () => {
            try {
                const { body, statusCode } = await request(app)
                    .post('/api/v1/users/register')
                    .send({
                        name: '',
                        email: 'Testing@123',
                        password: 'test'
                    })
                    expect(statusCode).toBe(400)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Please enter all fields',
                    stack: process.env.NODE_ENV === 'production' ? null : error.stack

                })
            }
        })

        it('failure - Invalid Input Data', async () => {
            try {
                const { body, statusCode } = await request(app)
                    .post('/api/v1/users/register')
                    .send({
                        name: 'Testing 1223abena',
                        email: 'Testing123',
                        password: 'test'
                    })
                    expect(statusCode).toBe(400)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Invalid User Data',
                    stack: process.env.NODE_ENV === 'production' ? null : error.stack

                })
            }
        })


        it('success - User Registered', async () => {
            const { body, statusCode } = await request(app)
                .post('/api/v1/users/register')
                .send({
                    name: 'Testing',
                    email: 'Testing@gib.com',
                    password: 'test'
                })
            expect(statusCode).toBe(201)
            expect(body).toEqual({
                message: 'An account has been created for Testing',
                token: expect.any(String)
            })
        })

        it('failure - User Already exists', async () => {
            try {
                const { body, statusCode } = await request(app)
                    .post('/api/v1/users/register')
                    .send({
                        name: 'Testing',
                        email: 'Testing@gib.com',
                        password: 'test'
                    })
                    expect(statusCode).toBe(400)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: `User already exists`,
                    stack: process.env.NODE_ENV === 'production' ? null : error.stack    
                })
            }
        })
    })
})


describe('Testing the endpoint for user login', () => {
    describe('POST /api/v1/users/login', () => {
        test('failure - Missing fields', async () => {
            try {
                const { statusCode } = await request(app)
                    .post('/api/v1/users/login')
                    .send({
                        email: '',
                        password: 'test'     
                    })
                expect(statusCode).toBe(400)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Please enter fields'
                })
            }
        })

        test('failure - Invalid Credentials', async () => {
            try {
                const { statusCode } = await request(app)
                    .post('/api/v1/users/login')
                    .send({
                        email: 'testing',
                        password: 'test'     
                    })
                expect(statusCode).toBe(400)
            } catch (error) {
                expect(error).toEqual({
                    error: true,
                    message: 'Login Failed'
                })
            }
        })

        test('success - Login', async () => {
            const { body, statusCode } = await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: 'Testing@gib.com',
                    password: 'test'
                })
            expect(statusCode).toBe(200)
            expect(body).toEqual({
                message: 'Successful Login',
                token: expect.any(String)
            })
        })
    })
})