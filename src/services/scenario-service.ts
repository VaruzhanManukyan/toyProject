import ApiError from "../exceptions/api-error";
import PublisherModel from "../models/publisher-model";
import ScenarioModel from "../models/scenario-model";
import {IScenario} from "../shared/interfaces/scenario-interfaces";
import AudioFileModel from "../models/audio-file-model";
import ToyModel from "../models/toy-model";
import ToyTypeModel from "../models/toy-type-model";

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
        const scenarios = await ScenarioModel.find().populate('audio_file_ids');
        return scenarios;
    }

    async getById(id: string) {
        const scenario = await ScenarioModel.findById(id).populate('audio_file_ids');
        if (!scenario) {
            throw ApiError.BadRequest(`Scenario with id ${id} not found.`);
        }
        return scenario;
    }

    async update(id: string, name?: string, audioFiles?: Express.Multer.File[]) {
        const updateData: Partial<IScenario> = {};

        if (name) {
            updateData.name = name;
        }

        if (audioFiles && audioFiles.length > 0) {
            const audioFileIds: string[] = [];
            for (const file of audioFiles) {
                const audioFile = new AudioFileModel({
                    name: file.originalname,
                    audioSrc: file.path
                });
                await audioFile.save();
                audioFileIds.push(audioFile._id.toString());
            }
            updateData.audio_file_ids = audioFileIds;
        }

        const scenario = await ScenarioModel.findByIdAndUpdate(id, updateData, {new: true}).populate('audio_file_ids');
        if (!scenario) {
            throw ApiError.BadRequest(`Scenario with id ${id} not found.`);
        }
        return scenario;
    }

    async remove(id: string) {
        const scenario = await ScenarioModel.findByIdAndDelete(id);
        if (!scenario) {
            throw ApiError.BadRequest(`Scenario with id ${id} not found.`);
        }

        await PublisherModel.updateMany(
            {scenario_ids: id},
            {$pull: {scenario_ids: id}}
        );

        await AudioFileModel.deleteMany(
            { _id: { $in: scenario.audio_file_ids } }
        );

        return "Scenario has been deleted.";
    }

    async getMediaFileIds(RFID: string) {
        const toy = await ToyModel.findOne({RFID});
        if (!toy) {
            throw ApiError.NotFound("There are no toys with this RFID.");
        }

        const toyType = await ToyTypeModel.findById(toy.toy_type_id);
        if (!toyType) {
            throw ApiError.NotFound(`ToyType with id ${toy.toy_type_id} not found.`);
        }

        const scenario = await ScenarioModel.findById(toyType.default_scenario_id);
        if (!scenario) {
                throw ApiError.NotFound(`Scenario with id ${toyType.default_scenario_id} not found.`);
        }

        const audio_file_ids = scenario.audio_file_ids;
        for (const audio_file_id of audio_file_ids) {
            const audioFile = await AudioFileModel.findById(audio_file_id);
            if(!audioFile) {
                throw ApiError.NotFound(`Audio file with id ${audio_file_id} not found.`);
            }
        }

        return audio_file_ids;
    }
}

export default new ScenarioService();
