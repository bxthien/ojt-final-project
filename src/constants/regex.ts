export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
import { Rule } from 'antd/es/form';

export const emailValidator = (_rule: unknown, value: string) => {
  if (!value) {
    return Promise.reject();
  }
  if (!emailRegex.test(value)) {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const passwordValidator = (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject();
  }
  if (!passwordRegex.test(value)) {
    return Promise.reject();
  }
  return Promise.resolve();
};

export const phoneValidator = (_: unknown, value: string) => {
  const phoneRegEx = /^[0-9]*$/;
  if (!value || phoneRegEx.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject();
};
