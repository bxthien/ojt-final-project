import { useState, useEffect } from 'react';
import { Radio } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface MemoryFilterProps {
  selectedMemory: string;
  onMemorySelect: (memory: string) => void;
}

interface MemoryOption {
  id: string;
  name: string;
}

const MemoryFilter = ({ selectedMemory, onMemorySelect }: MemoryFilterProps) => {
  const { t } = useTranslation();
  const [memoryOptions, setMemoryOptions] = useState<MemoryOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemoryOptions = async () => {
      try {
        const { data: response } = await axios.get('https://be-final-project-bddr.onrender.com', {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': 'true',
          },
        });
        if (Array.isArray(response.data)) {
          setMemoryOptions(response.data);
        }
        setLoading(false);
      } catch {
        setError(t('filters.memory.error'));
        setLoading(false);
      }
    };
    fetchMemoryOptions();
  }, [t]);

  return (
    <div className="flex flex-col space-y-2">
      {loading ? (
        <p className="text-gray-500">{t('filters.memory.loading')}</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : memoryOptions.length ? (
        <Radio.Group
          value={selectedMemory}
          onChange={(e) => onMemorySelect(e.target.value)}
          className="flex flex-col space-y-2"
        >
          {memoryOptions.map((option) => (
            <Radio key={option.id} value={option.id}>
              <span className="text-sm text-gray-600">{option.name}</span>
            </Radio>
          ))}
        </Radio.Group>
      ) : (
        <p className="text-gray-500">{t('filters.memory.noOptions')}</p>
      )}
    </div>
  );
};

export default MemoryFilter;
