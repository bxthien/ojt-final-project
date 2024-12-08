import { useState, useEffect } from 'react';
import { Radio } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface BrandFilterProps {
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

interface Category {
  id: string;
  name: string;
}

const BrandFilter = ({ selectedBrand, onBrandSelect }: BrandFilterProps) => {
  const { t } = useTranslation();
  const [branches, setBranches] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { data: response } = await axios.get(
          'https://409e-113-160-225-96.ngrok-free.app/branches',
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'Access-Control-Allow-Origin': '*',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );

        if (Array.isArray(response.data)) {
          setBranches(response.data);
        }
        setLoading(false);
      } catch {
        setError(t('filters.brand.error'));
        setLoading(false);
      }
    };

    fetchBranches();
  }, [t]);

  return (
    <div className="space-y-2">
      {loading ? (
        <p className="text-gray-500">{t('filters.brand.loading')}</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : branches.length ? (
        <Radio.Group
          value={selectedBrand}
          onChange={(e) => onBrandSelect(e.target.value)}
          className="w-full"
        >
          {branches.map((branch) => (
            <Radio key={branch.id} value={branch.id} className="w-full mb-2 text-sm text-gray-600">
              {branch.name}
            </Radio>
          ))}
        </Radio.Group>
      ) : (
        <p className="text-gray-500">{t('filters.brand.noOptions')}</p>
      )}
    </div>
  );
};

export default BrandFilter;
