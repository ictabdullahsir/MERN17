import { useEffect, useState } from 'react';
import { bookingApi } from '../api';
import Status from '../components/Status';

export default function Bookings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    bookingApi.mine()
      .then(r => setItems(r.data.data.bookings))
      .catch(e => setError(e.response?.data?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const cancel = async id => {
    if (confirm('Cancel this booking?')) {
      try {
        await bookingApi.cancel(id);
        load();
      } catch (e) {
        alert(e.response?.data?.message || 'Cancel failed');
      }
    }
  };

  return (
    <div className="container page">
      <span className="eyebrow">Your trips</span>
      <h1>My bookings</h1>
      <Status loading={loading} error={error}>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tour</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(b => (
                <tr key={b._id}>
                  <td>{b.tour?.title || 'Deleted tour'}</td>
                  <td>{b.numGuests}</td>
                  <td>${b.totalPrice}</td>
                  <td>
                    <span className={`status ${b.status}`}>{b.status}</span>
                  </td>
                  <td>
                    {b.status !== 'cancelled' && (
                      <button
                        className="btn small danger"
                        onClick={() => cancel(b._id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!items.length && (
            <div className="empty">
              No bookings yet. Explore the tours to get started.
            </div>
          )}
        </div>
      </Status>
    </div>
  );
}
