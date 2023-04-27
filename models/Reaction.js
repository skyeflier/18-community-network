const mongoose = require('mongoose');
const { Schema, Types, model } = mongoose;

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString('en-US'),
        },
    },
    //defines a getter method for this field that formats the date into a more human-readable format. Then, when you retrieve a document from the database that has a "createdAt" value, it will be automatically formatted according to your custom logic.
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

module.exports = reactionSchema;
