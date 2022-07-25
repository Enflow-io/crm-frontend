import {Layout, Menu} from 'antd';
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
    SearchOutlined
} from '@ant-design/icons';
import {useState} from "react";
import Logo from "../../components/svg/Logo";
import CurrentUser from "../../components/CurrentUser/CurrentUser";
import Link from 'next/link'
import {useRouter} from "next/router";
import * as Lockr from "lockr";
import UsersService from "../../services/UsersService";
import Search from "../Search/Search";
import useUser from "../../hooks/useUser";

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
            default:
                return ['1'];
        }

    }

    return (
        <Layout>
            <Sider style={{
                height: '100vh'
            }} collapsible trigger={null} collapsed={collapsed}>
                <Logo onClick={() => {
                    router.push('/')
                }} style={{
                    cursor: "pointer",
                    margin: '0 auto',
                    display: 'block'
                }} width={collapsed ? 60 : 80} height={80}/>
                {user &&
                <Menu theme="dark" mode="inline" defaultSelectedKeys={getActiveKey()}>
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
                    <Menu.Item key="7" icon={<FileDoneOutlined/>}>

                        <Link href="/form-requests">
                            <a style={{color: "white"}}>Заявки</a>
                        </Link>
                    </Menu.Item>
                    }
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
                </Menu>}
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
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        maxHeight: 'calc(100vh - 112px)',
                        overflow: 'scroll',
                        height: 'calc(100vh - 112px)',
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout