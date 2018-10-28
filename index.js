const SEO_Parser = require('./lib/parser')
const args = [
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
        gt:"1",
        lt:"3"
    }
}]
let parser = new SEO_Parser();
parser.parse(args, 'demo.html', 'result.txt');
parser.parse(args, 'demo.html');
