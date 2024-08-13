import {Request, Response, NextFunction} from "express";
import AudioFileService from "../services/audio-file-service";
import path from "path";

class AudioFileController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const audioFile = request.file as Express.Multer.File;
            const audioFileSave = await AudioFileService.create(audioFile);
            response.status(201).json(audioFileSave);
        } catch (error) {
            next(error);
        }
    }

    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const audioFiles = await AudioFileService.getAll();
            response.status(200).json(audioFiles);
        } catch (error) {
            next(error);
        }
    }

    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const audioFile = await AudioFileService.getById(request.params.id);
            response.status(200).json(audioFile);
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const audioFile = request.files as Express.Multer.File[];
            const audioFileUpdated = await AudioFileService.update(request.params.id, audioFile[0]);
            response.status(200).json(audioFileUpdated);
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const message: string = await AudioFileService.remove(request.params.id);
            response.status(200).json(message);
        } catch (error) {
            next(error);
        }
    }

    async getToyMedia(request: Request, response: Response, next: NextFunction) {
        try {
            const {audio_file_id} = request.body;
            const audioFile = await AudioFileService.getById(audio_file_id);
            const filePath = path.resolve(audioFile.audioSrc);
            response.download(filePath, audioFile.name, (error) => {
                if (error) {
                    next(error);
                }
            });
        } catch (error) {
            next(error);
        }
    }

}

export default new AudioFileController();