const check = (rules, action) => {
  console.log(rules);
  let permissions = rules.permissions;
  console.log(permissions);

  let op = [];
  if (!permissions) {
    // role is not present in the rules
    return { page: false, op: op };
  }

  if (permissions && permissions.includes(action)) {
    if (rules.operations) {
      op = rules.operations;
    }
    return { page: true, op: op };
  }

  return { page: false, op: op };
};

const Access = (action, flag, perm) => {
  let rul = {};
  if (perm) {
    if (perm.length !== 0) {
      let i;
      rul['permissions'] = [];
      rul['operations'] = {};
      for (i = 0; i < perm.perm.length; i++) {
        rul['permissions'].push(perm.perm[i].permission);
        rul['operations'][perm.perm[i].permission] = [];
      }
      for (i = 0; i < perm.ops.length; i++) {
        rul['operations'][perm.ops[i].permission].push(perm.ops[i].operation);
      }
      console.log(rul);
    }
  }
  if (rul.length !== 0) {
    const { page, op } = check(rul, action);
    if (flag) return { page, op };
    else return page;
  }
};

export default Access;
