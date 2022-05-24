import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/Layout";
import {Modal, Tooltip, Typography} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import ObjectsList from "../../components/Objects/ObjectsList/ObjectsList";
import Api from "../../services/Api";
import {useRouter} from "next/router";
import BlockCard from "../../components/Blocks/BlockCard/BlockCard";
import styles from "../../components/Objects/ObjectCard/building.module.scss";
import BuildingListsSelector from "../../components/RightMenu/BuildingListsSelector";
import BlockListsSelector from "../../components/RightMenu/BlocksListsSelector";

const {Title} = Typography;

const ObjectPage = () => {
    const router = useRouter();
    const blockId = router?.query?.id


    return <MainLayout>
        <div className={styles.HeaderRow}>
            <Title>Блок #{blockId}</Title>


            <div className={styles.HeaderRowMenu}>

                <Tooltip placement="topLeft" title="Сохранить в список">
                    <a href={'#'} onClick={async () => {
                        Modal.info({
                            title: 'Выберите списки для сохранения',
                            content: <BlockListsSelector blockId={parseInt((blockId || '0').toString())}/>,
                            maskClosable: true
                        })
                    }}><PlusOutlined style={{ fontSize: '170%'}} /></a>
                </Tooltip>

            </div>
        </div>

        {blockId &&
        <BlockCard showSaveBtn={true} modelId={parseInt((blockId || 0).toString())}/>

        }

    </MainLayout>
}

export default ObjectPage