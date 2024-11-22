import { Rule } from 'antd/es/form';
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const emailValidator = (_rule: unknown, value: string) => {
  if (!value || value.trim() === '') {
    return Promise.reject(new Error(''));
  }
  value = value.trim();
  if (!emailRegex.test(value)) {
    return Promise.reject(new Error(''));
  }
  const domainPart = value.split('@')[1];
  const domainParts = domainPart.split('.');
  if (domainParts.some((part) => part.trim() === '') || domainParts.length > 3) {
    return Promise.reject(new Error(''));
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
