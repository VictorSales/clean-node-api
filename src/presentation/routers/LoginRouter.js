const HttpResponse = require('../helpers/HttpResponse')

class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.internalServerError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
  }
}

module.exports = LoginRouter
