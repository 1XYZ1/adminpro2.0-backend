const { Schema, model } = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false

    }
});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.password = ':)'
    object.uid = _id;
    return object
})



module.exports = model('Usuario', UserSchema);