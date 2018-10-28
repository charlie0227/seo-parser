# seo-parser ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

seo-parser is a Node.js module for dealing with parsing html DOM.

## dependencies
    "htmlparser2": "^3.10.0"
## devDependencies
    "mocha": "^5.2.0",
    "should": "^13.2.3"
## Installation

`$ npm install`

## Usage
demo.html
```
<html>
    <head>
        <meta name="author" content="aaa">
        <meta name="keywords" content="aaa">
        <meta name="description" content="aaa">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hello World</title>
    </head>
    <body>
        <img src="a">
        <img src="a" alt="">
        <a href=""></a>
        <a href="" rel=""></a>
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <strong></strong>
        <strong></strong>
        <strong></strong>
    </body>
    <script src="index.js"></script>
</html>
```
index.js

```
const SEO_Parser = require('./lib/parser')
const args = [{
    must:[{
        Parent:'head',
        Tagname:'meta',
        name:'keywords'
    }],
},
    {
    must:[{
        Tagname:'img',
        Attr:'src'
    },{
        Tagname:'img',
        Attr:'alt'
    }],
    must_not:[{
        Attr:'width'
    }],
    range:{
        gt:1,
        lt:10
    }
}];
let parser = new SEO_Parser();
parser.parse(args, 'demo.html', 'result.txt');//output as file
parser.parse(args, 'demo.html');//output as console
```
## Output
```
This HTML have Parent=head Tagname=meta name=keywords
This HTML have gt than 1, have lt than 10 Tagname=img Attr=src Tagname=img Attr=alt without Attr=width
```

## Running the tests

Explain how to run the automated tests for this system

```
mocha
```
## Document
__new SEO_Parser.parse(args, read_path [, write_path])__
| Arguments | Description |
| --- | --- |
| args | an array contains optional quantity of arguments. Default is []. |
| read_path | read html DOM path ex:demo.html|
| write_path (optional) | write output result to file ex:result.txt , default is output as console. |
## Method
__must__(array)

The query must appear in matching documents 

__must_not__(array)

The query must not appear in matching documents 
| Arguments | Description |
| --- | --- |
| Parent | check current tag contains this parent or not, ex:{ Parent: 'head' }. |
| Tagname | check current tag name, ex:{ Tagname: 'img' } |
| Attr | check current tag contains this attribute, ex:{ Attr: 'src'} |
| other | other words start from lower case can check attribute's value  is equal or not, ex:{ src:'index.js' }|

__range__(object)

Matches result with nums that have terms within a certain range.
| Arguments | Description |
| --- | --- |
| gte | Greater-than or equal to |
| gt | Greater-than |
| lte | Less-than or equal to |
| lt | Less-than|
| eq | equal|
## License
[MIT](https://choosealicense.com/licenses/mit/)