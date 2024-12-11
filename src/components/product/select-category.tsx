import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

interface Category {
  id: string;
  name: string;
}

interface SelectCategoryProps {
  categories: Category[];
  selectedCategories: string[];
  onCategorySelect: (categories: string[]) => void;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  categories,
  selectedCategories,
  onCategorySelect,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <Select
        mode="multiple"
        value={selectedCategories}
        onChange={onCategorySelect}
        className="w-full"
        placeholder={t('selectCategory.placeholder')}
      >
        {categories.map((category) => (
          <Option key={category.id} value={category.id}>
            {category.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectCategory;
