import React from "react";
import { Col, Modal, Row, Form, Input, Button } from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import { ModelCreditCard } from "models";
import Cleave from "cleave.js/react";
function ModalPaymentCreditCard(props: any) {
  const { isVisible, onChange, onSubmit } = props;
  const handleOk = () => {
    onChange({ target: { visible: false } });
  };
  const handleCancel = () => {
    onChange({ target: { visible: false, isDone: false } });
  };
  const [form] = Form.useForm();
  let initialValues: ModelCreditCard = {
    cardNumber: "",
    lastName: "",
    firstName: "",
    cardExpirationDate: "",
    cardCode: "",
    zip: "",
    address: "",
    city: "",
  };

  const onFinish = (values: any) => {
    const arrDate = values.cardExpirationDate.split("/");
    const myValue = {
      ...values,
      cardExpirationDate: arrDate[1].substring(2, 4) + arrDate[0].toString(),
      cardNumber: values.cardNumber.replaceAll(" ", ""),
    };
    onSubmit(myValue);
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
                Next
              </Button>
            </Col>
          </Row>
        }
        width={480}
        title={
          <>
            <h2 className="text-center">A new card</h2>
            <div style={{ color: "green" }} className="text-center">
              <SafetyCertificateOutlined />{" "}
              <small>Covered by VLINKGROUP payment protection</small>
            </div>
          </>
        }
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
              <Form.Item
                name="cardNumber"
                rules={[
                  { required: true, message: "Please input cardNumber " },
                ]}
                label="Credit Card Number"
                labelCol={{ span: 24 }}
              >
                <Cleave
                  className="ant-input ant-input-lg"
                  placeholder="Enter your credit card number"
                  options={{
                    delimiter: " ",
                    blocks: [4, 4, 4, 4],
                  }}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    rules={[
                      { required: true, message: "Please input Last Name " },
                    ]}
                    label="Last Name"
                    labelCol={{ span: 24 }}
                  >
                    <Input size="large" className="full-width" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      { required: true, message: "Please input Frist Name " },
                    ]}
                    label="Frist Name"
                    labelCol={{ span: 24 }}
                  >
                    <Input size="large" className="full-width" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="city"
                rules={[{ required: true, message: "Please input City " }]}
                label="City"
                labelCol={{ span: 24 }}
              >
                <Input size="large" className="full-width" />
              </Form.Item>
              <Form.Item
                name="cardExpirationDate"
                rules={[
                  { required: true, message: "Please input Expiration Date " },
                ]}
                label="Expiration Date(MM/YYYY)"
                labelCol={{ span: 24 }}
              >
                <Cleave
                  className="ant-input ant-input-lg"
                  options={{
                    date: true,
                    datePattern: ["m", "Y"],
                  }}
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cardCode"
                    rules={[{ required: true, message: "Please input CVV " }]}
                    label="CVV"
                    labelCol={{ span: 24 }}
                  >
                    <Input size="large" className="full-width" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="zip"
                    rules={[
                      { required: true, message: "Please input Zip Code " },
                    ]}
                    label="Zip/Postal Code"
                    labelCol={{ span: 24 }}
                  >
                    <Input size="large" className="full-width" />
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

export default ModalPaymentCreditCard;
