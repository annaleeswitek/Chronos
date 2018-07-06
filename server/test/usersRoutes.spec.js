'use strict';


const expect = require('chai').expect
const request = require('supertest')

const app = require('../index')
const agent = request.agent(app)

const { db, User, Order, LineItem, Product } = require('../db')

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

  describe('GET /api/users/:userId', () => {
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
        expect(res.body.email).to.equal('river.song@gmail.com')
      })
    })
  })

  describe('GET /api/users/:userId/order-history', () => {
    let user, order, product, lineItem
    beforeEach(async () => {
      user = await User.create({
        email: 'river.song@gmail.com',
        password: 'yanni'
      })
      order = await Order.create({
        userId: user.id,
        status: 'cart'
      })
      product = await Product.create({
        title: 'Last Christmas',
        price: 12.25,
        description: 'I gave you my heart',
        quantity: 75
      })
      lineItem = await LineItem.create({
        quantity: 1,
        price: product.price,
        productId: product.id,
        orderId: order.id
      })
    })
    it('responds with an array via JSON AND responds with all the orders associated with the user', () => {
      return agent
      .get(`/api/users/${user.id}/order-history`)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an.instanceOf(Array)
        expect(res.body.length).to.equal(1)
        expect(res.body[0].userId).to.equal(user.id)
      })
    })

  })

})

