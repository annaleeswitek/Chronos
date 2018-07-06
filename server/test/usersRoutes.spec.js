'use strict';


const expect = require('chai').expect
const request = require('supertest')

const app = require('../index')
const agent = request.agent(app)

const { db, User, Order } = require('../db')

describe('Users Route:', () => {

  before(() => {
    return db.sync({ force: true })
  })

  afterEach(() => {
    return Promise.all([
      User.truncate({ cascade: true }),
      Order.truncate({ cascade: true })
    ])
  })

  describe('GET /api/users', () => {
    it('responds with an array via JSON', () => {
      return agent
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body).to.have.length(0)
      })
    })

    it('returns a user if there is one in the DB', async () => {
        await User.create({
        email: 'amy.pond@gmail.com',
        password: 'tardis',
        isAdmin: false
      })

      return agent
      .get('/api/users')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body[0].email).to.equal('amy.pond@gmail.com')
      })
    })

    it('returns all users in the DB', async () => {
      await User.create({ email: 'amy.pond@gmail.com', password: 'tardis'})
      await User.create({ email: 'the.doctor@who.com', password: 'whoooo'})

      return agent
      .get('/api/users')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body.length).to.equal(2)
        expect(res.body[1].email).to.equal('the.doctor@who.com')
      })
      
    })
  })

  describe('GET /api/users/:userId', async () => {
    let user;
    
    beforeEach(async () => {

      let creatingUsers = [{
        email: 'dalek@tardis.net', 
        password: 'mwaha'
      }, {
        email: 'river.song@gmail.com', 
        password: 'yanni'
      }]
      .map(async (data) => {
        let newUser = await User.create(data)
        return newUser
      })

      let createdUsers = await Promise.all(creatingUsers)
      user = createdUsers[1]

    })

    it('returns the user JSON based on the userId', () => {
      return agent
      .get(`/api/users/${user.id}`)
      .expect(200)
      .expect(res => {
        if (typeof res.body === 'string') {
          res.body = JSON.parse(res.body)
        }
        expect(res.body.email).to.equal('dalek@tardis.net')
      })
    })
  })
  

})

