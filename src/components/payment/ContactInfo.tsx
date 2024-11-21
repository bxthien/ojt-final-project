import React, { useState } from 'react';
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
        <div>
          <input
            type="text"
            value={contactInput}
            onChange={(e) => setContactInput(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>{contact || 'No contact information provided.'}</p>
          <button onClick={() => setIsEditing(true)} className="text-green-500 hover:underline">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
