import React from 'react';

export default function useWhenResolved(value, callback) {
  React.useMemo(() => {
    value.then(callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
