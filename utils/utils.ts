
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

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}


export const replaceAt = (array: any[], index: number, value: any) => {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
  }