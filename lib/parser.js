const fs = require('fs');
const htmlparser = require('htmlparser2');
const Method = require('./method')

module.exports = class SEO_Parser extends Method{
    constructor(){
        super();
        this._output = [];
        this.args = '';
        this.parentStack = [];
        this.result = [];
        this.init_parser();
    }
    init_parser(){
        this.parser = new htmlparser.Parser({
            onopentag: (tagname, attr) => {
                this.handleOpenTag(tagname,attr)
                this.parentStack.push(tagname);
            },
            onclosetag: (tagname) => {
                this.parentStack.pop();
            }
        }, {decodeEntities: true});
    }
    parse(args = [], read_path = '', write_path = ''){
        this.args = args;
        let readerStream = fs.createReadStream(read_path);
        readerStream.setEncoding('UTF8');
        readerStream.on('data', (chunk) => {
            this.parser.write(chunk);
        });
        readerStream.on('end',()=>{
            this.parser.end();
            this._output = this.display_result(this.result, this.args);
            this.output(write_path);
        });
        readerStream.on('error', function(err){
            console.log(err.stack);
        });
    }
    handleOpenTag(tagname,attr){
        this.result.push(
            this.args.map( arg => {
                return this.singleArgDecision(tagname, attr,this.parentStack, arg)
            })
        );
    }
    singleArgDecision(tagname, attr, parentStack, arg){
        const result_must = arg.must && this.must(tagname, attr, parentStack, arg.must);
        const result_must_not = arg.must_not && this.must_not(tagname, attr, parentStack, arg.must_not);
        if(arg.must && arg.must_not)
            return result_must && result_must_not;
        else if(arg.must)
            return result_must;
        else
            return false
    }
    collect_result(result, len){
        let result_count = Array(len).fill(0);
        result.forEach( TagResult => {
            TagResult.forEach( (e, i) =>{
                result_count[i] += e;
            })
        });
        return result_count;
    }
    display_result(result, args){
        let result_count = this.collect_result(result, args.length);
        return args.map( (arg, i)=>{
            let message = '';
            if(arg.range){
                message += 'This HTML ';
                Object.keys(arg.range).forEach( (op, j)=>{
                    message += j > 0 ? ', ' : '';
                    if(!this.cmpRange(op, result_count[i], arg.range[op]))
                        message += "don't "
                    message += 'have ' + op + ' than ' + arg.range[op]
                })
            }
            else{
                if(arg.must_not)
                    message += 'There are ' + result_count[i];
                else
                    if(result_count[i] > 0)
                        message += 'This HTML have';
                    else
                        message += 'This HTML without';
            }
            if(arg.must)
                arg.must.forEach( e => {
                    Object.keys(e).forEach( key => {
                        message += ' ' + key + '=' + e[key];
                    })
                })
            if(arg.must_not)
                arg.must_not.forEach( e => {
                    Object.keys(e).forEach( key => {
                        message += ' without ' + key + '=' + e[key];
                    })
                })
            return message
        });
    }
    output(write_path){
        if(write_path === '')
            this._output.forEach(e=>{
                console.log(e);
            });
        else{
            let writerStream = fs.createWriteStream(write_path);
            this._output.forEach(e=>{
                writerStream.write(e+'\n','UTF8');
            });
            writerStream.end();
            writerStream.on('finish', function() {
                console.log("寫入完成。");
            });
            writerStream.on('error', function(err){
                console.log(err.stack);
            });
        }
    }
}