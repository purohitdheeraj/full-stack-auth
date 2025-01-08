import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
  try {
    // create hased token for email verification
    const hashedToken = await bcrypt.hash(userId.toString(), 10)

    if(emailType === "VERIFY"){
      await User.findByIdAndUpdate(userId, {
        verifyEmailToken: hashedToken,
        verifyEmailExpire: Date.now() + 10 * 60 * 1000
      })
    }

    if(emailType === "FORGOT"){
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpire: Date.now() + 10 * 60 * 1000
      })
    }

    // send email using smtp service like nodemailer

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "39e13ae9758db8",
        pass: "064161f84de678"
      }
    });
      
    
    const mailOptions = {
      from : 'purohitdheeraj89@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password',
      html: `<p>Click this <a href="${process.env.domain}/verifyEmail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify' : 'reset'} your password</p>
            <p>${process.env.domain}/verifyEmail?token=${hashedToken}</p>`
      }
    
    const mailResponse = await transporter.sendMail(mailOptions);

    console.log(mailResponse);
    
    return mailResponse;

  } catch (error:any) {
    throw new Error(error.message);
  }
}