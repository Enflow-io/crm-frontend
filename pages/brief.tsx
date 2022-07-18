import styles from "../styles/breif.module.scss"
import jsPDF from 'jspdf'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Api from "../services/Api";
import {BuildingInterface} from "../interfaces/BuildingInterface";
import {Buffer} from "buffer";
import axios from "axios";
import {BlockInterface} from "../interfaces/BlockInterface";
import {capitalizeFirstLetter} from "../utils/utils";
import {getStationLineImgByLabel} from "../components/inputs/StationsInput/lines";

const MM_KOE = 72/25.6;

const Brief = () => {
    const [buildingData, setBuildingData] = useState<BuildingInterface | null>(null);

    const [pic1, setPic1] = useState('');
    const [pic2, setPic2] = useState('');

    const router = useRouter();

    const buildingId = router?.query?.buildingId;
    const pageNumber = router?.query?.pageNumber;


    const convertUrl = (url: string) => {
        const newUrl = url.replace('https://crm2802.storage.yandexcloud.net/', '/s3/')

        return newUrl
    }

    const getBuilding = async (buildingId: number) => {
        const res = await Api.get(`/objects/${buildingId}`)
        if (res?.data) {
            setBuildingData(res.data)
            console.log("new blds", res.data)

            // let image1 = await axios.get(convertUrl(res.data.pics[0].url), {responseType: 'arraybuffer'});
            // // let image1 = await axios.get('http://crm2802.storage.yandexcloud.net/building/1/ae48bdfa-4a89-422b-90d6-80287d647654-0.15736080922868223.jpg', {responseType: 'arraybuffer'});
            // let base64_1 = Buffer.from(image1.data).toString('base64');
            // let image2 = await axios.get(convertUrl(res.data.pics[1].url), {responseType: 'arraybuffer'});
            // // let image2 = await axios.get('http://crm2802.storage.yandexcloud.net/building/1/ae48bdfa-4a89-422b-90d6-80287d647654-0.15736080922868223.jpg', {responseType: 'arraybuffer'});
            // let base64_2 = Buffer.from(image2.data).toString('base64');
            //
            // setPic1(base64_1)
            // setPic1(base64_2)


        }

    }



    const genPDF = () => {
        const doc = new jsPDF({
            unit: 'mm',
            hotfixes: ["px_scaling"],
            // format: [210, 500],
        });



        // const fontPath = "/fonts/akrobat-pdf-font/Akrobat-Regular.otf"
        const fontPath = "/fonts/akrobat-web/Akrobat.ttf"
        // const fontPath2 = "/fonts/akrobat-web/Akrobatbold.ttf"
        const fontPath2 = "/fonts/akrobat-web/Akrobatbold.ttf"
        // const fontPath = "/fonts/BellotaText-Regular.ttf"
        // const fontPath2 = "/fonts/BellotaText-Bold.ttf"

        doc.addFont(fontPath, "Akrobat", "normal");
        doc.addFont(fontPath2, "AkrobatBold", "normal");
        doc.setFont('Akrobat')


        // doc.addFont(fontPath2, "Akrobatbold", "normal");
        const element = document.getElementById('pdf-brief');
        if (element) {

            doc.html(element, {
                callback: async function (doc) {

                    const pagesCount = doc.getNumberOfPages();
                    for (let pageNum = 1; pageNum <= pagesCount; pageNum++) {
                        doc.setPage(pageNum);
                        doc.addFont(fontPath, "Akrobat", "normal");
                        doc.setFont('Akrobat')
                        doc.setFontSize(7)
                        doc.setTextColor('#575757')
                        // doc.text('* руб./ м² /год', 180, 292)
                        doc.text('руб./кв. м/год', 180, 292)

                        doc.setFillColor(44, 56, 71);
                        const fotY = 293;
                        doc.rect(40, fotY, 210 - 40, 5, "F");

                        doc.setTextColor('#FFFFFF')
                        doc.setFontSize(7)

                        doc.text('https://www.rnbconsulting.ru/', 45, fotY + 3)
                        doc.text('+7 495 545 42 82', 130, fotY + 3)

                        const today = new Date()
                        const month = today.toLocaleString('default', { month: 'long' })
                        doc.text(capitalizeFirstLetter(month) + ' 2022', 180, fotY + 3)

                    }


                    doc.setPage(1);

                    // заголовок
                    doc.setFontSize(20)

                    const number = pageNumber || '1';
                    const name = `${number}. ${buildingData?.name},`;
                    const width = doc.getStringUnitWidth(name)
                    doc.setFont('AkrobatBold')
                    doc.text(name, 4, 9)
                    doc.setFont('Akrobat')
                    doc.text(`  класс ${buildingData?.buildingClass}`, 4 + width*20/(72/25.6), 9)

                    doc.setFontSize(14)
                    doc.text(buildingData?.address || 'адрес', 4, 14)


                    //список


                    // Адрес
                    const addressKey = 'Адрес:  '
                    const addressVal = buildingData?.address || 'адрес'

                    const addressKeyWidth = doc.getStringUnitWidth(addressKey)*11/(72/23)

                    doc.setTextColor('#000000')

                    doc.setFontSize(11)
                    doc.setFont('AkrobatBold')

                    doc.setDrawColor(0,0,0);
                    doc.setFillColor(0, 0, 0)
                    doc.circle(8, 117.4, .4, 'F')
                    doc.text(addressKey, 9.5, 119)

                    doc.setFont('Akrobat')
                    doc.text(addressVal, 9.5+addressKeyWidth, 119)

                    // Административный округ
                    const districtKey = 'Административный округ:  '
                    const districtVal = buildingData?.globalDistrict || ""


                    const lineWidth = 7;
                    const districtKeyWidth = doc.getStringUnitWidth(districtKey)*11/(72/25.6)

                    doc.setTextColor('#000000')

                    doc.setFontSize(11)
                    doc.setFont('AkrobatBold')

                    doc.setDrawColor(0,0,0);
                    doc.setFillColor(0, 0, 0)
                    doc.circle(8, 117.4 + lineWidth, .4, 'F')
                    doc.text(districtKey, 9.5, 119 + lineWidth)

                    doc.setFont('Akrobat')
                    doc.text(districtVal, 9.5+districtKeyWidth, 119 + lineWidth)


                    // Район
                    const districtSmKey = 'Район:  '
                    const districtSmVal = buildingData?.district || ""


                    const districtSmKeyWidth = doc.getStringUnitWidth(districtSmKey)*11/(72/25.6)

                    doc.setTextColor('#000000')

                    doc.setFontSize(11)
                    doc.setFont('AkrobatBold')

                    doc.setDrawColor(0,0,0);
                    doc.setFillColor(0, 0, 0)
                    doc.circle(8, 117.4 + lineWidth*2, .4, 'F')
                    doc.text(districtSmKey, 9.5, 119 + lineWidth*2)

                    doc.setFont('Akrobat')
                    doc.text(districtSmVal, 9.5+districtSmKeyWidth, 119 + lineWidth*2)


                    // Налоговая
                    const taxOfficeKey = 'Налоговая:  '
                    const taxOfficeVal = buildingData?.taxOffice || ""


                    const taxOfficeWidth = doc.getStringUnitWidth(taxOfficeKey)*11/(72/25.6)

                    doc.setTextColor('#000000')

                    doc.setFontSize(11)
                    doc.setFont('AkrobatBold')

                    doc.setDrawColor(0,0,0);
                    doc.setFillColor(0, 0, 0)
                    doc.circle(8, 117.4 + lineWidth*3, .4, 'F')
                    doc.text(taxOfficeKey, 9.5, 119 + lineWidth*3)

                    doc.setFont('Akrobat')
                    doc.text(taxOfficeVal, 9.5+taxOfficeWidth, 119 + lineWidth*3)



                    // Метро


                    // doc.addSvgAsImage('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#00be0b"></circle><path d="M15.6852 13.3306L12.3889 5.03719L10.0556 9.61157L7.64815 5L4.35185 13.3306H3.5V14H8.16667V13.3306H7.24074L8.16667 10.7273L10.0556 14L11.8704 10.7273L12.7963 13.3306H11.8704V14H16.5V13.3306H15.6852Z" fill="white"></path></svg>',
                    //     0, 150, 10, 10
                    //     )

                    // doc.addImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAABYVJREFUWAnNWV1MXEUUPjPLLlCg/OyyC5SCFn/TrQ8ajbBUKWmjVREKtLaVH21jEwitibWJ8YfaGuOD+mBCfLPGF41BrSTGhz75IPTFn0QWKypaWwpCl1jLT4tldzxnlrncu/fuspc/vclmZs6cc+a75845Z+YsgyU+Xn9vWYRBrYiIe4BBEQj8gfyRxhGkjSBthHH2LRfQMx4MDC1lKWZHyHdXrzccFh0RxnaBEH47ssBYkAtx2uFgXWM/BMaTlU0KYH7VQGY4dOUoE+J5AZCZrHIrPlxwSjD2lsOT8/blrzZPWfHoaYsCdPvP1gNE3hVC+PSCy+0zxsYAePtEsPyzRLp4vEkExPL8vceFiHyy0uBoTdJJuqNriLiGspwoLu9Ln5kUH6CW3fFeYEXpjHWvy2Ktw2crrsXqNVmQLLem4AgRGoLWpLUXBeje0te5ZpbTo0GQcm09DfsGxOQQtC/wlQz0GJlVHDJ0cN6odxwNCIWSSOjKr6vhEHbeiLybe3JuUSFI24MU5+yA4yjZ1kLJI/GzpyYfnCmaHRIz4yxhICyKUQKkDEFBWBGTabdvzYWXny2FIp8rLnt6GocTR2+Cmh3uuDxWE4SFMNGcBDgn4LDdDNHaWABpqRyOtW20WkPSDu4rBK/HBS2N9mI8YaGUqgEUAurirmIxUZDvgh0P5MqZ/XU+uHljmokrI53DkQMbJL3yvmzYVGLmMQnpCDLf45jTqQQ/vK3E/2S9FzDpS3UpuL9e6CjRqY52DzUVgTvXKQe48W1bkTARNk5HJpP2BARcC5rqjZ+sfqcH7rx1nSaVlemAjqei1lPEvbVeoJex8xA2Ls9zNqSqKnKgZIPxc3HO4MXDC1Yk787JTjFozXe74NHqPANtsQFh4/KwuRinbr6lwWg9NfVItRvu9mdC9noHtDVbh5+W3QWKPbkWD8Ip8yfhpAQ8eU7YuS2+FV7CsPNd/ySszzJaTyl/8P5sKC1OhT+GZxUpcYundAoz1q9rIbqvzgtOp4xMFrMAVeU50PG0ce/pGclZmhtsWZEAMgw7yT3NcT6vXtqV4AWIb/8uigB6iUR9JhCgGE3EouYolpWVpquh1v5+wXSE0+bOX7yu9VXHh4H74ar420TxRVsxSk4yYiRaj6yywd9X56Dh0ABMz4RNQpgJoOnIORgeNe+31mSdBbFxuhqatMcQcjFkPLbdnE97zoTkhn/nveEYCYAPT4/BuV9m4NMvL5vmtmGoKi5MNdFNBMTG6d5qmogh7H3cC6kus3N0fxFdvOv9S3BxZOFzkkXf6LogtSgevUqKm8nsZ3mnpku1Xtiq32SR7C/9OQt931yV7LP/COh887wmSoDHQjfkmKz448/T2pzqkLPQkS3RQ9gc0+On/kr3HWxERnm80QvUPuSG6kAu7KkxTcH3wSm4PhuByakwTE6HYfC3a1B5bza40NLPHBuEG3hEorhJh4pCXyrctmkhFdIaWZkYgiMAHrcTBocsHA0v+qFg4HWZHD2bvz6JvK/owVF/IhiIJZnGB577CXrOTEi6//YM2HJHBnzUEy0cbEXP//zU4ucQt7/XpBeN+1pooLJTAqTD4VxYDNk9E5q0rhABQU2lOFgZlUjkLqAOlSNWSP+y1RAWVb/RtinVSqLliGXrX5YCwkBYlBINYPQWxdvtpD6lZOVaSru8Xd3oSK8GkAbyPsrgBPX/kwfX1t+JCYN0Ej0YKj/gDf/jNa8uYH1mor/iCfzEhsOLwYISMTJQIQcLjt164Kvany8exYKTeOItPG9JrNPA8dUrhaC16LP2V5y0ApcQoAL+vy1gKoC0aalWgp/8VQqgir7UVupAXaQz1iGsdJqcxIpJ0WTGoSoEXfRt3qVXtYiuAOrbtfob4l9d6+X8gKKDiwAAAABJRU5ErkJggg==',
                    doc.addImage(getStationLineImgByLabel(buildingData?.station1 || ''),
                        'PNG', 8, 144.5, 6, 6)

                    const metro1 = buildingData?.station1 || ""


                    const metro1dist = `  / ${buildingData?.fromStation1 || ""} минут`
                    const metro1Width = doc.getStringUnitWidth(metro1)*20/(72/25.6)

                    const metro1y = 150
                    doc.setFontSize(20)
                    doc.setFont('AkrobatBold')
                    doc.text(metro1, 8+8, metro1y)
                    doc.setFont('Akrobat')
                    doc.text(metro1dist, 8+8+metro1Width, metro1y)





                    if(buildingData?.station2) {
                        // doc.addImage('data:image/png;base64,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',
                        doc.addImage(getStationLineImgByLabel(buildingData?.station2 || ''),
                            'PNG', 8, 154.5, 6, 6)

                        const metro2 = buildingData?.station2 || ""
                        const metro2dist = `  / ${buildingData?.fromStation2 || ""} минут`
                        const metro2Width = doc.getStringUnitWidth(metro2) * 20 / (72 / 25.6)

                        const metro2y = 160
                        doc.setFontSize(20)
                        doc.setFont('AkrobatBold')
                        doc.text(metro2, 8 + 8, metro2y)
                        doc.setFont('Akrobat')
                        doc.text(metro2dist, 8 + 8 + metro2Width, metro2y)

                    }

                    // списки свойств




                    const writeLine = (label: string, val: string, line = 1)=>{

                        const listX = 8;
                        const listY = 190;
                        const ulFontSize = 11;
                        const lineHeight = 7;

                        line = line - 1

                        doc.setDrawColor(0,0,0);
                        doc.setFillColor(0, 0, 0)
                        doc.circle(listX, listY + lineHeight*line - 1, .4, 'F')

                        doc.setFontSize(ulFontSize)
                        doc.setFont('AkrobatBold')
                        const labelWidth = doc.getStringUnitWidth(label)*ulFontSize/MM_KOE
                        doc.text(label, listX + 2, listY + lineHeight*line)

                        doc.setFont('Akrobat')
                        doc.text(val, listX + 2 +labelWidth, listY + lineHeight*line)


                    }

                    writeLine('Тип здания: ', buildingData?.buildingType || 'Бизнес-центр', 1)
                    writeLine('Год постройки: ', buildingData?.buildingYear || '–', 2)
                    // writeLine('Общая площадь, м2: ', buildingData?.area.toString() || "–", 3)
                    writeLine('Площадь офисов, м2: ', buildingData?.officesArea.toString() || "–", 3) // officesArea
                    writeLine('Площадь в аренду, м2: ', buildingData?.freeRentArea || '–', 4)
                    writeLine('Площадь на продажу, м2: ', buildingData?.freeSaleArea || '–', 5)

                    const writeLine2 = (label: string, val: string, line = 1)=>{

                        const listX = 110;
                        const listY = 190;
                        const ulFontSize = 11;
                        const lineHeight = 7;

                        line = line - 1

                        doc.setDrawColor(0,0,0);
                        doc.setFillColor(0, 0, 0)
                        doc.circle(listX, listY + lineHeight*line - 1, .4, 'F')

                        doc.setFontSize(ulFontSize)
                        doc.setFont('AkrobatBold')
                        const labelWidth = doc.getStringUnitWidth(label)*ulFontSize/MM_KOE
                        doc.text(label, listX + 2, listY + lineHeight*line)

                        doc.setFont('Akrobat')
                        doc.text(val, listX + 2 +labelWidth, listY + lineHeight*line)


                    }

                    writeLine2('Высота потолков, м: ', !!buildingData?.floorsHeight ? buildingData?.floorsHeight?.toString() : "–", 1)
                    writeLine2('Шаг колонн, м: ', buildingData?.stepKolonn?.toString() || "–", 2)

                    writeLine2('Нагрузка на перекрытия, кг/м2: ', buildingData?.parkingLoad?.toString() || "", 3)
                    writeLine2('Тип / объем паркинга: ', `${buildingData?.parkingLoad?.toString() || ""} / ${buildingData?.parkingNazemQnt?.toString() || ""}`, 4)
                    writeLine2('Тип / марка лифтов:  ', `${buildingData?.hasBigLift ? 'грузовые' : 'пассажирские'} ${buildingData?.bigLiftsBrand ? buildingData?.bigLiftsBrand : ''}`, 5)


                    /*Заголовки*/

                    doc.setFontSize(20)
                    doc.setFont('Akrobat')
                    doc.text("Общее описание", 7, 182)
                    doc.text("Технические характеристики", 108.5, 182)
                    doc.text("Свободные площади и коммерческие условия", 7, 232)


                    /*
                    *
                    *
                    *
                    *  <ul style={{
                            paddingLeft: 5
                        }} className={styles.List}>
                            <li><b style={{
                                fontFamily: 'AkrobatBold'
                            }}>Высота потолков , м</b> 2.7
                            </li>
                            <li><strong style={{
                                fontFamily: 'AkrobatBold'
                            }}>Шаг колонн , м</strong> 9x9
                            </li>
                            <li><b style={{
                                fontFamily: 'AkrobatBold'
                            }}>Нагрузка на перекрытия , кг/м²</b> 450
                            </li>
                            <li><b style={{
                                fontFamily: 'AkrobatBold',
                                // wordSpacing: 15
                            }}>Тип / объем паркинга</b> <strong style={{
                                fontFamily: 'Akrobat',
                                // wordSpacing: 15
                            }}>подземный / 650</strong>
                            </li>
                            <li><b style={{
                                fontFamily: 'AkrobatBold',

                            }}>Тип / марка лифтов&nbsp;</b> <span>пассажирские / KOEN</span>
                            </li>
                        </ul>
                    *
                    *
                    * <ul className={styles.List}>
                            <li><b style={{
                                fontFamily: 'AkrobatBold'
                            }}>Тип здания</b> {buildingData?.buildingType}
                            </li>
                            <li><b style={{
                                fontFamily: 'AkrobatBold'
                            }}>Класс</b> {buildingData?.buildingClass}
                            </li>
                            <li><b style={{
                                fontFamily: 'AkrobatBold'
                            }}>Статус объекта</b> {buildingData?.constructionStatus || "–"}
                            </li>
                            <li><b style={{
                                fontFamily: 'AkrobatBold'
                            }}>Общая площадь, м²</b> {buildingData?.area}
                            </li>
                            {buildingData?.officesArea &&
                            <li><b style={{
                                fontFamily: 'AkrobatBold'
                            }}>Площадь офисов, м²</b> {buildingData?.officesArea}
                            </li>
                            }
                        </ul>
                    * */



                    // const promise = doc.save(buildingData?.name || 'brief', {returnPromise: true});
                    const promise = doc.save(number.toString() || 'brief', {returnPromise: true});
                    setTimeout(() => {
                        // close()

                    }, 1200)
                    // promise.then(()=>{
                    //     setIsVisible(false);
                    //
                    //
                    // })

                    // setTimeout(()=>{
                    //     if(location){
                    //         debugger
                    //         close()
                    //     }
                    // })

                    // router.push('/objects/'+buildingId)

                },
                x: 0,
                y: 0,
                width: 210,
                windowWidth: 600,
                margin: [0, 0, 8, 0],

                // autoPaging: 'text'

            });
        }

    }

    useEffect(() => {


        if (!buildingId) {
            return
        }
        getBuilding(parseInt(buildingId.toString()));


    }, [buildingId]);

    useEffect(() => {
        if (!buildingData) {
            return
        }
        genPDF();
    }, [buildingData]);


    const coords = `${buildingData?.longitude},${buildingData?.latitude}`
    return <div>

        {buildingData &&
        <div id={'pdf-brief'} className={styles.Layer}>
            <div className={styles.Header}>
                <div className={styles.HeaderText}>
                    {/*<span style={{fontSize: 20}}><strong style={{*/}
                    {/*    fontFamily: 'AkrobatBold'*/}
                    {/*}}>{buildingData?.name}</strong>, класс&nbsp;&nbsp;{buildingData?.buildingClass} </span><br/>*/}
                    {/*<div style={{*/}
                    {/*    position: "relative",*/}
                    {/*    top: -7,*/}
                    {/*    color: '#BBBFC4',*/}
                    {/*    fontSize: 13,*/}
                    {/*    fontFamily: 'Akrobat'*/}
                    {/*}}><strong>{buildingData?.address}</strong></div>*/}
                </div>
                <div className={styles.ImgLogo}>
                    <img className={styles.Logo} src={'/pic/rnb-logo.png'}/>
                </div>

            </div>

            <div className={styles.Body}>
                <div className={styles.PicsCont}>
                    <div className={styles.PicsContImg}>
                        {/*<img src={'/pic/bld1.jpg'}/>*/}
                        <img src={convertUrl(buildingData.pics[0].url)}/>
                        {/*<img src={`data:image/png;base64,${pic1}`}  />*/}
                    </div>
                    <div className={styles.PicsContImg}>
                        <img src={
                            convertUrl(buildingData.pics[1] ? (buildingData.pics[1].url) : (buildingData.pics[0].url) )
                        }/>

                        {/*<img src={'/pic/bld1.jpg'}/>*/}
                        {/*<img src={`data:image/png;base64,${pic2}`}  />*/}
                    </div>

                </div>

                <div style={{
                    marginTop: 0,
                    marginBottom: 0,
                }} className={styles.Divider}/>

                <div className={styles.Location}>
                    <div style={{
                        marginTop: '1em'
                    }}>
                        <label className={styles.Label} style={{
                            fontSize: 20
                        }}>Местоположение</label>


                        <ul className={styles.List}>
                            {/*<li><strong >Адрес </strong> <span >{buildingData.address}</span>*/}
                            {/*</li>*/}
                            {/*<li> <strong > Административный&nbsp;округ</strong> {buildingData.district || "–"}*/}
                            {/*</li>*/}
                            {/*<li><b >Район</b> {buildingData?.globalDistrict || "–"}*/}
                            {/*</li>*/}
                            {/*{buildingData?.taxOffice &&*/}
                            {/*<li><b >Налоговая:</b> #{buildingData?.taxOffice}*/}
                            {/*</li>*/}
                            {/*}*/}
                        </ul>
                    </div>

                    <img className={styles.Map}
                         src={`http://static.maps.2gis.com/1.0?center=${coords}&zoom=13&size=300,200&&markers=pmgns,${coords}`}/>

                </div>

                <div style={{
                    marginTop: 0
                }} className={styles.Divider}/>

                <div className={styles.Info}>
                    <div style={{
                        height: 140
                    }}>

                        {/*<label className={styles.Label} style={{*/}
                        {/*    fontSize: 20,*/}

                        {/*}}>Общее описание</label>*/}
                        {/*<ul className={styles.List}>*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold'*/}
                        {/*    }}>Тип здания</b> {buildingData?.buildingType}*/}
                        {/*    </li>*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold'*/}
                        {/*    }}>Класс</b> {buildingData?.buildingClass}*/}
                        {/*    </li>*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold'*/}
                        {/*    }}>Статус объекта</b> {buildingData?.constructionStatus || "–"}*/}
                        {/*    </li>*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold'*/}
                        {/*    }}>Общая площадь, м²</b> {buildingData?.area}*/}
                        {/*    </li>*/}
                        {/*    {buildingData?.officesArea &&*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold'*/}
                        {/*    }}>Площадь офисов, м²</b> {buildingData?.officesArea}*/}
                        {/*    </li>*/}
                        {/*    }*/}
                        {/*</ul>*/}
                    </div>
                    <div>
                        {/*<label style={{*/}
                        {/*    paddingLeft: 0,*/}
                        {/*    fontSize: 20,*/}
                        {/*    position: 'relative',*/}
                        {/*    right: -10*/}

                        {/*}} className={styles.Label}>Технические характеристики</label>*/}

                        {/*<ul style={{*/}
                        {/*    paddingLeft: 5*/}
                        {/*}} className={styles.List}>*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold'*/}
                        {/*    }}>Высота потолков , м</b> 2.7*/}
                        {/*    </li>*/}
                        {/*    <li><strong style={{*/}
                        {/*        fontFamily: 'AkrobatBold'*/}
                        {/*    }}>Шаг колонн , м</strong> 9x9*/}
                        {/*    </li>*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold'*/}
                        {/*    }}>Нагрузка на перекрытия , кг/м²</b> 450*/}
                        {/*    </li>*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold',*/}
                        {/*        // wordSpacing: 15*/}
                        {/*    }}>Тип / объем паркинга</b> <strong style={{*/}
                        {/*        fontFamily: 'Akrobat',*/}
                        {/*        // wordSpacing: 15*/}
                        {/*    }}>подземный / 650</strong>*/}
                        {/*    </li>*/}
                        {/*    <li><b style={{*/}
                        {/*        fontFamily: 'AkrobatBold',*/}

                        {/*    }}>Тип / марка лифтов&nbsp;</b> <span>пассажирские / KOEN</span>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                    </div>

                </div>

                <div className={styles.Divider}/>

                <div className={styles.Blocks}>
                    <label className={styles.Label}><strong style={{
                        fontSize: 20,
                    }}>&nbsp;</strong></label>

                    <table className={styles.Table}>
                        <tr>
                            <th>Этаж</th>
                            <th>Площадь</th>
                            <th>Доступно</th>
                            <th>Отделка</th>
                            <th>Базовая ставка*</th>
                            <th>OPEX*</th>
                            <th>НДС</th>
                        </tr>

                        {
                            buildingData?.blocks.filter((el:any)=>{
                                return el.isOnMarket.toLowerCase() === 'есть на рынке'
                            }).map((block: BlockInterface, index)=>{
                                return <tr key={index}>
                                    <td>{block.floor}</td>
                                    <td>{formatEmpty(block?.area?.toString())}</td>
                                    <td>Сейчас</td>
                                    <td>{formatEmpty(block?.finishing)}</td>
                                    <td>{formatEmpty(block?.rentPrice?.toString())}</td>
                                    <td>{block.opex.toString() === 'null' ? "-" : block.opex.toString()}</td>
                                    <td>{formatEmpty(block.taxIncluded)}</td>
                                </tr>
                            })
                            // Array.from({length: 20}, (v, k) => k + 1).map((i, index) => {
                            //     return <tr key={index}>
                            //         <td>10</td>
                            //         <td>1 343</td>
                            //         <td>Сейчас</td>
                            //         <td>С отделкой</td>
                            //         <td>42 000</td>
                            //         <td>8 500</td>
                            //         <td>Не вкл</td>
                            //         <td>52 200</td>
                            //     </tr>
                            // })
                        }

                    </table>

                </div>
            </div>

            {/*<div className={styles.Footer}>*/}
            {/*    <div>руб./кв. м/год</div>*/}
            {/*    <div className={styles.FooterContacts}>*/}
            {/*        <span><a href={'https://www.rnbconsulting.ru/'}>https://www.rnbconsulting.ru/</a></span>*/}
            {/*        <span>+7 495 545 42 82</span>*/}
            {/*        <span>Сентябрь 2021</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
        }
    </div>
}

const formatEmpty = (val: string) => {
    if(!val){
        return '-';
    }
    if(val.toString() === '' || val.toString()==='null'){
        return "-"
    }else{
        return val.toString()
    }
}

export default Brief;