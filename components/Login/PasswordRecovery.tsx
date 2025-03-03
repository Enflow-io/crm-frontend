import React from 'react';
import { Form, Input, Button, message } from 'antd';
import styles from './PasswordRecovery.module.scss';
import Api from '../../services/Api';
import { useRouter } from 'next/router';

interface PasswordRecoveryFormData {
  email: string;
}

const PasswordRecovery: React.FC = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const [form] = Form.useForm<PasswordRecoveryFormData>();
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  React.useEffect(() => {
    if (token) {
      handleTokenVerification(token);
    }
  }, [token]);

  const handleTokenVerification = async (resetToken: string) => {
    setLoading(true);
    try {
      const response = await Api.resetPassword(resetToken);
      setSuccessMessage(response.message || 'Пароль успешно сброшен');
      message.success(successMessage);
      setIsSuccess(true);
    } catch (error: unknown) {
      console.log(error);
      message.error((error as Error)?.message || 'Произошла ошибка при сбросе пароля');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: PasswordRecoveryFormData) => {
    setLoading(true);
    try {
      await Api.sendPasswordRecoveryEmail(values.email);
      setSuccessMessage('Инструкции по восстановлению пароля отправлены на ваш email');
      message.success(successMessage);
      setIsSuccess(true);
    } catch (error) {
      message.error('Произошла ошибка при отправке запроса');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Готово!</h1>
        <p className={styles.successMessage}>{successMessage}</p>
      </div>
    );
  }

  if (token) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Проверка токена</h1>
        <p className={styles.message}>Пожалуйста, подождите...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        className={styles.form}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите email',
            },
            {
              type: 'email',
              message: 'Пожалуйста, введите корректный email',
            },
          ]}
        >
          <Input
            type="email"
            placeholder="Введите ваш email"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading} disabled={loading}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PasswordRecovery; 