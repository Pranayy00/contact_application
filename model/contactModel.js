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
            minLength:2,
            maxLength:50
        },

        phone: {
            type: "string",
            minLength:10,
            maxLength:15

        },

        email: {
            type: "string",
            format: "email"
        },

        address: {
            type: "string"
        },
        additionalProperties:false
    }
};

module.exports = {Contact};