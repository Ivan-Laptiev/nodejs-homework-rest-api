const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
//  try {
        const data = await fs.readFile(contactsPath, "utf8");
        const contacts= JSON.parse(data);  
        return contacts;        
      }


const getContactById = async (contactId) => {
    const contacts= await listContacts();
    const result = contacts.find(({id})=> id === contactId);
    return result || null;  
}

const removeContact = async (contactId) => {  
        const contacts= await listContacts();
        const index = contacts.findIndex((item)=> item.id === contactId);
        if (index === -1) {
          return null;
        }
        const [result] = contacts.splice(index, 1);        
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return result;
        
         
        
}

const addContact = async ({name, email, phone}) => {
  const newContact = { id: nanoid(), name, email, phone};
    const contacts = await listContacts();   
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    return newContact; 
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if(index === -1){
    return null;
  }  
  contacts[index] = {id: contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}