import {Button, Modal, Table} from "antd";
import PersonForm from "../PersonForm/PersonForm";
import {ICompany, IPerson} from "../../../interfaces/CompanyInterface";
import {useEffect, useState} from "react";

type personsListProps = {
    company: ICompany,
    persons?: IPerson[]
}
const PersonsList = ({company, persons}: personsListProps) => {
    const [personsList, setPersonsList] = useState<IPerson[]>(persons ?? [])
    const [showPersonForm, setShowPersonForm] = useState(false)
    const [personCreated, setPersonCreated] = useState<IPerson>({} as IPerson)
    useEffect(() => {
        if (personCreated && personCreated?.id) {
            setPersonsList([...personsList, personCreated])
            setShowPersonForm(false)
            setPersonCreated({} as IPerson)
        }
    }, [personCreated])
    const cols = [
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: IPerson) => {
                return `${name} ${record?.surname ?? ''} ${record?.lastName ?? ''}`
            },
            sorter: (a: IPerson, b: IPerson) => {
                const aName = `${a.name} ${a?.surname} ${a?.lastName}`
                const bName = `${b.name} ${b?.surname} ${b?.lastName}`
                return aName.localeCompare(bName);
            }
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
            sorter: (a: IPerson, b: IPerson) => a.position.localeCompare(b.position),
        },
        {
            title: 'Телефон',
            dataIndex: 'contacts',
            key: 'mobilePhone',
            render: (val: any) => {
                console.log(val)
                return <>{(val?.mobilePhone) ? val?.mobilePhone : '-'}</>
            },
            sorter: (a: IPerson, b: IPerson) => {
                const aPhone = a?.contacts?.mobilePhone ?? '';
                const bPhone = b?.contacts?.mobilePhone ?? '';
                return aPhone.localeCompare(bPhone);
            }
        }
    ]
    return (
        <>
            <div><Button onClick={() => setShowPersonForm(true)} type="primary">Добавить сотрудника</Button></div>
            <Modal
                //@ts-ignore
                visible={showPersonForm}
                onCancel={() => setShowPersonForm(false)}
                okButtonProps={{style: {display: 'none'}}}
                cancelButtonProps={{style: {display: 'none'}}}
                key={'addPerson'}
            >
                <PersonForm company={company} isCreate setPersonCreated={setPersonCreated} />
            </Modal>
            <Table
                dataSource={personsList}
                columns={cols}
                rowKey={'id'}
                pagination={{
                    total: personsList.length,
                    //showTotal: (total, range) => range[1] > 10 && `${range[0]}-${range[1]} из ${total} сотрудников`,
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                }}
            />
        </>
    )
}
export default PersonsList