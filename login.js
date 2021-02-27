import express from 'express'
import mongoose from 'mongoose'

const expressRouter = express.Router()
const AccountModel = mongoose.model('Account')

const login = () => {
  const signUpRouter = new SignUpRouter()
  expressRouter.post('/signup', RouterAdapter.toExpressRequestHandler(signUpRouter))
}

class RouterAdapter {
  static toExpressRequestHandler (router) {
    return async function (request, response) {
      const httpRequest = {
        body: request.body
      }
      const httpResponse = router.route(httpRequest)
      return response.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SingUpUsecase().signup(email, password, repeatPassword)
    return {
      statusCode: 200,
      body: user
    }
  }
}

class SingUpUsecase {
  async signup (email, password, repeatPassword) {
    if (password === repeatPassword) {
      return new AccountCreateRepository().create({ email, password })
    }
  }
}

class AccountCreateRepository {
  async create ({ email, password }) {
    return AccountModel.create({ email, password })
  }
}

export default login
