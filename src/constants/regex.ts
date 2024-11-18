export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/;

export const emailValidator = (_rule: unknown, value: string) => {
  if (!value) {
    return Promise.reject('Please input your email!');
  }
  if (!emailRegex.test(value)) {
    return Promise.reject('Please input a valid email!');
  }
  return Promise.resolve();
};

export const passwordValidator = (_rule: unknown, value: string) => {
  if (!value) {
    return Promise.reject('Please input your password!');
  }
  if (!passwordRegex.test(value)) {
    return Promise.reject(
      'Password must be at least 8 characters long and contain both letters and numbers!'
    );
  }
  return Promise.resolve();
};

export const phoneValidator = (_: unknown, value: string) => {
  const phoneRegEx = /^[0-9]*$/;
  if (!value || phoneRegEx.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Phone numbers can only be entered as numbers!');
};
