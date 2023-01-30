import RandomPersonModel, { IRandomPersonModel } from './randomPerson.model';
import { CreateRandomPersonParams } from '../../controllers/misc.controller';
import logger from '../../utils/logger.util';

export class RandomPersonService {
    public async getAll(): Promise<Array<IRandomPersonModel>> {
        return RandomPersonModel.find({});
    }

    public async create(randomPersonCreationParams: CreateRandomPersonParams): Promise<void> {
        const person = {
            age: 1 + Math.floor(Math.random() * 100 + 1),
            SIN: Math.floor(Math.random() * 1000000000),
            name: randomPersonCreationParams.name
        };

        try {
            await RandomPersonModel.create(person);
        } catch (e) {
            logger.error('Failed to create random person', e);
        }
    }
}
