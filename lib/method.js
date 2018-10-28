const Compare = require('./compare')
module.exports = class Method extends Compare{
    constructor(){
        super();
    }
    must(tagname = '', attr = '', parentStack = [], args = {}){
        for(let arg in args){
            let check_one = this.compare_one(tagname, attr, parentStack, args[arg]);
            if(check_one.includes(false))
                return false;
        };
        return true;
    }
    must_not(tagname = '', attr = '', parentStack = [], args = {}){
        for(let arg in args){
            let check_one = this.compare_one(tagname, attr, parentStack, args[arg]);
            if(check_one.includes(false))
                return true;
        };
        return false;
    }
}