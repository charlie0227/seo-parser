module.exports = class Compare{
    constructor(){
    }
    cmpString(string1 = '', string2 = ''){
        return string1 === string2;
    }
    cmpObj(string = '', obj = {}){
        return obj[string] !== undefined;
    }
    cmpArray(string = '', array = []){
        return array.includes(string);
    }
    compare_one(tagname = '', attr = '', parentStack = [], arg = {}){
        return Object.keys(arg).map(e => {
            switch(e){
                case 'Tagname':
                    return this.cmpString(arg[e], tagname);
                case 'Attr':
                    return this.cmpObj(arg[e], attr);
                case 'Parent':
                    return this.cmpArray(arg[e], parentStack);
                default:
                    return this.cmpString(arg[e], attr[e]);
            }
        });
    }
    cmpRange(method = "", value = 0, target = 0){
        switch(method){
            case "gt":
                return value >  target;
            case "gte":
                return value >= target;
            case "lt":
                return value <  target;
            case "lte":
                return value <= target;
            case "eq":
                return value == target;
            default:
                return false;
        }
    }
};