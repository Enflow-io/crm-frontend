
export const convertStringToBoolean = (prop: string)=>{
    if(prop === 'null'){
        return null;
    }else if(prop === 'true'){
        return true;
    }else if(prop === 'false'){
        return false;
    }else {
        return null;
    }

}
export const convertBooleanToString = (prop: boolean)=>{
    if(prop === null){
        return 'null'
    }

    if(prop === undefined){
        return 'null'
    }
    if(prop.toString() === 'true'){
        return 'true';
    }else if(prop.toString() === 'false'){
        return 'false';
    }else{
        return 'null'
    }

}