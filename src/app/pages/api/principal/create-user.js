import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  await connectToDatabase();

  const { email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({
    email,
    password,
    role,
  });

  await user.save();

  res.status(201).json(user);
}
