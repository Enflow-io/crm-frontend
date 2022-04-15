export const openSelect =  async (selector: string, page: any)=>{
    await  page.evaluate((selector: string) => {
        let select = document.querySelector(selector);
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('mousedown', true, true);
        select?.dispatchEvent(clickEvent)
    } , selector);
}