var Validator = require('validator');
const commonValidations = (data,roles,msg) => {
    let errors = {};
    //validation:
    for(const role in roles){
        const roleList = roles[role].split('|');
        for(const list in roleList){
            const allExp = roleList[list].split(':');
            const validation = rolesFunc[allExp[0]]({
                value: data[role],
                filed: role,
                role: allExp
            });
            if(validation !== true){
                if(msg && msg[role] && msg[role][allExp[0]]){
                    errors[role] = msg[role][allExp[0]];
                }else{
                    errors[role] = validation;
                }
                break;
            }
        }
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
const rolesFunc = {
    required: (data)=>{
        try{
            const {value} = data;
            if(value === undefined){
                 throw new Error('This field is required')
            }else if( typeof value === 'object' ){
                if(value.length === 0){
                    throw new Error('This field is required')
                }
            }else if(value.toString().trim() === ''){
                throw new Error('This field is required')
            }
            return true;
        }catch (e) {
            return e.message;
        }
    },
    max: (data)=>{
        const {value,role} = data;
        const max =  role[1];
        if(!value){
            return true;
        }
        if(role[2]==='numeric' && value > max){
            return `The field may not be greater than ${max}.`
        }else if(Validator.isLength(value,{max}) === false){
            return `The field may not be greater than ${max} characters.`
        }
        return true;
    }
};
module.exports = commonValidations;
