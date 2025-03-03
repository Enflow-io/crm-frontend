import React from 'react';
import { NextPage } from 'next';
import { Layout } from 'antd';
import PasswordRecovery from '../components/Login/PasswordRecovery';
import { NextPageWithLayout } from './_app';

const { Content } = Layout;

const PasswordRecoveryPage: NextPageWithLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PasswordRecovery />
      </Content>
    </Layout>
  );
};

PasswordRecoveryPage.public = true

export default PasswordRecoveryPage; 