interface CategoryFilterProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  const categories = ['All', 'Phone', 'Laptop', 'Tablet']; // Danh sách các category (có thể lấy từ API)

  return (
    <div className="flex space-x-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategorySelect(category === 'All' ? '' : category)} // '' là để không lọc nếu chọn "All"
          className={`px-4 py-2 rounded-lg text-sm ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
