const { Schema, model } = require('mongoose');


const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },

});

UserSchema.method('toJSON', function() {
    const { __V, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model( 'User', UserSchema );
