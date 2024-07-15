import {Layout, Menu, Badge} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    HomeOutlined,
    UploadOutlined,
    SettingOutlined,
    BookOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    FileDoneOutlined,
    SearchOutlined, ClockCircleOutlined
} from '@ant-design/icons';
import {useEffect, useState} from "react";
import Logo from "../../components/svg/Logo";
import CurrentUser from "../../components/CurrentUser/CurrentUser";
import Link from 'next/link'
import {useRouter} from "next/router";
import * as Lockr from "lockr";
import UsersService from "../../services/UsersService";
import Search from "../Search/Search";
import useUser from "../../hooks/useUser";
import { UserData } from '../../effects/user';
import Api from "../../services/Api";
import {FormRequestsUpdated} from "../../effects/formRequest.effects";

const {Header, Sider, Content} = Layout;

const MainLayout = (props: any) => {


    const user = useUser();
    const router = useRouter();
    if (typeof window !== 'undefined') {
        const userData = Lockr.get('user')
        if (!userData) {
            router.push('/login')
        }
    }

    const [collapsed, setCollapsed] = useState(true);
    const [formRequestCount, setFormRequestCount] = useState(0);

    useEffect(() => {
        getCountFormRequests()
    }, [])

    useEffect(() => {
        const unwatch = FormRequestsUpdated.watch( async () => {
            getCountFormRequests();
        })

        return function cleanup() {
            unwatch()
        }
    })

    const getCountFormRequests = () => {
        Api.getCountUnreadFormRequests().then((res: any) => {
            setFormRequestCount(res)
        })
    }

    const toggle = () => setCollapsed(!collapsed);
    const getActiveKey = () => {

        if (router.route.includes("/objects")) {
            return ["2"]
        }

        if (router.route.includes("/blocks")) {
            return ["3"]
        }

        if (router.route.includes("/form-request")) {
            return ["7"]
        }

        if (router.route.includes("/users")) {
            return ["4"]
        }
        if (router.route.includes("/cian-reports")) {
            return ["9"]
        }

        switch (router.route) {
            case "/":
                return ["1"]
            case "/objects":
                return ["2"]
            case "/blocks":
                return ["3"]
            case "/users":
                return ["4"]

            case "/settings":
                return ["5"]
            case "/form-requests":
                return ["7"]
            case "/search":
                return ["8"]
            case "/cian-reports":
                return ["9"]
            default:
                return ['1'];
        }

    }

    return (
        <Layout style={{}}>
            <Sider style={{
                height: '100vh'
            }} collapsible trigger={null} collapsed={collapsed}>
                <Logo onClick={() => {
                    router.push('/')
                }} style={{
                    cursor: "pointer",
                    margin: '0 auto',
                    display: 'block'
                }}
                    // @ts-ignore
                      changeLogo={user?.email === 'relightgroup.msc@yandex.ru'}
                      width={collapsed ? 60 : 80} height={80}/>
                {user && <div>
                    <Menu style={{
                        height: 'calc(100vh - 180px)',
                        paddingBottom: 0

                    }} theme="dark" mode="inline" defaultSelectedKeys={getActiveKey()}>
                        <Menu.Item key="1" icon={<AppstoreOutlined/>}>

                            <Link href="/">
                                <a style={{color: "white"}}>Dashboard</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<SearchOutlined/>}>

                            <Link href="/search">
                                <a style={{color: "white"}}>Поиск</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<HomeOutlined/>}>

                            <Link href="/objects">
                                <a style={{color: "white"}}>Объекты</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<BookOutlined/>}>

                            <Link href="/blocks">
                                <a style={{color: "white"}}>Блоки</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined/>}>

                            <Link href="/users">
                                <a style={{color: "white"}}>Пользователи</a>
                            </Link>
                        </Menu.Item>

                        {!UsersService.isDefaultUser(user) &&

                            <Menu.Item key="7" icon={formRequestCount > 0 ? <Badge count={formRequestCount}/> : <FileDoneOutlined/>}>
                                <Link href="/form-requests">
                                    <a style={{color: "white"}}>Заявки</a>
                                </Link>
                            </Menu.Item>
                        }
                        {UsersService.canViewCianPage(user) &&
                            <Menu.Item key="9" icon={<ClockCircleOutlined />}>
                                <Link href="/cian-reports">
                                    <a style={{color: "white"}}>Отчёты ЦИАН</a>
                                </Link>
                            </Menu.Item>
                        }


                    </Menu>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={getActiveKey()}>
                        <Menu.Item key="5" icon={<SettingOutlined/>}>

                            <Link href="/settings">
                                <a style={{color: "white"}}>Настройки</a>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6" icon={<LogoutOutlined/>}>

                            <a id={'menu-item-exit'} onClick={async e => {
                                e.preventDefault();
                                await UsersService.exit(router)

                            }} style={{color: "white"}}> Выйти</a>
                        </Menu.Item>

                    </Menu>
                </div>
                }
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{
                    padding: 0,
                    display: 'flex',
                    alignContent: 'space-around',
                    flexWrap: 'nowrap',
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    {collapsed &&
                        <MenuUnfoldOutlined
                            className={'trigger'}
                            onClick={toggle}
                        />
                    }
                    {!collapsed &&
                        <MenuFoldOutlined
                            className={'trigger'}
                            onClick={toggle}
                        />
                    }

                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Search/>
                        <CurrentUser/>
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '10px 10px 0px',
                        padding: '20px 0px 0px 20px',
                        minHeight: 280,
                        maxHeight: 'calc(100vh - 90px)',
                        overflow: 'scroll',
                        height: 'calc(100vh - 90px)',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout