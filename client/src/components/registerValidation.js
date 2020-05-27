export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  }
  if (!values.phone_num) {
    errors.phone_num = 'Phone Number not entered';
  } else if (
    !/^\d+$/.test(values.phone_num) ||
    values.phone_num.length !== 10
  ) {
    errors.phone_num = 'Invalid Phone number';
  }
  if (!values.address) {
    errors.address = 'Enter address';
  } else if (values.address.length >= 45) {
    errors.address = 'Enter smaller address';
  }
  if (!values.name) {
    errors.name = 'Enter name';
  } else if (values.address.length >= 45) {
    errors.address = 'Enter smaller name';
  }
  return errors;
}
