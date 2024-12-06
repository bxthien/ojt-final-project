import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <div className="text-3xl font-semibold">{t('notFound.title')}</div>
        <div className="text-lg">{t('notFound.description')}</div>
        <img
          src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-cartoon-style-cute-style-construction-worker-cartoon-construction-worker-png-image_3946320.jpg"
          alt={t('notFound.altText')}
          className="mt-5 w-32 h-32"
        />
      </div>
    </div>
  );
};

export default NotFound;
