const should = require('should')
const SEO_Parser = require('../lib/parser')
const args = [{
    must:[{
        Tagname:'script',
        Attr:'src'
    }],
}];
describe('singleArgDecision', () => {
    let parser = new SEO_Parser();
    it('must and must not',done =>{
        //must and must not
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], { must: [ { Parent: 'html' },{ Attr:'src'},{Tagname:'script'} ], must_not: [ { Tagname: 'title' },{Attr:'rel'} ] }).should.equal(true)
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], { must: [ { Parent: 'head' } ], must_not: [ { Tagname: 'title' } ] }).should.equal(false)
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], { must: [ { Parent: 'html' },{ Attr:'src'} ], must_not: [ { Tagname: 'script' } ] }).should.equal(false)
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], { must: [ { Parent: 'head' },{ Attr:'src'} ], must_not: [ { Tagname: 'script' } ] }).should.equal(false)
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], { must: [ { Tagname: 'script' } ], must_not:[{Attr:'src'}]}).should.equal(false)
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], { must: [ { Tagname: 'script' } ], must_not:[{Attr:'rel'}]}).should.equal(true)
        done()
    })
    it('must',done =>{
        //must
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], { must: [ { Parent: 'html' },{ Attr:'src'} ]}).should.equal(true)
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], { must: [ { Tagname: 'div' } ]}).should.equal(false)
        done()
    })
    it('no params',done =>{
        //no params
        parser.singleArgDecision('script', { src: 'vue/index.js' }, ['html'], {}).should.equal(false)
        done()
    })
})
const test = [ [ false, false, false, false, false, false, false ],
  [ false, false, false, false, false, false, false ],
  [ false, false, false, false, false, false, false ],
  [ false, false, false, false, true, false, false ],
  [ false, false, false, false, false, false, false ],
  [ false, false, false, false, false, false, false ],
  [ false, false, true, false, false, false, false ],
  [ false, false, false, false, false, false, false ],
  [ true, false, false, false, false, false, false ],
  [ false, false, false, false, false, false, false ],
  [ false, true, false, false, false, false, false ],
  [ false, false, false, false, false, false, false ],
  [ false, false, false, false, false, false, true ],
  [ false, false, false, false, false, false, true ],
  [ false, false, false, false, false, true, false ],
  [ false, false, false, false, false, true, false ],
  [ false, false, false, false, false, true, false ],
  [ false, false, false, false, false, false, false ] ]
const arg2 = [
{
    must:[{
        Tagname:'img'
    }],
    must_not:[{
        Attr:'alt'
    }],
},{
    must:[{
        Tagname:'a'
    }],
    must_not:[{
        Attr:'rel'
    }],
},{
    must:[{
        Parent:'head',
        Tagname:'title'
    }],
},{
    must:[{
        Parent:'head',
        Tagname:'meta',
        name:'descriptions'
    }],
},{
    must:[{
        Parent:'head',
        Tagname:'meta',
        name:'keywords'
    }],
},{
    must:[{
        Tagname:'strong'
    }],
    range:{
        gt:"15"
    }
},{
    must:[{
        Tagname:'h1'
    }],
    range:{
        gt:"1"
    }
}]
describe('parser', () => {
    let parser = new SEO_Parser();
    it('collect_result',done =>{
        parser.collect_result(test, 7).should.containDeepOrdered([ 1, 1, 1, 0, 1, 3, 2 ])
        parser.collect_result([], 0).should.containDeepOrdered([])
        done()
    })
    it('display_result',done =>{
        parser.display_result(test, arg2).should.containDeepOrdered(
            [ 'There are 1 Tagname=img without Attr=alt',
            'There are 1 Tagname=a without Attr=rel',
            'This HTML have Parent=head Tagname=title',
            'This HTML without Parent=head Tagname=meta name=descriptions',
            'This HTML have Parent=head Tagname=meta name=keywords',
            'This HTML don\'t have gt than 15 Tagname=strong',
            'This HTML have gt than 1 Tagname=h1' ])
        done()
    })
})