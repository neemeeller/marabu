import { useTranslation } from 'next-i18next';

export const ErrorMessage = ({ label, error }) => {
  const { t } = useTranslation('common');
  return (
    <div>
      {error?.type === 'required' && label ? (
        <span className="text-sm text-red-800">{`${label}${t('error.required')}`}</span>
      ) : (
        ''
      )}
      {error?.message ? <span className="text-sm text-red-800">{error?.message}</span> : ''}
    </div>
  );
};
