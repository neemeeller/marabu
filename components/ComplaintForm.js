import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { ErrorMessage } from './FormComponents/ErrorMessage';
import { Input } from './FormComponents/Input';
import { Notification } from './FormComponents/Notification';
import { RadioInput } from './FormComponents/RadioInput';
import { Select } from './FormComponents/Select';

const WEBHOOK_URL = 'https://eoqlx6owqca2m22.m.pipedream.net';

const ComplaintForm = ({ closeForm }) => {
  const { t, i18n } = useTranslation('complaintForm');
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formSentRef = useRef(null);
  const getSelectOptions = () =>
    i18n?.language === 'de'
      ? [
          { name: 'Herr', label: 'Herr' },
          { name: 'Frau', label: 'Frau' },
        ]
      : [
          { name: 'Mr.', label: 'Mr.' },
          { name: 'Ms.', label: 'Ms.' },
          { name: 'Mrs.', label: 'Mrs.' },
        ];

  useEffect(() => {
    const fetchAirports = async () => {
      const response = await fetch(`/data/airport_codes.json`);
      const newData = await response.json();
      if (!newData) return;

      const airportData = newData.map(({ code, de, en }) => ({
        name: code,
        label: i18n?.language === 'de' ? de : en,
      }));
      setAirports(airportData);
    };
    fetchAirports();
  }, [i18n]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = async data => {
    setLoading(true);
    const formData = new FormData();

    data.documents &&
      Array.from(data.documents).forEach((file, i) => {
        if (i >= 6) return;
        formData.append(`file${i + 1}`, file);
      });

    formData.append('data', JSON.stringify(data));
    const result = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    setFormSent(true);
    setLoading(false);
    if (!result.ok) {
      setSubmitSuccess(false);
    } else {
      setSubmitSuccess(true);
    }
    formSentRef?.current?.scrollIntoView();

    return setTimeout(() => {
      if (result.ok) {
        closeForm();
      }
      setSubmitSuccess(false);
      setFormSent(false);
    }, 5000);
  };

  const validateFile = files => {
    const allowedExtensions = ['png', 'jpg', 'txt', 'odf', 'doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png', 'tif'];
    files &&
      Array.from(files).forEach(value => {
        const fileExtension = value.name.split('.').pop();

        if (!allowedExtensions.includes(fileExtension)) {
          return t('validFileFormat');
        }
      });

    return true;
  };

  const renderRadioButtons = group => {
    const radios =
      i18n.language === 'de'
        ? [
            'Gepäck',
            'Änderung der Flugzeiten',
            'Downgrade',
            'Zusatzleistungen',
            'Flugverspätung',
            'Flugannullierung',
            'Meine Flugbuchung',
            'Überbuchung/Nichtbeförderung',
            'Lob & Dank',
            'Sonstiges',
          ]
        : [
            'Baggage',
            'Change of flight times',
            'Downgrade',
            'Extra services',
            'Flight delay',
            'Flight cancellation',
            'My flight booking',
            'Overbooking/ Denied Boarding',
            'Appreciation',
            'Others',
          ];
    return radios.map(name => (
      <RadioInput key={name} label={name} value={name} register={register} required group={group} />
    ));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>{t('section1.title')}</h2>
        <span className="block text-xs font-medium mb-2">{t('section1.description')}</span>
        <div className="grid">
          <Select
            error={errors.selectTitle}
            id="selectTitle"
            label={t('section1.selectTitle')}
            options={getSelectOptions()}
            register={register}
            small
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            error={errors.firstName}
            id="firstName"
            label={t('section1.firstName')}
            message={t('section1.likeOriginalBooking')}
            register={register}
            required
          />
          <Input
            error={errors.lastName}
            id="lastName"
            label={t('section1.lastName')}
            message={t('section1.likeOriginalBooking')}
            register={register}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label={t('section1.street')} id="street" register={register} required error={errors.street} />
          <Input
            error={errors.houseNumber}
            id="houseNumber"
            label={t('section1.houseNumber')}
            register={register}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label={t('section1.postcode')} id="postcode" register={register} required error={errors.postcode} />
          <Input label={t('section1.city')} id="city" register={register} required error={errors.city} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label={t('section1.country')} id="country" register={register} required error={errors.country} />
        </div>
        <div className="grid">
          <Input
            error={errors.email}
            id="email"
            label={t('section1.email')}
            pattern={{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('section1.invalidEmail'),
            }}
            register={register}
            required
          />
        </div>
      </div>
      <div>
        <h2>{t('section2.title')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Select
            id="departureAirport"
            label={t('section2.departureAirport')}
            options={airports}
            error={errors.departureAirport}
            register={register}
            fullWidth
            required
          />
          <Select
            id="destinationAirport"
            label={t('section2.destinationAirport')}
            options={airports}
            error={errors.destinationAirport}
            register={register}
            fullWidth
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            error={errors.departureDate}
            id="departureDate"
            label={t('section2.departureDate')}
            message={t('section2.dateDescription')}
            register={register}
            type="date"
            required
          />
          <Input
            label={t('section2.title')}
            id="flightNumber"
            register={register}
            required
            error={errors.flightNumber}
            pattern={{
              value: /^[0-9]+$/i,
              message: t('section2.onlyNumbers'),
            }}
            message={t('section2.flightDescription')}
          />
        </div>
        <div className="grid gap-4">
          <Input
            error={errors.bookingNumber}
            id="bookingNumber"
            label={t('section2.bookingNumber')}
            message={t('section2.bookingNumberDescription')}
            register={register}
            pattern={{
              value: /^[A-Za-z0-9]+$/i,
              message: t('section2.onlyNumbersAndLetters'),
            }}
            required
          />
        </div>
      </div>
      <div>
        <h2>{t('section3.title')}</h2>
        <span className="block text-xs font-medium mb-2">{t('section3.description')}</span>
        <div className="grid gap-4">
          {renderRadioButtons('concern')}
          <ErrorMessage {...{ label: t('section3.errorMessage'), error: errors.concern }} />
        </div>
      </div>
      <div>
        <h2>{t('section4.title')}</h2>
        <div className="grid">
          <div className="mb-4">
            <label className="block text-sm font-medium">{t('section4.description')} *</label>
            <textarea
              {...register('message', { required: true })}
              className={`border rounded-sm px-2 py-1 w-full ${!!errors.message ? 'text-red-800' : ''}`}
            ></textarea>
            <ErrorMessage {...{ label: t('section4.errorMessage'), error: errors.message }} />
          </div>
        </div>
      </div>
      <div>
        <h2>{t('section5.title')}</h2>
        <span className="block text-xs font-medium mb-2">{t('section5.description')}</span>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t('section5.accountHolderFirstName')}
            id="accountHolderFirstName"
            register={register}
            error={errors.accountHolderFirstName}
          />
          <Input
            label={t('section5.accountHolderLastName')}
            id="accountHolderLastName"
            register={register}
            error={errors.accountHolderLastName}
          />
        </div>
        <div className="grid">
          <Input
            label={t('section5.accountHolderCountry')}
            id="accountHolderCountry"
            register={register}
            error={errors.accountHolderCountry}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label={t('section5.iban')} id="iban" register={register} error={errors.iban} />
          <Input label={t('section5.bic')} id="bic" register={register} error={errors.bic} />
        </div>
      </div>
      <div>
        <h2>{t('section6.title')}</h2>
        <span className="block text-xs font-medium mb-2">{t('section6.description')}</span>
        <div className="grid gap-4 mb-4">
          <div className="mb-4">
            <div label="documents" error={errors.documents}>
              <Controller
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                control={control}
                id="documents"
                multiple
                name={'documents'}
                rules={{ validate: validateFile }}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <input
                      {...field}
                      value={value?.fileName}
                      onChange={event => {
                        onChange(event.target.files);
                      }}
                      type="file"
                      id="documents"
                      multiple
                    />
                  );
                }}
              />
            </div>
            <ErrorMessage {...{ error: errors.documents }} />
          </div>
        </div>
      </div>
      <div>
        <div className="grid gap-4 mb-4">
          <RadioInput
            group="personalDataConsent"
            id="personalDataConsent"
            label={t('section7.personalDataConsent')}
            register={register}
            required
          />
          <ErrorMessage {...{ label: t('section7.errorMessage'), error: errors.personalDataConsent }} />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange transition-all py-4 px-6"
          disabled={loading || formSent}
        >
          {loading ? t('loading') : t('submit')}
        </button>
      </div>
      {formSent ? (
        <div className="mt-5" ref={formSentRef}>
          {submitSuccess ? (
            <Notification type={'success'} message={t('emailSentSuccess')} />
          ) : (
            <Notification type={'success'} message={t('emailSentError')} />
          )}
        </div>
      ) : null}
    </form>
  );
};

export default ComplaintForm;
