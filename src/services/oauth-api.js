'use strict';

const Devebot = require('devebot');
const lodash = Devebot.require('lodash');
const jwt = require('jsonwebtoken');

function OauthApi (params = {}) {
  const L = params.loggingFactory.getLogger();
  const T = params.loggingFactory.getTracer();
  const config = lodash.get(params, ['sandboxConfig'], {});

  config.otpExpiredIn = config.otpExpiredIn || 15 * 60; // expires in 15 minutes

  this.createAppAccessToken = function({ user, constraints }) {
    const data = lodash.clone(constraints);
    data.userId = user._id;
    data.holderId = lodash.get(user, [data.appType, 'holderId']);
    const token = jwt.sign(data, config.secretKey || 't0ps3cr3t', {
      expiresIn: data.expiredIn || config.otpExpiredIn
    });
    L.has('debug') && L.log('debug', T.add({ token }).toMessage({
      text: 'A new access-token has been created'
    }));
    return token;
  }
}

module.exports = OauthApi;
