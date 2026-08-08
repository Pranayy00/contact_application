const Contact = {
    type: "object",

    required: [
        "name",
        "phone",
        "email",
        "address",
        "pincode"
    ],

    properties: {
        name: {
            type: "string",
            pattern: "^[A-Za-z ]+$", 
            minLength:2,
            maxLength:50
        },

        phone: {
            type: "array",
            items:{
            type:"string",
            pattern:"^[0-9]+$",
            minLength:10,
            maxLength:15

            },
           
        },

        email: {
            type: "string",
            format: "email"
            
        },

        address: {
            type: "array",
            items:{
                type:"string"
            }
        },

        pincode:{
        type:"string",
        pattern:"^[0-9]+$",
        minLength:6,
        maxLength:6
        },

        street:{
         type:"string",
        },
        landmark:{
        type:"string",
        },
        
    },
    additionalProperties:false
};

module.exports = {Contact};