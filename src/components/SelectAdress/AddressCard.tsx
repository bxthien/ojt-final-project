const AddressCard = ({
  address = { title: '', type: '', address: '', phone: '' },
  isSelected = false,
  onSelect = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <div
      className={`p-5 rounded-lg mb-4 flex justify-between items-center shadow-md ${
        isSelected ? 'border-2 border-green-500' : 'border border-gray-300'
      }`}
    >
      {/* Address Details */}
      <div className="flex-1 mr-5">
        <h4 className="text-lg font-bold mb-1">
          {address.title}{' '}
          <span className="px-2 py-1 bg-black text-white rounded text-xs">{address.type}</span>
        </h4>
        <p className="text-sm text-gray-600 mb-1">{address.address}</p>
        <p className="text-sm text-gray-600">{address.phone}</p>
      </div>

      {/* Radio Button */}
      <input
        type="radio"
        checked={isSelected}
        onChange={onSelect}
        className="mr-5 cursor-pointer w-4 h-4"
      />

      {/* Edit/Delete Icons */}
      <div className="flex items-center">
        <button
          onClick={onEdit}
          className="mr-2 text-lg cursor-pointer hover:text-blue-500"
          aria-label="Edit"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="text-lg cursor-pointer text-red-500 hover:text-red-600"
          aria-label="Delete"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
