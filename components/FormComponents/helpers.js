import { format, addHours, addMinutes } from 'date-fns';

export const formatDate = (dateTime, output = 'dd.MM.yyyy HH:mm') => {
  return format(dateTime, output);
};

export const getLocalTime = (dateTime, offset) => {
  const [hours, minutes] = offset.split(':');
  const d = addHours(new Date(dateTime), hours);
  return addMinutes(d, minutes);
};
