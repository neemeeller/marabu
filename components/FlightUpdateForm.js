import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import PhoneInput from 'react-phone-input-2';
import { ErrorMessage } from './FormComponents/ErrorMessage';
import { Input } from './FormComponents/Input';
import { Notification } from './FormComponents/Notification';
import { RadioInput } from './FormComponents/RadioInput';
import { Select } from './FormComponents/Select';
import { postData } from './api/helper';

import 'react-phone-input-2/lib/style.css';

const WEBHOOK_URL = 'https://eons8c22uunpb5u.m.pipedream.net';

const FlightUpdateForm = () => {
  const { t, i18n } = useTranslation(['flightUpdateForm']);
  const [flightNumbers, setFlightNumbers] = useState([]);
  const [flightSchedule, setFlightSchedule] = useState([]);

  const [formSent, setFormSent] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    const fetchFlightSchedule = async () => {
      const response = await fetch(`https://apps.marabu.ee/schedule/est.json`);
      const newData = await response.json();
      if (!newData) return;

      const flightSchedule = newData?.Data?.ScheduleList || [];
      const flightNumbers = [...new Set(flightSchedule.map(d => d.FlightNumber).sort())];

      setFlightSchedule(flightSchedule);
      setFlightNumbers([...new Set(flightNumbers)]);
    };

    fetchFlightSchedule();
  }, [i18n]);

  const onSubmit = async data => {
    const formData = {...data, mobilePhone: `+${data.mobilePhone}`};
    const result = await postData('/api/update', formData);
    console.log('Result from local api', result);

    setFormSent(true);
    if (!result?.ok) {
      setSubmitSuccess(false);
    } else {
      setSubmitSuccess(true);
    }

    return setTimeout(() => {
      setSubmitSuccess(false);
      setFormSent(false);
    }, 5000);
  };

  const handleFlightNumberUpdate = () => {
    const fieldValues = getValues();
    const { ScheduledDepartureAirport, ScheduledArrivalAirport } = flightSchedule.find(
      ({ FlightNumber }) => FlightNumber == fieldValues.flightNumber
    );
    setValue('routing', `${ScheduledDepartureAirport}-${ScheduledArrivalAirport}`);
  };

  return (
    <div className="overflow-auto">
      <div className="w-full py-20">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="p-5">
            <div className="grid gap-2">
              <div>
                <Input
                  error={errors.flightDate}
                  id="flightDate"
                  label={t('flightDate')}
                  register={register}
                  type="date"
                  required
                />
              </div>
              <div>
                <Select
                  id="flightNumber"
                  label={t('flightNumber')}
                  options={flightNumbers.map(n => ({ key: n, name: n, label: n }))}
                  error={errors.flightNumber}
                  register={register}
                  required
                  onChange={handleFlightNumberUpdate}
                />
              </div>
              <div>
                <Input error={errors.routing} id="routing" label={t('routing')} register={register} required disabled />
              </div>
              <div>
                <Input
                  error={errors.contactPerson}
                  id="contactPerson"
                  label={t('contactPerson')}
                  register={register}
                  required
                />
              </div>
              <div>
                <Controller
                  name="mobilePhone"
                  control={control}
                  render={({ field: { onChange, value, error } }) => (
                    <div className="mb-4">
                      <label className="block text-sm font-medium">{`${t('mobilePhone')} *`}</label>
                      <PhoneInput
                        id="mobilePhone"
                        country={'de'}
                        value={value}
                        onChange={onChange}
                        register={{
                          ...register('mobilePhone', {
                            required: true,
                            pattern: {
                              value: /[0-9]+/,
                              message: 'This input is number only.',
                            },
                            minLength: {
                              value: 11,
                              message: 'Please input proper number.',
                            },
                          }),
                        }}
                      />
                      <ErrorMessage {...{ label: t('mobilePhone'), error: errors.mobilePhone }} />
                    </div>
                  )}
                />
              </div>
              <div>
                <Input
                  error={errors.email}
                  id="email"
                  label={t('email')}
                  pattern={{
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }}
                  register={register}
                  required
                />
              </div>
              <div>
                <div className="grid gap-4 mb-4">
                  <RadioInput
                    group="personalDataConsent"
                    id="personalDataConsent"
                    label={t('personalDataConsent')}
                    register={register}
                    required
                  />
                  <ErrorMessage {...{ label: t('errorMessage'), error: errors.personalDataConsent }} />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-orange border-orange border text-cloud uppercase font-extrabold text-sm text-center tracking-widest inline-block hover:bg-cloud hover:text-orange transition-all py-4 px-6"
              >
                {t('Submit')}
              </button>
            </div>
          </form>
          {formSent ? (
            <div className="mt-5 px-5">
              {submitSuccess ? (
                <Notification type={'success'} message={t('emailSentSuccess')} />
              ) : (
                <Notification type={'success'} message={t('emailSentError')} />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FlightUpdateForm;
