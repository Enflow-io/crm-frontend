import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import Login from "../components/Login/Login";
import MainLayout from "../components/Layout/Layout";
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import {Card, notification, Typography} from "antd";
const { Title } = Typography;
import { Progress } from 'antd';
import { Carousel } from 'antd';
import Api from "../services/Api";
import useSocket from "../hooks/useSocket";

const contentStyle = {
    height: '160px',
    color: 'black',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'white',
};

type PercentStatus = "success" | "normal" | "active" | "exception"
const DashboardPage = ()=>{


    const [buildingsCount, setBuildingsCount] = useState<any[] | null>(null);
    const [blocksCount, setBlocksCount] = useState<any[] | null>(null);
    const [actualPercent, setActualPercent] = useState(70);
    const [actualPercentStatus, setActualPercentStatus] = useState<PercentStatus>('success');
    const [isLoading, setIsLoading] = useState(false);

    useEffect( ()=>{

        const getBuildings = async ()=>{
            if(buildingsCount === null){
                const res = await Api.get('/buildings/stats')
                if(res?.data?.buildingsCount || res?.data?.blocksCount){
                    setBuildingsCount(res?.data?.buildingsCount ?? 0)
                    setBlocksCount(res?.data?.blocksCount ?? 0)
                    setActualPercent(res?.data?.actualPercent ?? 70)

                    if (+res?.data?.actualPercent >= 70) {
                        setActualPercentStatus('success')
                    } else if(+res?.data?.actualPercent >= 20 && res?.data?.actualPercent < 70){
                        setActualPercentStatus('normal')
                    } else if(+res?.data?.actualPercent < 20){
                        setActualPercentStatus('exception')
                    }
                }
            }
        }

        getBuildings();
    });


  return <MainLayout>

    <Title>Рабочий стол</Title>

    <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"

    }}>
      <Card onClick={()=>{
          // socket.emit('test', "test")
      }} title="Актуализация" bordered={true} style={{ width: '180px', marginRight: '2em' }}>
        <Progress type="circle" percent={actualPercent} status={actualPercentStatus} />

      </Card>




        {buildingsCount &&
        <Card title="Всего объектов" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{buildingsCount}</span> объектов
        </Card>
        }

        {blocksCount &&
        <Card title="Всего блоков" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> блоков
        </Card>
        }


     {/*<Card title="Обновлено за сегодня" bordered={true} style={{ width: '250px', marginRight: '2em' }}>*/}
     {/*    <span style={{fontSize: 50}}>10</span> объектов*/}
     {/*</Card>*/}


     <Card title="Актуальные задачи" bordered={true} style={{ width: '400px', marginRight: '2em' }}>
         <Carousel autoplay>
             <div>
                 <p style={{
                     height: '160px',
                     color: 'black',
                     lineHeight: '160px',
                     textAlign: 'center',
                     background: 'white',
                 }}>Перезвонить клиенту &quot;RNB Consulting&quot; в 15:00</p>
             </div>
             <div>
                 <p style={{
                     height: '160px',
                     color: 'black',
                     lineHeight: '160px',
                     textAlign: 'center',
                     background: 'white',
                 }}>Внести актуальные документы по договору</p>
             </div>
             <div>
                 <p style={{
                     height: '160px',
                     color: 'black',
                     lineHeight: '160px',
                     textAlign: 'center',
                     background: 'white',
                 }}>Онлайн встреча с разработчиками в 18:00</p>
             </div>
         </Carousel>
     </Card>



    </div>

  </MainLayout>
}


export default DashboardPage

