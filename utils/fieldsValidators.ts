export const isIntegerField = (value: any, name: string) => {
    if (value && !Number.isInteger(+value)) {
        return Promise.reject(`"${name}" должно быть целым числом` );
    }
    return Promise.resolve();
}

export const isFloatField = (value: any, name: string) => {
    if (value && isNaN(+value)) {
        return Promise.reject(`"${name}" должно быть числом` );
    }
    return Promise.resolve();
}
