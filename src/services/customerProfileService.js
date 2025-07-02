const { CustomerProfile, User } = require('../models');

exports.createCustomer = async (data) => {
  return await CustomerProfile.create(data);
};

exports.getAllCustomers = async () => {
  return await CustomerProfile.findAll({
    include: [{ model: User, attributes: ['username', 'email'] }],
  });
};

exports.getCustomerById = async (id) => {
  const customer = await CustomerProfile.findByPk(id, {
    include: [{ model: User, attributes: ['username', 'email'] }],
  });
  if (!customer) throw new Error('Customer not found');
  return customer;
};

exports.updateCustomer = async (id, data) => {
    // console.log("in the customer service layer")
  const customer = await CustomerProfile.findOne({ where: { userId: id } });
  if (!customer) throw new Error('Customer not found');
  return await customer.update(data);
};

exports.deleteCustomer = async (id) => {
  const customer = await CustomerProfile.findByPk(id);
  if (!customer) throw new Error('Customer not found');
  await customer.destroy();
  return { message: 'Customer deleted successfully' };
};
