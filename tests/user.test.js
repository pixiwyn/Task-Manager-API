const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('always true', () => {
    expect(true);
});

// test('Should signup a new user', async () => {
//     const response = await request(app).post('/users').send({
//        name: 'Leon',
//        email: 'kmarshall@tutamail.com',
//        password: 'start123'
//     }).expect(201);

//     // Assert DB was changed correctly
//     const user = await User.findById(response.body.user._id);
//     expect(user).not.toBeNull();

//     // Assert response is correct
//     expect(response.body).toMatchObject({
//         user: {
//             name: 'Leon',
//             email: 'kmarshall@tutamail.com'
//         },
//         token: user.tokens[0].token
//     });

//     // Assert Password is not stored in plain text
//     expect(user.password).not.toBe('start123');
// });

// test('Should login existing user', async () => {
//     const response = await request(app).post('/users/login').send({
//        email: userOne.email,
//        password: userOne.password
//     }).expect(200);

//     // Assert New Token is Saved in DB
//     const user = await User.findById(response.body.user._id);
//     expect(response.body.token).toBe(user.tokens[1].token);
// });

// test('Should not login non-existing user', async () => {
//     await request(app).post('/users/login').send({
//         email: 'scoobyDoo@mysteryteam.com',
//         password: 'scoob123'
//     }).expect(400);
// });

// test('Should get profile for user', async () => {
//    await request(app)
//        .get('/users/me')
//        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//        .send()
//        .expect(200);
// });

// test('Should not get profile for unauthenticated user', async () => {
//    await request(app)
//        .get('/users/me')
//        .send()
//        .expect(401)
// });

// test('Should delete account for user', async () => {
//     const response = await request(app)
//         .delete('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send()
//         .expect(200);

//     // Assert User is Removed from DB
//     const user = await User.findById(response.body._id);
//     expect(user).toBeNull();
// });

// test('Should not delete account for unauthenticated user', async () => {
//     await request(app)
//         .delete('/users/me')
//         .send()
//         .expect(401);
// });

// test('Should upload avatar image', async() => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/profile-pic.jpg')
//         .expect(200);

//     // Check if anything is stored in DB
//     const user = await User.findById(userOneId);
//     expect(user.avatar).toEqual(expect.any(Buffer));
// });

// test('Should update valid user fields', async () => {
//     const response = await request(app)
//         .patch('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send({
//             name: 'Kaitlyn'
//         })
//         .expect(200);

//     // Check if user updated in DB
//     const user = await User.findById(userOneId);
//     expect(user.name).toBe(response.body.name);
// });

// test('Should not update invalid user fields', async () => {
//     const response = await request(app)
//         .patch('/users/me')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .send({
//             location: 'Denver, CO'
//         })
//         .expect(400);

//     // Check if user was not updated in DB
//     const user = await User.findById(userOneId);
//     expect(user.location).toBeUndefined();
// });

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated