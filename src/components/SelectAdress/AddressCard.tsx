const AddressCard = ({
  address = { title: '', type: '', address: '', phone: '' },
  isSelected = false,
  onSelect = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <div
      style={{
        border: isSelected ? '2px solid #4CAF50' : '1px solid #ddd',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Address Details */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h4 style={{ margin: '0 0 5px', fontSize: '18px', fontWeight: 'bold' }}>
          {address.title}{' '}
          <span
            style={{
              padding: '4px 8px',
              backgroundColor: 'black',
              borderRadius: '4px',
              fontSize: '12px',
              color: 'white',
            }}
          >
            {address.type}
          </span>
        </h4>
        <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>{address.address}</p>
        <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>{address.phone}</p>
      </div>

      {/* Radio Button */}
      <input
        type="radio"
        checked={isSelected}
        onChange={onSelect}
        style={{ marginRight: '20px', cursor: 'pointer', width: '18px', height: '18px' }}
      />

      {/* Edit/Delete Icons */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={onEdit}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px',
            fontSize: '16px',
          }}
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'red',
            fontSize: '16px',
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
