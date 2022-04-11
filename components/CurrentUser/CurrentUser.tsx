import React, { useState } from 'react';
import {Avatar, Button, Divider} from 'antd';

import { Drawer } from 'antd';
import * as Lockr from "lockr";
const CurrentUser: React.FC = () => {

    let user: any = 'undefined';
    try{
         user = Lockr.get('user')

    }catch (e) {
         user = undefined
    }


    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <div>
            <Avatar style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }} size="large" gap={4}>
                {user?.name.charAt(0)}
            </Avatar>
            <Button
                size="small"
                style={{ margin: '0 16px', verticalAlign: 'middle' }}
                onClick={showDrawer}
            >
                {user?.email}
            </Button>


            <Drawer title="Доп. меню" placement="right" onClose={onClose} visible={visible}>
                <p>Добрый день, {user?.name}!</p>
                <Divider/>
                <p>Здесь будет поиск</p>
                <p>А также другие вспомогательные элементы</p>
            </Drawer>

        </div>
    );
};


export default CurrentUser