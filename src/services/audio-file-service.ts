import fs from "fs";
import path from "path";
import ApiError from "../exceptions/api-error";
import AudioFileModel from "../models/audio-file-model";
import ScenarioModel from "../models/scenario-model";

class AudioFileService {
    async create(audioFile: Express.Multer.File) {
        const { originalname: name, path: audioSrc } = audioFile;
 --all
        const audioFileDB = new AudioFileModel({
            name,
            audioSrc
        });

        await audioFileDB.save();
        return audioFileDB;
    }

    async getAll() {
        const audioFiles = await AudioFileModel.find();
        if (!audioFiles.length) {
            throw ApiError.BadRequest(`No audio files found.`);
        }
        return audioFiles;
    }

    async getById(id: string) {
        const audioFile = await AudioFileModel.findById(id);
        if (!audioFile) {
            throw ApiError.BadRequest(`Audio file with id ${id} not found.`);
        }
        return audioFile;
    }

    async update(id: string, audioFile: Express.Multer.File) {
        const { originalname: name, path: audioSrc } = audioFile;

        const update = {
            name,
            audioSrc
        };

        const audioFileDB = await AudioFileModel.findOneAndUpdate(
            { _id: id },
            { $set: update },
            { new: true }
        );
        return audioFileDB;
    }

    async remove(id: string) {
        // Find the audio file entry in the database
        const audioFile = await AudioFileModel.findById(id);
        if (!audioFile) {
            throw ApiError.BadRequest(`Audio file with id ${id} not found.`);
        }

        // Delete references to this audio file from the ScenarioModel
        await ScenarioModel.updateMany(
            { audio_file_ids: id },
            { $pull: { audio_file_ids: id } }
        );

        // Delete the file from the file system
        const filePath = path.resolve(audioFile.audioSrc);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file ${filePath}: ${err.message}`);
            }
        });

        // Remove the audio file entry from the database
        const result = await AudioFileModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw ApiError.BadRequest(`Audio file with id ${id} not found.`);
        }

        return "Audio file is deleted";
    }
}

export default new AudioFileService();
