import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/principal/classrooms', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClassrooms(data);
      } catch (error) {
        console.error('Failed to fetch classrooms:', error);
      }
    };

    fetchClassrooms();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Principal Dashboard</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Days</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom._id}>
              <td className="border px-4 py-2">{classroom.name}</td>
              <td className="border px-4 py-2">{classroom.startTime}</td>
              <td className="border px-4 py-2">{classroom.endTime}</td>
              <td className="border px-4 py-2">{classroom.days.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
