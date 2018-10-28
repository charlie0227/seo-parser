const should = require('should')
const Compare = require('../lib/compare');
describe('cmpString', () => {
    let cmp = new Compare();
    it('Same String', done => {
        cmp.cmpString('a','a').should.equal(true);
        done()
    })
    it('Different String', done => {
        cmp.cmpString('a','b').should.equal(false);
        done()
    })
})
describe('cmpObj', () => {
    let cmp = new Compare();
    it('In Object', done => {
        cmp.cmpObj('a',{a:''}).should.equal(true);
        done()
    })
    it('Not in Object', done => {
        cmp.cmpObj('a',{b:''}).should.equal(false);
        done()
    })
})
describe('cmpArray', () => {
    let cmp = new Compare();
    it('In Array', done => {
        cmp.cmpArray('a',['a']).should.equal(true);
        done()
    })
    it('Not in Array', done => {
        cmp.cmpArray('a',['b']).should.equal(false);
        done()
    })
})
describe('cmpRange', () => {
    let cmp = new Compare();
    it('gt', done => {
        cmp.cmpRange("gt",6,5).should.equal(true);
        cmp.cmpRange("gt",5,5).should.equal(false);
        done()
    })
    it('gte', done => {
        cmp.cmpRange("gte",6,5).should.equal(true);
        cmp.cmpRange("gte",5,5).should.equal(true);
        done()
    })
    it('lt', done => {
        cmp.cmpRange("lt",4,5).should.equal(true);
        cmp.cmpRange("lt",5,5).should.equal(false);
        done()
    })
    it('lte', done => {
        cmp.cmpRange("lte",4,5).should.equal(true);
        cmp.cmpRange("lte",5,5).should.equal(true);
        done()
    })
    it('eq', done => {
        cmp.cmpRange("eq",5,5).should.equal(true);
        done()
    })
})
