export const Notification = ({ type, message }) => {
  switch (type) {
    case 'success':
      return (
        <div className="p-4 mb-4 text-sm text-cloud rounded-md border border-success bg-coal" role="alert">
          <span className="font-bold">{message}</span>
        </div>
      );
    case 'error':
      return (
        <div className="p-4 mb-4 text-sm text-cloud rounded-md border border-warning bg-coal" role="alert">
          <span className="font-bold">{message}</span>
        </div>
      );
    default:
      return null;
  }
};
