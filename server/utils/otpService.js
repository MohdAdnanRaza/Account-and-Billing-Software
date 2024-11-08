// Importing required libraries
import otpGenerator from "otp-generator";
import twilio from "twilio"; // Assuming you're using Twilio to send OTP via SMS

// Twilio credentials (replace these with your own)
const twilioClient = twilio("TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN");
const fromPhoneNumber = "YOUR_TWILIO_PHONE_NUMBER"; // Your Twilio phone number

/**
 * Generates a 6-digit OTP (One Time Password)
 * @returns {string} - OTP string
 */
const generateOTP = () => {
  return otpGenerator.generate(6, { upperCase: false, specialChars: false });
};

/**
 * Sends an OTP to the provided phone number via SMS (using Twilio)
 * @param {string} phoneNumber - The phone number to which OTP is sent
 * @param {string} otp - The OTP to send
 * @returns {Promise} - Promise that resolves once OTP is sent
 */
const sendOtpToPhone = async (phoneNumber, otp) => {
  try {
    // Send OTP via Twilio
    const message = await twilioClient.messages.create({
      body: `Your OTP is: ${otp}`,
      from: fromPhoneNumber,
      to: phoneNumber,
    });

    console.log("OTP sent:", message.sid);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP" };
  }
};

export { generateOTP, sendOtpToPhone };
