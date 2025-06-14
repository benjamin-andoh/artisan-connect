exports.getVerificationEmail = (username, token) => {
  const link = `http://localhost:5173/verify-email?token=${token}`;
  return {
    subject: 'Verify Your Email',
    html: `
      <h3>Hello ${username},</h3>
      <p>Thanks for registering. Please verify your email by clicking the link below:</p>
      <a href="${link}">Verify Email</a>
    `,
  };
};
