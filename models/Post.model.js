const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
        paragraph: {
            type: String,
            trim: true,
            required: [true, 'Paragraph is required.'],
        },
        board: {
            type: String,
            required: [true, 'Paragraph is required.'],
        },
        currentUser: {
            type: String,
            required: [true, 'User is required.'],
        },
        CommentArray: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    },
);

module.exports = model('Post', postSchema);