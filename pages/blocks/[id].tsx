import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/Layout";
import {Dropdown, Modal, Tooltip, Typography} from 'antd';
import {DownloadOutlined, FilePptOutlined, PlusOutlined} from '@ant-design/icons';
import {CopyOutlined} from '@ant-design/icons';

import ObjectsList from "../../components/Objects/ObjectsList/ObjectsList";
import Api from "../../services/Api";
import {useRouter} from "next/router";
import BlockCard from "../../components/Blocks/BlockCard/BlockCard";
import styles from "../../components/Objects/ObjectCard/building.module.scss";
import BuildingListsSelector from "../../components/RightMenu/BuildingListsSelector";
import BlockListsSelector from "../../components/RightMenu/BlocksListsSelector";
import {$copyObject, OpenCreateObjectModal} from "../../effects/object";
import {openBlockCreateModal, saveBlockToCopy} from "../../effects/block.effects";

const {Title} = Typography;

const ObjectPage = () => {
    const router = useRouter();
    const blockId = router?.query?.id

    const getBrief = () => {
        open(`${Api.apiUrl}/exports/pdf-by-block/${blockId}`)
    }
    const getPP = () => {
        open(`${Api.apiUrl}/exports/pptx-by-block/${blockId}/`)
    }
    return <MainLayout>
        <div className={styles.HeaderRow}>
            <Title>Блок #{blockId}</Title>
            <div className={styles.HeaderRowMenu}>
                <Tooltip placement="topLeft" title="Скачать бриф (pdf)">
                    <a href={'#'} onClick={getBrief}
                    ><DownloadOutlined style={{ fontSize: '170%' }} /></a>
                </Tooltip>

                <Tooltip placement="topLeft" title="Скачать бриф (PowerPoint)">
                    <a href={'#'}  onClick={getPP}
                    ><FilePptOutlined style={{ fontSize: '170%' }} /></a>
                </Tooltip>
                <Tooltip placement="topLeft" title="Сохранить в список">
                    <a href={'#'} onClick={async () => {
                        Modal.info({
                            title: 'Выберите списки для сохранения',
                            content: <BlockListsSelector blockId={parseInt((blockId || '0').toString())}/>,
                            maskClosable: true
                        })
                    }}><PlusOutlined style={{ fontSize: '170%'}} /></a>
                </Tooltip>
                <Tooltip placement="topLeft" title="Копировать">
                    <a href={'#'} onClick={async () => {

                        await router.push('/blocks');
                        const block = await Api.getBlock(parseInt((blockId || 0).toString()));
                        saveBlockToCopy(block.data)
                        // OpenCreateObjectModal()
                        openBlockCreateModal()
                        // Modal.info({
                        //     title: 'Выберите списки для сохранения',
                        //     content: <BlockListsSelector blockId={parseInt((blockId || '0').toString())}/>,
                        //     maskClosable: true
                        // })
                    }}>
                    <CopyOutlined style={{ fontSize: '170%'}} /></a>
                </Tooltip>
            </div>
        </div>

        {blockId &&
        <BlockCard showSaveBtn={true} modelId={parseInt((blockId || 0).toString())}/>

        }

    </MainLayout>
}

export default ObjectPage