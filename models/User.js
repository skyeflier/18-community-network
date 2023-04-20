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
        }
    },
    {
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
        confirmEmail: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        }
    },
    {
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'Friends',
        }
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;