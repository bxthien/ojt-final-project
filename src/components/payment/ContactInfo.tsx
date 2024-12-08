import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useCheckout } from '../CheckoutContext';
import { useTranslation } from 'react-i18next';

const ContactInfo: React.FC = () => {
  const { t } = useTranslation();
  const { contact, setContact } = useCheckout();
  const [isEditing, setIsEditing] = useState(false);
  const [contactInput, setContactInput] = useState(contact);

  const handleSave = () => {
    setContact(contactInput);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">{t('contactInfo.contact')}</h3>
      {isEditing ? (
        <Form>
          <Form.Item>
            <Input
              type="text"
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
              className="w-full mb-2"
              placeholder={t('contactInfo.enterContact')}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSave} className="bg-green-500 hover:bg-green-600">
              {t('contactInfo.save')}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="flex justify-between items-center">
          <p>{contact || t('contactInfo.noContact')}</p>
          <Button
            type="link"
            onClick={() => setIsEditing(true)}
            className="text-green-500 hover:underline"
          >
            {t('contactInfo.edit')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
