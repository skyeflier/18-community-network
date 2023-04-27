const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');
const { Schema, model } = mongoose;

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],
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

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
