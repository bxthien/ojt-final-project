import { Steps, Card, Typography, Input, Checkbox, Button, Divider, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;
const { Title, Text } = Typography;

const PaymentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Steps */}
        <Steps current={2} className="mb-10">
          <Step title="Address" />
          <Step title="Shipping" />
          <Step title="Payment" />
        </Steps>

        {/* Layout for Summary and Payment */}
        <Row gutter={24}>
          {/* Summary Section */}
          <Col xs={24} lg={12}>
            <Card
              title="Summary"
              bordered
              className="shadow-md"
              bodyStyle={{ padding: '24px 16px' }}
            >
              {/* Items */}
              <div className="mb-4">
                {[
                  { name: 'Apple iPhone 14 Pro Max 128Gb', price: 1399 },
                  { name: 'AirPods Max Silver', price: 549 },
                  { name: 'Apple Watch Series 9 GPS 41mm', price: 399 },
                ].map((item, idx) => (
                  <Row justify="space-between" key={idx} className="mb-2">
                    <Col>{item.name}</Col>
                    <Col>${item.price}</Col>
                  </Row>
                ))}
              </div>

              {/* Address and Shipment Method */}
              <Divider />
              <div className="mb-4">
                <Title level={5}>Address</Title>
                <Text>1131 Dusty Townline, Jacksonville, TX 40322</Text>
              </div>
              <div>
                <Title level={5}>Shipment Method</Title>
                <Text>Free</Text>
              </div>

              {/* Subtotals */}
              <Divider />
              <Row justify="space-between" className="mb-2">
                <Col>Subtotal</Col>
                <Col>$2347</Col>
              </Row>
              <Row justify="space-between" className="mb-2">
                <Col>Estimated Tax</Col>
                <Col>$50</Col>
              </Row>
              <Row justify="space-between" className="mb-2">
                <Col>Estimated shipping & Handling</Col>
                <Col>$29</Col>
              </Row>
              <Divider />
              <Row justify="space-between">
                <Col>
                  <Title level={5}>Total</Title>
                </Col>
                <Col>
                  <Title level={5}>$2426</Title>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Payment Section */}
          <Col xs={24} lg={12}>
            <Card
              title="Payment"
              bordered
              className="shadow-md"
              bodyStyle={{ padding: '24px 16px' }}
            >
              {/* Payment Tabs */}
              <div className="mb-6">
                <Button type="link" className="font-bold text-[#000000]">
                  Credit Card
                </Button>
                <Button type="link" className="font-bold text-[rgb(0,0,0)]">
                  PayPal
                </Button>
                <Button type="link" className="font-bold text-[#000000]">
                  PayPal Credit
                </Button>
              </div>

              {/* Credit Card Form */}
              <div className="text-center mb-4">
                <img
                  src="src/assets/images/image65.png"
                  alt="Credit Card"
                  className="mb-5 rounded-lg max-w-full"
                />
              </div>
              <Input placeholder="Cardholder Name" className="mb-4" />
              <Input placeholder="Card Number" className="mb-4" />
              <Row gutter={16} className="mb-4">
                <Col span={12}>
                  <Input placeholder="Exp.Date" />
                </Col>
                <Col span={12}>
                  <Input placeholder="CVV" />
                </Col>
              </Row>
              <Checkbox className="mb-5">Same as billing address</Checkbox>

              {/* Navigation Buttons */}
              <Row justify="end" gutter={16}>
                <Col>
                  <Button onClick={() => navigate(-1)}>Back</Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => alert('Payment Successful!')}
                    className="bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
                  >
                    Pay
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentPage;
