const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
    {
        board: {
            type: String,
            required: [true, 'Paragraph is required.'],
        },
        postArray: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    },
);

module.exports = model('Board', boardSchema);