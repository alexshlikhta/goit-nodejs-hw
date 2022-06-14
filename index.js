console.clear();
const { program } = require('commander');
const contactsActions = require("./contacts");

const setActions = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactsActions.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contact = await contactsActions.getContactById(id);
      if (!contact) console.log();(`Contact => id=${id}, not found`);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsActions.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;

    case "remove":
      const delContact = await contactsActions.removeContact(id);
      if (!delContact) console.log();(`Contact whith id=${id}, not found`);
      console.log(delContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const options = program.opts();
setActions(options);
