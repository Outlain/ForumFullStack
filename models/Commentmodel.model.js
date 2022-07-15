const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: [true, 'Paragraph is required.'],
        },
        postType: {
            type: String,
            required: [true, 'Paragraph is required.'],
        },
    },
);

module.exports = model('Comment', commentSchema);