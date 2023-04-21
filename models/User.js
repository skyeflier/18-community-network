const { Schema, model } = require('mongoose');
// const XXSchema = require('./XXAssignment');
// const user = await User.findById(userId).populate('friends');

const userSchema = new User(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (value) {
                    return this.confirmEmail === value;
                },
                message: 'Emails do not match'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        toJSON: {
            virtual: true
        }
    }
)

// Below defines a virtual for friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;