export default function validate(values) {
  let errors = {};

  if (!values.item_select) {
    errors.item_select = "Select Item";
  }
  if (!values.price) {
    errors.item_select = "Enter Price";
  } else if (!/^\d+$/.test(values.price)) {
    errors.phone_num = "Invalid price";
  }
  return errors;
}
