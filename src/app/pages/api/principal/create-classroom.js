import connectToDatabase from '../../../lib/mongodb';
import Classroom from '../../../models/Classroom';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  await connectToDatabase();

  const { name, startTime, endTime, days, teacherEmail } = req.body;

  const teacher = await User.findOne({ email: teacherEmail, role: 'teacher' });

  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' });
  }

  const classroom = new Classroom({
    name,
    startTime,
    endTime,
    days,
    teacher: teacher._id,
  });

  await classroom.save();

  res.status(201).json(classroom);
}

