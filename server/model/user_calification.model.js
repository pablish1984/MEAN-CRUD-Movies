const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserCalificationSchema = new Schema({
    movie: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    personal_movie_score: { type: Number, required: true }
});

module.exports = mongoose.model('UserCalificationSchema', UserCalificationSchema);