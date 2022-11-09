import React from "react";
import { Col, Modal, Row, Form, Input, Button } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import { ModelCreditCard } from "models";
import Cleave from "cleave.js/react";
function ModalLogin(props: any) {
  const { isVisible, onChange, onSubmit } = props;
  const handleOk = () => {
    onChange({ target: { visible: false } });
  };
  const handleCancel = () => {
    onChange({ target: { visible: false, isDone: false } });
  };
  const [form] = Form.useForm();
  let initialValues = {
    cardNumber: "",
    lastName: "",
  };

  const onFinish = (values: any) => {
    onSubmit(values);
    handleOk();
  };
  const handleClick = () => {
    form.submit();
  };
  const handleCloseModal = () => {
    form.resetFields();
  };
  return (
    <div id="modalcustomerAddNew">
      <Modal
        open={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <Row gutter={16} style={{ justifyContent: "center" }}>
            <Col>
              <Button size="large" key="button" onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button size="large" type="primary" onClick={handleClick}>
                Submit
              </Button>
            </Col>
          </Row>
        }
        width={480}
        title={<h2 className="text-center">Login</h2>}
        forceRender={true}
        destroyOnClose={true}
        afterClose={handleCloseModal}
      >
        <div className="inner-modal">
          <div className="setting-content">
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              initialValues={initialValues}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: "Please input email " }]}
                    label="Email"
                    labelCol={{ span: 24 }}
                  >
                    <Input size="large" className="full-width" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="Password"
                    rules={[
                      { required: true, message: "Please input password " },
                    ]}
                    label="Password"
                    labelCol={{ span: 24 }}
                  >
                    <Input
                      type="password"
                      size="large"
                      className="full-width"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalLogin;
