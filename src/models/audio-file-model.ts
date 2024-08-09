import {Schema, model} from "mongoose";

const AudioFileModel = new Schema({
    name: {
        type: String,
        required: true
    },
    audioSrc: {
        type: String,
        required: true
    }
});

export default model("Audio_file", AudioFileModel);