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
import { Line, Gauge } from '@ant-design/plots';


const contentStyle = {
    height: '160px',
    color: 'black',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'white',
};
const data = [
  {
    day: '1',
    value: 3000,
  },
  {
    day: '2',
    value: 4000,
  },
  {
    day: '3',
    value: 3500,
  },
  {
    day: '4',
    value: 5000,
  },
  {
    day: '5',
    value: 4900,
  },
  {
    day: '6',
    value: 6000,
  },
  {
    day: '7',
    value: 7000,
  },
  ];
  const config = {
    data,
    color: '#e31c79 ',
    xField: 'day',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#e31c79 ',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  const configProcent = {
    percent: 0.75,
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '36px',
          color: '#4B535E',
        },
        formatter: () => '70%',
      },
      content: {
        style: {
          fontSize: '24px',
          lineHeight: '44px',
          color: '#4B535E',
        },
        formatter: () => '',
      },
    },
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
    const gridStyle = {
      width: '25%',
      textAlign: 'center',
    };

  return <MainLayout>

    <Title>Рабочий стол</Title>

    <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"

    }}>
    <Row gutter={[16, 16]} >
        <Col span={12}>
        <Card title="Активность компании" bordered={true}>
            <span style={{fontSize: 50}}>
                <Line {...config}/>
            </span> 
        </Card>
        </Col>
        <Col span={6}>
        <Card title="Актуальных объектов" bordered={true}>
            <span style={{fontSize: 50}}>
                <Gauge {...configProcent} />
            </span> 
        </Card>
        </Col>
        <Col span={6}>
        <Card title="Актуальных блоков" bordered={true}>
            <span style={{fontSize: 50}}>
                <Gauge {...configProcent}/>
            </span> 
        </Card>
        </Col>
        <Col span={20}>
        <Card title="Всего">
    {blocksCount &&
    <Card.Grid style={gridStyle}>
      Блоков<br/>
      <span style={{fontSize: 35}}>{blocksCount}</span>
      </Card.Grid>
    }
    <Card.Grid style={gridStyle}>
    Объектов<br/>
    <span style={{fontSize: 35}}>1111</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>
        Новых заявок<br/>
       <span style={{fontSize: 35}}>1111</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      Сотрудников <br/>
      <span style={{fontSize: 35}}>1111</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>
    Новых блоков за сутки<br/>
    <span style={{fontSize: 35}}>111</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>
    Новых объектов за сутки<br/>
    <span style={{fontSize: 35}}>111</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>
    Звонков<br/>
    <span style={{fontSize: 35}}>1111</span>
    </Card.Grid>
    <Card.Grid style={gridStyle}>
    Звонков за сутки<br/>
    <span style={{fontSize: 35}}>1111</span>
    </Card.Grid>
        </Card>
        </Col>
        <Col span={4}>
        <Card title="Валюта" bordered={true}>
            <Card.Grid style={{width:'100%', textAlign: 'center'}}>Доллар <br/> <span style={{fontSize: 35}}>63 р.</span></Card.Grid>
            <Card.Grid style={{width:'100%', textAlign: 'center'}}>Евро <br/><span style={{fontSize: 35}}>73 р.</span></Card.Grid> 
        </Card>
        </Col>
        <Col span={4}>
      <Card onClick={()=>{
          // socket.emit('test', "test")
      }} title="Актуализация" bordered={true} style={{ height: '280px'}}>
        <Progress type="circle" percent={70} status="success" />
        </Card>
        </Col>
        <Col>
        <Card title="Текущие задачи" bordered={true} style={{ width: '400px'}}>
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
        </Col>
     </Row>

 </div>

  </MainLayout>
}


export default DashboardPage

