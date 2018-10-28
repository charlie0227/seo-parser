const should = require('should')
const Method = require('../lib/method')
describe('must', () => {
    let method = new Method();
    it('Tagname', done => {
        method.must('a', { alt: 'hi', src:'a.png' }, [ 'html', 'body'], [{Tagname:'img',Attr:'alt',Parent:'body'}]).should.equal(false);
        method.must('img', { alt: 'hi', src:'a.png' }, [ 'html', 'body'], [{Attr:'alt',Parent:'body'}]).should.equal(true);
        done()
    })
    it('Attr', done => {
        method.must('a', { width: '100', src:'a.png' }, [ 'html', 'body'], [{Tagname:'img',Attr:'alt',Parent:'body'}]).should.equal(false);
        method.must('img', { alt: 'hi', src:'a.png' }, [ 'html', 'body'], [{Tagname:'img',Parent:'body'}]).should.equal(true);
        done()
    })
    it('Parent', done => {
        method.must('a', { alt: 'hi', src:'a.png' }, [ 'html', 'head'], [{Tagname:'img',Attr:'alt',Parent:'body'}]).should.equal(false);
        method.must('img', { alt: 'hi', src:'a.png' }, [ 'html', 'body'], [{Tagname:'img',Attr:'alt'}]).should.equal(true);
        done()
    })
    it('Name', done => {
        method.must('meta', { name: 'keys'}, [ 'html', 'head'], [{Tagname:'meta',name:'keys',Parent:'head'}]).should.equal(true);
        method.must('img', { src: 'a.png'}, [ 'html', 'head'], [{Tagname:'img',src:'a.png',Parent:'head'}]).should.equal(true);
        method.must('img', { src: 'a.png'}, [ 'html', 'head'], [{Tagname:'img',name:'a.png',Parent:'head'}]).should.equal(false);
        done()
    })
})
describe('must not', () => {
    let method = new Method();
    it('Tagname', done => {
        method.must_not('img', { alt: 'hi', src:'a.png' }, [ 'html', 'body'],[{Tagname:'img'}]).should.equal(false);
        done()
    })
    it('Attr', done => {
        method.must_not('img', { alt: 'hi', src:'a.png' }, [ 'html', 'body'],[{Attr:'alt'}]).should.equal(false);
        done()
    })
    it('Parent', done => {
        method.must_not('a', { alt: 'hi', src:'a.png' }, [ 'html', 'body'], [{Parent:'body'}]).should.equal(false);
        done()
    })
    it('Name', done => {
        method.must_not('meta', { name: 'keys'}, [ 'html', 'head'], [{Tagname:'meta',name:'keys',Parent:'head'}]).should.equal(false);
        method.must_not('img', { src: 'a.png'}, [ 'html', 'head'], [{Tagname:'img',src:'a.png',Parent:'head'}]).should.equal(false);
        method.must_not('img', { src: 'a.png'}, [ 'html', 'head'], [{Tagname:'img',name:'a.png',Parent:'head'}]).should.equal(true);
        done()
    })
})
