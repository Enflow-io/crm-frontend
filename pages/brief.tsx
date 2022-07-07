import styles from "../styles/breif.module.scss"
import jsPDF from 'jspdf'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Api from "../services/Api";
import {BuildingInterface} from "../interfaces/BuildingInterface";
import {Buffer} from "buffer";
import axios from "axios";

const Brief = () => {
    const [buildingData, setBuildingData] = useState<BuildingInterface | null>(null);

    const [pic1, setPic1] = useState('');
    const [pic2, setPic2] = useState('');

    const router = useRouter();

    const buildingId = router?.query?.buildingId;


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


    const [isVisible, setIsVisible] = useState(true)

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
                        doc.text('* руб./ м² /год', 180, 292)

                        doc.setFillColor(44, 56, 71);
                        const fotY = 293;
                        doc.rect(40, fotY, 210 - 40, 5, "F");

                        doc.setTextColor('#FFFFFF')
                        doc.setFontSize(7)

                        doc.text('https://www.rnbconsulting.ru/', 45, fotY + 3)
                        doc.text('+7 495 545 42 82', 130, fotY + 3)
                        doc.text('Сентябрь 2021', 180, fotY + 3)

                    }


                    doc.setPage(1);

                    // заголовок
                    doc.setFontSize(20)

                    const name = '233. Империя Тауэр,'
                    const width = doc.getStringUnitWidth(name)
                    doc.setFont('AkrobatBold')
                    doc.text(name, 4, 9)
                    doc.setFont('Akrobat')
                    doc.text('  класс A', 4 + width*20/(72/25.6), 9)

                    doc.setFontSize(14)
                    doc.text('Лесная ул. 5', 4, 14)


                    //список


                    // Адрес
                    const addressKey = 'Адрес:  '
                    const addressVal = 'Пресненская наб., 6 стр. 2'

                    const addressKeyWidth = doc.getStringUnitWidth(addressKey)*11/(72/23)

                    doc.setTextColor('#000000')

                    doc.setFontSize(11)
                    doc.setFont('AkrobatBold')

                    doc.setDrawColor(0,0,0);
                    doc.setFillColor(0, 0, 0)
                    doc.circle(7, 117.4, .4, 'F')
                    doc.text(addressKey, 8, 119)

                    doc.setFont('Akrobat')
                    doc.text(addressVal, 8+addressKeyWidth, 119)

                    // Административный округ
                    const districtKey = 'Административный округ:  '
                    const districtVal = 'Пресненский'


                    const lineWidth = 5;
                    const districtKeyWidth = doc.getStringUnitWidth(districtKey)*11/(72/25.6)

                    doc.setTextColor('#000000')

                    doc.setFontSize(11)
                    doc.setFont('AkrobatBold')

                    doc.setDrawColor(0,0,0);
                    doc.setFillColor(0, 0, 0)
                    doc.circle(7, 117.4 + lineWidth, .4, 'F')
                    doc.text(districtKey, 8, 119 + lineWidth)

                    doc.setFont('Akrobat')
                    doc.text(districtVal, 8+districtKeyWidth, 119 + lineWidth)


                    // Район
                    const districtSmKey = 'Район:  '
                    const districtSmVal = 'Белорусский'


                    const districtSmKeyWidth = doc.getStringUnitWidth(districtSmKey)*11/(72/25.6)

                    doc.setTextColor('#000000')

                    doc.setFontSize(11)
                    doc.setFont('AkrobatBold')

                    doc.setDrawColor(0,0,0);
                    doc.setFillColor(0, 0, 0)
                    doc.circle(7, 117.4 + lineWidth*2, .4, 'F')
                    doc.text(districtSmKey, 8, 119 + lineWidth*2)

                    doc.setFont('Akrobat')
                    doc.text(districtSmVal, 8+districtSmKeyWidth, 119 + lineWidth*2)


                    // Налоговая
                    const taxOfficeKey = 'Налоговая:  '
                    const taxOfficeVal = '25'


                    const taxOfficeWidth = doc.getStringUnitWidth(taxOfficeKey)*11/(72/25.6)

                    doc.setTextColor('#000000')

                    doc.setFontSize(11)
                    doc.setFont('AkrobatBold')

                    doc.setDrawColor(0,0,0);
                    doc.setFillColor(0, 0, 0)
                    doc.circle(7, 117.4 + lineWidth*3, .4, 'F')
                    doc.text(taxOfficeKey, 8, 119 + lineWidth*3)

                    doc.setFont('Akrobat')
                    doc.text(taxOfficeVal, 8+taxOfficeWidth, 119 + lineWidth*3)



                    // Метро


                    const metro1 = 'Белоруская'
                    const metro1dist = '  / 1 минута'
                    const metro1Width = doc.getStringUnitWidth(metro1)*20/(72/25.6)

                    const metro1y = 145
                    doc.setFontSize(20)
                    doc.setFont('AkrobatBold')
                    doc.text(metro1, 8, metro1y)
                    doc.setFont('Akrobat')
                    doc.text(metro1dist, 8+metro1Width, metro1y)



                      const metro2 = 'Маяковская'
                    const metro2dist = '  / 5 минут'
                    const metro2Width = doc.getStringUnitWidth(metro2)*20/(72/25.6)

                    const metro2y = 155
                    doc.setFontSize(20)
                    doc.setFont('AkrobatBold')
                    doc.text(metro2, 8, metro2y)
                    doc.setFont('Akrobat')
                    doc.text(metro2dist, 8+metro2Width, metro2y)






                    const promise = doc.save(buildingData?.name || 'brief', {returnPromise: true});
                    setTimeout(() => {
                        // close()

                    }, 1000)
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
                margin: [0, 0, 10, 0],

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
                         src={'http://static.maps.2gis.com/1.0?center=37.586877,55.777783&zoom=13&size=300,200&&markers=pmgns,37.586877,55.777783'}/>

                </div>

                <div style={{
                    marginTop: 0
                }} className={styles.Divider}/>

                <div className={styles.Info}>
                    <div>

                        <label className={styles.Label} style={{
                            fontSize: 20,

                        }}>Общее описание</label>
                        <ul className={styles.List}>
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
                    </div>
                    <div>
                        <label style={{
                            paddingLeft: 0,
                            fontSize: 20,
                        }} className={styles.Label}>Технические характеристики</label>

                        <ul style={{
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
                    </div>

                </div>

                <div className={styles.Divider}/>

                <div className={styles.Blocks}>
                    <label className={styles.Label}><strong style={{
                        fontSize: 20,
                    }}>Свободные площади и коммерческие условия</strong></label>

                    <table className={styles.Table}>
                        <tr>
                            <th>Этаж</th>
                            <th>Площадь</th>
                            <th>Доступно</th>
                            <th>Отделка</th>
                            <th>Базовая ставка*</th>
                            <th>OPEX*</th>
                            <th>НДС</th>
                            <th>Полная ставка*</th>
                        </tr>

                        {
                            Array.from({length: 20}, (v, k) => k + 1).map((i, index) => {
                                return <tr key={index}>
                                    <td>10</td>
                                    <td>1 343</td>
                                    <td>Сейчас</td>
                                    <td>С отделкой</td>
                                    <td>42 000</td>
                                    <td>8 500</td>
                                    <td>Не вкл</td>
                                    <td>52 200</td>
                                </tr>
                            })
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

export default Brief;