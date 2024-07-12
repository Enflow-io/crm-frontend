export const isIntegerField = (value: any, name: string) => {
    if (value && !Number.isInteger(+value)) {
        return Promise.reject(`"${name}" должно быть целым числом` );
    }
    return Promise.resolve();
}