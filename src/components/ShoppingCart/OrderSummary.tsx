import { Card, Row, Col, Typography, Button, Input } from 'antd';

const { Text, Title } = Typography;

const OrderSummary = ({ subtotal = 0, tax = 0, shipping = 0, total = 0 }) => {
  return (
    <Card
      bordered={false}
      className="border border-gray-200 rounded-lg p-6 max-w-md mx-auto shadow-md"
    >
      {/* Title */}
      <Title level={4} className="mb-4 text-center">
        Order Summary
      </Title>

      {/* Discount Input */}
      <Input placeholder="Discount code / Promo code" className="mb-4 rounded-lg" />

      {/* Bonus Card Input */}
      <Row gutter={8} className="mb-4">
        <Col flex="auto">
          <Input placeholder="Your bonus card number" className="rounded-lg" />
        </Col>
        <Col>
          <Button type="primary" className="bg-green-500 hover:bg-green-600 border-none rounded-lg">
            Apply
          </Button>
        </Col>
      </Row>

      {/* Summary */}
      <Row justify="space-between" className="mb-2">
        <Text>Subtotal:</Text>
        <Text>${subtotal.toFixed(2)}</Text>
      </Row>
      <Row justify="space-between" className="mb-2">
        <Text>Estimated Tax:</Text>
        <Text>${tax.toFixed(2)}</Text>
      </Row>
      <Row justify="space-between" className="mb-6">
        <Text>Estimated shipping & Handling:</Text>
        <Text>${shipping.toFixed(2)}</Text>
      </Row>

      {/* Total */}
      <Row justify="space-between" className="font-bold mb-6">
        <Text>Total:</Text>
        <Text>${total.toFixed(2)}</Text>
      </Row>

      {/* Checkout Button */}
      <Button
        type="primary"
        block
        className="bg-green-500 hover:bg-green-600 border-none rounded-lg h-12"
      >
        Checkout
      </Button>
    </Card>
  );
};

export default OrderSummary;
