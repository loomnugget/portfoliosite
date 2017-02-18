'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const server = require('../server.js');

const serverControl = require('./lib/server-control.js');

const url = `http://localhost:3000`;

const exampleMailData = {
  name: 'Lemongrab',
  email: 'evil@lemon.com',
  message: 'I ate my brother.',
};

describe('Testing mail router', function() {
  // Turn server on before tests and off after tests
  before(done => serverControl.serverUp(server, done));
  after(done => serverControl.serverDown(server, done));

  describe('testing POST /contact', () => {

    describe('with valid body', () => {
      it('should return a valid data object', done => {
        request.post(`${url}/contact`)
        .send(exampleMailData)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.to).to.equal('claufadayas@gmail.com');
          expect(res.body.from).to.equal('Lemongrab - evil@lemon.com');
          expect(res.body.text).to.equal('I ate my brother.');
          expect(res.body.subject).to.equal('Message from Portfolio Website');
          done();
        });
      }); //end of 'should return valid data object'
    }); //end of valid body

    describe('with invalid body', () => {
      it('should return a 400 bad request', done => {
        request.post(`${url}/contact`)
        .send('whatever')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    }); //end of 'with invalid body'

  }); // end of POST/contact
}); // end of testing mail router
