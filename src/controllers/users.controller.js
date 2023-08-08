
const registerUser = (req, res) => {
  res.render('sessions/register');
};

const loginUser = (req, res) => {
  res.render('sessions/login');
};
export { registerUser, loginUser };
