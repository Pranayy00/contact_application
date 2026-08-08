const Contact = {
    type: "object",

    required: [
        "name",
        "phone",
        "email",
        "addresses"
    ],

    properties: {

        name: {
            type: "string",
            pattern: "^[A-Za-z ]+$",
            minLength: 2,
            maxLength: 50
        },

        phone: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[0-9]+$",
                minLength: 10,
                maxLength: 15
            }
        },

        email: {
            type: "string",
            format: "email"
        },

        addresses: {
            type: "array",
            items: {
                type: "object",

                required: [
                    "addressLine",
                    "pincode"
                ],

                properties: {

                    addressLine: {
                        type: "string"
                    },

                    pincode: {
                        type: "string",
                        pattern: "^[0-9]+$",
                        minLength: 6,
                        maxLength: 6
                    },

                    landmark: {
                        type: "string"
                    },

                    street: {
                        type: "string"
                    }
                },

                additionalProperties: false
            }
        }
    },

    additionalProperties: false
};

module.exports = { Contact };