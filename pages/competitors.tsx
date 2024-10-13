import MainLayout from "../components/Layout/Layout";
import Title from "../components/Layout/Title";
import React, {useEffect, useState} from "react";
import Api from "../services/Api";
import {ICompetitor, IOffer} from "../interfaces/Competitors";
import {Button, Modal, Select, Spin} from "antd";
import OffersTable from "../components/Competitors/OffersTable/OffersTable";
import CompetitorForm from "../components/Competitors/CompetitorForm/CompetitorForm";
import {PlusOutlined} from "@ant-design/icons";

const CompetitorsPage = () => {
    const [competitors, setCompetitors] = useState<ICompetitor[]>([]);
    const [competitorId, setCompetitorId] = useState<number | null>(null);
    const [isSaleOffers, setIsSaleOffers] = useState(false);
    const [offers, setOffers] = useState<IOffer[]>([]);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
    const [attachCompetitor, setAttachCompetitor] = useState<any>(null)
    const showCreateModal = () => {
        setIsOpenCreateModal(true)
    }
    useEffect(() =>{
        if (competitors.length === 0) {
            Api.getCompetitors().then(res => setCompetitors(res))
            setIsOpenCreateModal(false)
        }
    }, [competitors])

    useEffect(() => {
        if (competitorId) {
            Api.getCompetitorOffers(competitorId, isSaleOffers).then(res => setOffers(res))
        }
    }, [competitorId, isSaleOffers])

    useEffect(() => {
        if (attachCompetitor) {
            setCompetitors([...competitors, attachCompetitor])
        }
    }, [attachCompetitor])
    return <MainLayout>
        <Title title="Конкуренты" />
        {competitors.length === 0 && <Spin />}
        {competitors.length > 0 && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                <Select
                    options={competitors.map((c) => {return {label: c.name, value: c.cianId}})}
                    style={{width: '300px'}}
                    placeholder={'Выберите конкурента'}
                    // @ts-ignore
                    onChange={(value) => setCompetitorId(value)}
                />
                <Select
                    // @ts-ignore
                    defaultValue={false}
                    // @ts-ignore
                    onChange={(value) => setIsSaleOffers(value)}
                    style={{width: '150px'}}
                >
                    {/*// @ts-ignore*/}
                    <Select.Option value={false}>Аренда</Select.Option>
                    {/*// @ts-ignore*/}
                    <Select.Option value={true}>Продажа</Select.Option>
                </Select>
            </div>
            <Button type={'ghost'} style={{marginRight: '20px'}} icon={<PlusOutlined/>} onClick={showCreateModal}>Добавить конкурента</Button>
        </div>}
        {offers.length > 0 && <OffersTable offers={offers} />}

        <Modal
            //@ts-ignore
            visible={isOpenCreateModal}
            onCancel={() => setIsOpenCreateModal(false)}
            okButtonProps={{disabled: true, style: {display: 'none'}}}
            cancelButtonProps={{disabled: true, style: {display: 'none'}}}
        >
            <CompetitorForm setAttachCompetitor={setAttachCompetitor}/>
        </Modal>
    </MainLayout>
}
export default CompetitorsPage