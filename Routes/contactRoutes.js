const{Contact}=require("../model/contactModel")
const{createContact,getContacts, getSingleContact, updateContact, deleteContact}=require("../controller/contactController");
const { default: fastify } = require("fastify");

//Create contact
async function contactRoutes(fastify,options){
    fastify.post("/contacts",{
        schema:{
            body:Contact
        }

    },createContact);
    
    //get all contacts
    fastify.get("/contacts",getContacts); 

    //get single contact
    fastify.get("/contacts/:id",getSingleContact)

    //update contact
    fastify.put("/contacts/:id",{
        schema:{
            body:Contact
        }
    },updateContact)

    //delete contact

    fastify.delete("/contacts/:id",deleteContact)
}



module.exports=contactRoutes;