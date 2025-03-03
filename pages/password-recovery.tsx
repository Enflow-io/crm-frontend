import React from 'react';
import { NextPage } from 'next';
import { Layout } from 'antd';
import PasswordRecovery from '../components/Login/PasswordRecovery';

const { Content } = Layout;

const PasswordRecoveryPage: NextPage = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PasswordRecovery />
      </Content>
    </Layout>
  );
};

export default PasswordRecoveryPage; 