import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  await connectToDatabase();

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.status(200).json({ token });
}

