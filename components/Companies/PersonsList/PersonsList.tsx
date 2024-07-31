import {Button, Modal, Table} from "antd";
import PersonForm from "../PersonForm/PersonForm";
import {ICompany, IPerson} from "../../../interfaces/CompanyInterface";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

type personsListProps = {
    company: ICompany,
    persons?: IPerson[]
}
const PersonsList = ({company, persons}: personsListProps) => {
    const [personsList, setPersonsList] = useState<IPerson[]>(persons ?? [])
    const [showPersonForm, setShowPersonForm] = useState(false)
    const [personCreated, setPersonCreated] = useState<IPerson>({} as IPerson)
    const router = useRouter();
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
            dataIndex: 'firstName',
            key: 'firstName',
            render: (firstName: string, record: IPerson) => {
                return <a onClick={() => {
                    router.push(`/contacts/${record.id.toString()}`)
                }}>
                    {firstName} {record?.thirdName ?? ''} {record?.lastName ?? ''}
                </a>
            },
            sorter: (a: IPerson, b: IPerson) => {
                const aName = `${a.firstName} ${a?.thirdName} ${a?.lastName}`
                const bName = `${b.firstName} ${b?.thirdName} ${b?.lastName}`
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
            dataIndex: 'contactInfo',
            key: 'mobilePhone',
            render: (val: any) => {
                return <>{(val?.mobilePhone) ? val?.mobilePhone : '-'}</>
            },
            sorter: (a: IPerson, b: IPerson) => {
                const aPhone = a?.contactInfo?.mobilePhone ?? '';
                const bPhone = b?.contactInfo?.mobilePhone ?? '';
                return aPhone.localeCompare(bPhone);
            }
        },
        {
            title: 'Email',
            dataIndex: 'contactInfo',
            key: 'email',
            render: (val: any) => {
                return <>{(val?.email) ? val?.email : '-'}</>
            },
            sorter: (a: IPerson, b: IPerson) => {
                const aEmail = a?.contactInfo?.email ?? '';
                const bEmail = b?.contactInfo?.email ?? '';
                return aEmail.localeCompare(bEmail);
            }
        }
    ]
    return (
        <>
            <div style={{ justifyContent: 'flex-end', display: 'flex', marginBottom: 10 }}>
                <Button onClick={() => setShowPersonForm(true)} type="primary">Добавить контакт</Button>
            </div>
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