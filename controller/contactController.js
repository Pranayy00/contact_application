const { ObjectId } = require("mongodb");

// Delete contact
const deleteContact = async (req, reply) => {
    try {

        const { id } = req.params;

        // Check ID exists
        if (!id) {
            return reply.code(400).send({
                success: false,
                message: "Please provide Id"
            });
        }

        // Check valid MongoDB ObjectId
        if (!ObjectId.isValid(id)) {
            return reply.code(400).send({
                success: false,
                message: "Invalid contact ID"
            });
        }

        const result = await req.server.mongo.db
            .collection("contact")
            .deleteOne({
                _id: new ObjectId(id)
            });

        // Contact doesn't exist
        if (result.deletedCount === 0) {
            return reply.code(404).send({
                success: false,
                message: "Contact not found"
            });
        }

        return reply.code(200).send({
            success: true,
            message: "Contact deleted successfully"
        });

    } catch (error) {

        console.log(error);

        return reply.code(500).send({
            success: false,
            message: "Error in delete Contact API",
            error: error.message
        });
    }
};


//update contact
const updateContact=async(req,reply)=>{
    try {
        const{id}=req.params
        const{name,email,phone,address}=req.body
        if (!id) {
            return reply.code(404).send({
                sucess:false,
                message:"please provide id"
            })
            
        }
           if (!ObjectId.isValid(id)) {
            return reply.code(400).send({
                sucess:false,
                message:"Invalid Contact id"
            })
            
        }
         
        const result=await req.server.mongo.db.collection("contact").updateOne({
            _id:new ObjectId(id)
        },{
            $set:{
                name,
                email,
                phone,
                address

            }
        });

        if (result.matchedCount===0) {
            return reply.code(404).send({
                success:false,
                message:"no contact found"
            });
            
        }

        return reply.code(200).send({
            success:true,
            message:"Contact updated sucessfully",
            Contact:result
            
        })

        
    } catch (error) {
        console.log(error);
        return reply.code(500).send({
            success:false,
            message:"Error in update Contact API",
            error:error.message
        })
        
        
    }
}

// get single Contact
const getSingleContact=async(req,reply)=>{
    try {
        const{id}=req.params
        if (!id) {
            return reply.code(404).send({
                success:false,
                message:"please Provide id"
            })
            
        }

           if (!ObjectId.isValid(id)) {
            return reply.code(400).send({
                sucess:false,
                message:"Invalid Contact id"
            })
            
        }

        const contact=await req.server.mongo.db.collection("contact").findOne({
            _id:new ObjectId(id)
        })

        if (!contact) {
            return reply.code(404).send({
                success:false,
                message:"Contact Not Found"
            })
            
        }

        return reply.code(200).send({
            sucess:true,
            message:"record found",
            contact
        })

    } catch (error) {
        console.log(error);
        return reply.code(500).send({
            sucess:false,
            message:"Error In get single contact API",
            error:error.message
        })
        
        
    }

}


//get all contacts
const getContacts=async(req,reply)=>{
    const contacts= await req.server.mongo.db.collection("contact").find({}).toArray();
    if (contacts.length===0) {
        return reply.code(404).send({
            success:false,
            message:"no records found",
            

        })
        
    }

 return reply.code(200).send({
    sucess:true,
    message:"Contacts found",
    contacts
 })
}


//post contact
const createContact=async(req,reply)=>{
    try {
        const{name,email,phone,address}=req.body

        //check if user already exits
       const existingUser=await req.server.mongo.db.collection("contact").findOne({email})
       if (existingUser) {
        return reply.code(409).send({
            sucess:false,
            message:"User already exists"
        })
        
       }

        const contact={name,email,phone,address}

        const result=await req.server.mongo.db.collection("contact").insertOne(contact)
         
        return reply.code(200).send({
            message:"Contact inserted SuccessFully",
           contactId:result.insertedId
        })
    } catch (error) {
        return reply.code(500).send({
            message:"Error in create contact API",
            error:error.message

        })
        
    }
}

//exports controllers
module.exports={createContact,getContacts,getSingleContact,updateContact,deleteContact}
