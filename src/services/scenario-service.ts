import ApiError from "../exeptions/api-error";
import PublisherModel from "../models/publisher-model";
import ScenarioModel from "../models/scenario-model";
import {IPublisher} from "../shared/interfaces/publisher-interfaces";
import AudioFileModel from "../models/audio-file-model";

class ScenarioService {
    async create(name: string, audioFiles: Express.Multer.File[], publisherId: string) {

        const audioFileIds: string[] = [];
        for (const file of audioFiles) {
            const audioFile = new AudioFileModel({
                name: file.originalname,
                audioSrc: file.path
            });
            await audioFile.save();
            audioFileIds.push(audioFile._id.toString());
        }

        const scenario = new ScenarioModel({
            audio_file_ids: audioFileIds,
            personage_obj_state_ids: [],
            name
        });

        const publisher = await PublisherModel.findById(publisherId);
        if (!publisher) {
            throw ApiError.BadRequest(`Publisher with id ${publisherId} not found.`);
        }

        publisher.scenario_ids.push(scenario._id);
        await scenario.save();
        await publisher.save();
        return scenario;
    }

    async getAll() {
        const publishers: IPublisher[] = await PublisherModel.find();
        if (!publishers) {
            throw ApiError.BadRequest(`Publishers not found.`);
        }
        return publishers;
    }

    async getById(id: string) {
        const publisher = await PublisherModel.findById(id);
        if (!publisher) {
            throw ApiError.BadRequest(`Publisher with id ${id} not found.`);
        }
        return publisher;
    }

    async update(id: string, update: IPublisher) {
        const publisher = await PublisherModel.findOneAndUpdate(
            {_id: id},
            {set: update},
            {new: true}
        );
        if (!publisher) {
            throw ApiError.BadRequest(`Publishers not found.`);
        }
        return publisher;
    }

    async remove(id: string) {
        const publisher = await PublisherModel.deleteOne({_id: id});
        if (!publisher) {
            throw ApiError.BadRequest(`Publisher with id ${id} not found.`);
        }
        return "Publisher is delete";
    }
}

export default new ScenarioService();