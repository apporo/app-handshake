'use strict';

var lodash = Devebot.require('lodash');

var mappings = [
  {
    path: '/auth/login',
    method: 'POST',
    input: {
      transform: function(req) {
        return {
          data: req.body
        }
      },
      schema: {},
      validate: function(data) {
        return true;
      },
      examples: {
        ok: {
          "appType": "agent",
          "version": "1.0.0",
          "org": "E621E1F8-C36C-495A-93FC-0C247A3E6FGG",
          "device": {
            "imei": "990000862471854",
            "platform": "iOS"
          },
          "phone": {
            "country": "US",
            "countryCode": "+1",
            "number": "2055555555"
          }
        }
      }
    },
    transformRequest: function(req) {
      return {
        data: req.body
      }
    },
    serviceName: 'app-handshake/handler',
    methodName: 'authenticate',
    transformError: function(err, req) {
      return err;
    },
    transformResponse: function(result, req) {
      const payload = {
        headers: {
          "X-Return-Code": result.code || 0
        },
        body: lodash.get(result, "data")
      };
      return payload;
    }
  },
  {
    path: '/auth/verification-code',
    method: 'POST',
    transformRequest: function(req) {
      return {
        data: req.body
      }
    },
    serviceName: 'app-handshake/handler',
    methodName: 'verificationCode',
    transformResponse: function(result, req) {
      const payload = {
        headers: {
          "X-Return-Code": result.code
        },
        body: lodash.get(result, "data")
      };
      return payload;
    }
  },
  {
    path: '/auth/refresh-token',
    method: 'POST',
    transformRequest: function(req) {
      return {
        data: req.body
      }
    },
    serviceName: 'app-handshake/handler',
    methodName: 'refreshToken',
    transformResponse: function(result, req) {
      const payload = {
        headers: {
          "X-Return-Code": result.code
        },
        body: lodash.get(result, "data")
      };
      return payload;
    }
  }
]

module.exports = mappings;