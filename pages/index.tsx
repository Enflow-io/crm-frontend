import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import Login from "../components/Login/Login";
import MainLayout from "../components/Layout/Layout";
import ObjectsList from "../components/Objects/ObjectsList/ObjectsList";
import {Card, notification, Typography, Row, Col} from "antd";
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

const DashboardPage = ()=>{


    const [buildingsCount, setBuildingsCount] = useState<any[] | null>(null);
    const [blocksCount, setBlocksCount] = useState<any[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( ()=>{

        const getBuildings = async ()=>{
            if(buildingsCount === null){
                const res = await Api.get('/buildings')
                if(res?.data?.data){
                    setBuildingsCount(res?.data.total)

                }
            }
        }
        const getBlocks = async ()=>{
            if(buildingsCount === null){
                const res = await Api.get('/blocks?limit=1')
                if(res?.data?.data){
                    setBlocksCount(res?.data.total)

                }
            }
        }

        getBuildings();
        getBlocks();



    });


  return <MainLayout>

    <Title>Рабочий стол</Title>

    

    <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"

    }}>
    <Row gutter={[16, 16]} >
      <Card onClick={()=>{
          // socket.emit('test', "test")
      }} title="Актуализация" bordered={true} style={{ width: '180px', marginRight: '2em' }}>
        <Progress type="circle" percent={70} status="success" />

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



        {blocksCount &&
        <Card title="Количетсво сотрудников" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card title="Количетсво новых заявок" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card  title="Количетсво новых объектов за сутки" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card title="Количетсво новых блоков за сутки" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card title="Количетсво новых звонков за сутки" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card title="Курс доллара" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card title="Актуальных объектов" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card title="Актуальных блоков" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card title="Активность компании" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
        </Card>
        }
        {blocksCount &&
        <Card title="Количество звонков" bordered={true} style={{width: '250px', marginRight: '2em'}}>
            <span style={{fontSize: 50}}>{blocksCount}</span> 
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
     </Row>


    </div>

  </MainLayout>
}


export default DashboardPage

