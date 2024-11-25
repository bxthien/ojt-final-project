import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useCheckout } from '../CheckoutContext';

const ContactInfo: React.FC = () => {
  const { contact, setContact } = useCheckout();
  const [isEditing, setIsEditing] = useState(false);
  const [contactInput, setContactInput] = useState(contact);

  const handleSave = () => {
    setContact(contactInput);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Contact</h3>
      {isEditing ? (
        <Form>
          <Form.Item>
            <Input
              type="text"
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
              className="w-full mb-2"
              placeholder="Enter your contact information"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="flex justify-between items-center">
          <p>{contact || 'No contact information provided.'}</p>
          <Button
            type="link"
            onClick={() => setIsEditing(true)}
            className="text-green-500 hover:underline"
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
