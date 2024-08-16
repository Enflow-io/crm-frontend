import MainLayout from "../components/Layout/Layout";
import React, {useEffect, useRef, useState} from "react";
import Api from "../services/Api";
import Title from "../components/Layout/Title";
import {
    Button,
    Input,
    Modal,
    notification,
    Popconfirm,
    PopconfirmProps,
    Space,
    Spin,
    Table,
} from "antd";
import type { TableColumnType } from 'antd';
import {ICompany} from "../interfaces/CompanyInterface";
import {useRouter} from "next/router";
import {MinusOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import CompanyForm from "../components/Companies/CompanyForm/CompanyForm";
import {FilterDropdownProps} from "antd/es/table/interface";

type DataIndex = keyof ICompany;

const CompaniesPage = () => {
    const [companies, setCompanies] = useState<ICompany[]>([])
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
    const [companyToDelete, setCompanyToDelete] = useState<number | null>(null)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<any>(null);
    const router = useRouter();

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void, confirm: FilterDropdownProps['confirm']) => {
        clearFilters();
        setSearchText('');
        confirm();
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<ICompany> => ({
        // @ts-ignore
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters, confirm)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value: any, record: any) => {
            if (dataIndex === 'contactInfo') {
                return record[dataIndex]?.phone[0] ? record[dataIndex]?.phone[0].toString().includes((value as string).toLowerCase()) : false
            } else if (dataIndex === 'responsible') {
                const name = record[dataIndex]?.firstName + ' ' + record[dataIndex]?.lastName
                return name ? name.toString().toLowerCase().includes((value as string).toLowerCase()) : false
            }
            const req = record[dataIndex] ? record[dataIndex].toString() : null
            return req ? req
                .toLowerCase()
                .includes((value as string).toLowerCase()) : false
        },
        // @ts-ignore
        onFilterDropdownOpenChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const pushToCompany = (id: number) => {
        router.push(`/companies/${id}`)
    }
    useEffect(() => {
        Api.getCompaniesList().then(data => {
            setCompanies(data)
            setIsDataLoading(false)
        })
    }, [isDataLoading])

    const showCreateModal = () => {
        setIsOpenCreateModal(true)
    }

    const confirmDelete: PopconfirmProps['onConfirm'] = (e) => {
        if (!companyToDelete) return;
        Api.removeCompany(companyToDelete).then(() => {
            setCompanyToDelete(null)
            setCompanies([...companies.filter((item: ICompany) => item.id !== companyToDelete)])
            notification.success({message: 'Компания удалена'})
        })
    };
    const columns = [
        {
            dataIndex: 'id',
            title: 'ID',
            sorter: (a: ICompany, b: ICompany) => a.id - b.id,
            render: (val: number) => 'F' + val,
        },
        {
            dataIndex: 'name',
            title: 'Название',
            sorter: (a: ICompany, b: ICompany) => a.name.localeCompare(b.name),
            render: (val: string, record: ICompany) => <a onClick={() => pushToCompany(record.id)}>{val}</a>,
            ...getColumnSearchProps('name'),
        },
        {
            dataIndex: 'address',
            title: 'Адрес',
            sorter: (a: ICompany, b: ICompany) => {
                const aAddress = a?.address ?? '';
                const bAddress = b?.address ?? '';
                return aAddress.localeCompare(bAddress);
            },
            ...getColumnSearchProps('address'),
        },
        {
           dataIndex: 'contactInfo',
           title: 'Телефон',
            sorter: (a: ICompany, b: ICompany) => {
                const aPhone = a?.contactInfo?.phone && a?.contactInfo?.phone[0] ? a?.contactInfo?.phone[0] : '';
                const bPhone = b?.contactInfo?.phone && b?.contactInfo?.phone[0] ? b?.contactInfo?.phone[0] : '';
                return aPhone.localeCompare(bPhone);
            },
            render: (val: any) => {
                return <>{(val?.phone && val?.phone.length > 0) ? val.phone[0] : '-'}</>
            },
            ...getColumnSearchProps('contactInfo'),
        },
        {
            dataIndex: 'isClient',
            title: 'Клиент',
            sorter: (a: ICompany, b: ICompany) => (a.isClient ? 1 : 0) - (b.isClient ? 1 : 0),
            render: (val: any) => {
                return <>{val ? "✅" : "🚫"}</>
            },
        },
        {
            dataIndex: 'responsible',
            title: 'Ответственный',
            sorter: (a: ICompany, b: ICompany) => {
                const aName = a.responsible?.name + ' ' + a.responsible?.lastName;
                const bName = b.responsible?.name + ' ' + b.responsible?.lastName;
                return aName.localeCompare(bName);
            },
            render: (val: any) => {
                return <>{val?.name} {val?.lastName}</>
            },
            ...getColumnSearchProps('responsible'),
        },
        {
            title: 'Действия',
            render: (val: any, record: ICompany) => {
                return <Popconfirm
                    title="Удалить компанию?"
                    onConfirm={confirmDelete}
                    okText="Да"
                    cancelText="Нет"
                    key={record.id}
                >
                    <Button danger key={'delete' + record.id} onClick={() => setCompanyToDelete(record.id)} icon={<MinusOutlined />} />
                </Popconfirm>
            },
        },
    ]
    return <MainLayout>
        <Title title="Компании"/>
        <Button icon={<PlusOutlined/>} onClick={showCreateModal}>Добавить компанию</Button>
        <Table
            dataSource={companies}
            columns={columns}
            loading={{indicator: <div><Spin /></div>, spinning: isDataLoading}}
            rowKey={'id'}
            // onRow={(record) => {
            //     return {
            //         onClick: event => {
            //             console.log(event);
            //             //pushToCompany(record.id)
            //         },
            //     };
            // }}
        />
        <Modal
            //@ts-ignore
            visible={isOpenCreateModal}
            onCancel={() => setIsOpenCreateModal(false)}
            okButtonProps={{disabled: true, style: {display: 'none'}}}
            //onOk={() => setIsOpenCreateModal(false)}
        >
            <CompanyForm company={{} as ICompany} setCompany={{}} setIsOpenCreateModal={setIsOpenCreateModal} setIsDataLoading = {setIsDataLoading} isCreate></CompanyForm>
        </Modal>
    </MainLayout>
}
export default CompaniesPage