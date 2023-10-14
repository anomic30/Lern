import { getAnalytics, getUser, submitFeedback } from "../services/user.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getUserData = catchAsync(async (req, res) => {
  try {
    const magicId = req.magicId;
    const userData = await getUser(magicId);
    return res.status(200).json({ userData });
  } catch (error) {
    console.error("❌ Error inside getUserData controller:", error);
    return res.status(500).json({ message: error });
  }
});

export const feedbackHandler = catchAsync(async (req, res) => {
  try {
    const magicId = req.magicId;
    const { rating, comment } = req.body;
    if(!rating || !comment) {
      return res.status(400).send("Rating and comment are required");
    }
    const newFeedback = await submitFeedback(magicId, rating, comment);
    return res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error("❌ Error inside feedbackHandler controller:", error);
    return res.status(500).json({ message: 'Feedback not submitted. Please try again!' });
  }
});

export const analyticsHandler = catchAsync(async (req, res) => {
  try {
    const magicId = req.magicId;
    const userAnalytics = await getAnalytics(magicId);
    return res.status(200).json(userAnalytics);
  } catch (error) {
    console.error("❌ Error inside analyticsHandler controller:", error);
    return res.status(500).json({ message: error });
  }
});