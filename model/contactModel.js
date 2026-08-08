const Contact = {
    type: "object",

    required: [
        "name",
        "phone",
        "email"
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
        additionalProperties:false
    }
};

module.exports = {Contact};