
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

export const convertGlobalDistrict = (globalDistrict: string) => {
  if (globalDistrict === 'Зеленоградский') {
      return 'ЗелАО';
  } else if (globalDistrict === 'Центральный') {
      return 'ЦАО';
  } else if (globalDistrict === 'Северный') {
      return 'САО';
  } else if (globalDistrict === 'Северо-восточный') {
      return 'СВАО';
  } else if (globalDistrict === 'Восточный') {
      return 'ВАО';
  } else if (globalDistrict === 'Юго-восточный') {
      return 'ЮВАО';
  } else if (globalDistrict === 'Южный') {
      return 'ЮАО';
  }  else if (globalDistrict === 'Юго-западный') {
      return 'ЮЗАО';
  } else if (globalDistrict === 'Западный') {
      return 'ЗАО';
  } else if (globalDistrict === 'Северо-западный') {
      return 'СЗАО';
  }
  return null;
}