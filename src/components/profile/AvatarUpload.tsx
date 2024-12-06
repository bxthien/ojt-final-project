import React from 'react';
import { message } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

interface AvatarUploadProps {
  url: string;
  setUrl: (url: string) => void;
  setUploading: (uploading: boolean) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ url, setUrl, setUploading }) => {
  const { t } = useTranslation();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    axios
      .post('/upload/image', formData)
      .then((response) => {
        const imageUrl = response.data.url;
        setUrl(imageUrl);
        message.success(t('avatarUpload.success'));
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        message.error(t('avatarUpload.error'));
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <div className="flex items-center space-x-4">
      <img src={url} alt="Avatar" className="w-14 h-14 rounded-full border" />
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="cursor-pointer"
      />
    </div>
  );
};

export default AvatarUpload;
