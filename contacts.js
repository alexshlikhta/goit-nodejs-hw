const path = require("path");
const fs = require("fs/promises");
const ObjectID = require("bson-objectid");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const res = await fs.readFile(contactsPath);
  return JSON.parse(res);
};

async function getContactById(contactId) {
  const contacts = await listContacts();
  const resContact = contacts.find((el) => parseInt(el.id) === parseInt(contactId));
  if (!resContact) return null;
  return resContact;
};

async function removeContact(contactId) {
    const res = await listContacts();
    const delContactIndex = res.findIndex(
      ({ id }) => parseInt(id) === parseInt(contactId)
    );
    if (!delContactIndex) return null;
  
    const delContact = res.splice(delContactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(res));
    return delContact;
}

async function addContact(name, email, phone) {
  const contactList = await listContacts();

  if(!contactList.find((el) => el.name === name)) {
    const newContact = {
      id: ObjectID(),
      name,
      email,
      phone,
    };
    const updatedContactList = [...contactList, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
    return newContact;
  } 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
