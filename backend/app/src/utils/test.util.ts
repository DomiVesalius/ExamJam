import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import DB_CONFIG from '../config/db.config';

/**
 * This utility class contains static functions that may be useful when
 * creating tests. Examples:
 *      - Connecting to db
 *      - Disconnecting to db
 *      - Removing all docs
 *
 * Source(s):
 *      - https://www.makeuseof.com/mongoose-models-test-with-mongo-memory-server/
 */
export class TestUtil {
    private static mongo?: MongoMemoryServer;

    static async connectToTestDatabase() {
        if (this.mongo) return;

        mongoose.set('strictQuery', false); // gets rid of a warning
        this.mongo = await MongoMemoryServer.create();
        await mongoose.connect(this.mongo.getUri(), DB_CONFIG.options);
    }

    static async disconnectFromTestDatabase() {
        if (this.mongo) {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await this.mongo.stop();
        }
    }

    static async removeAllDocuments() {
        if (this.mongo) {
            const collections = await mongoose.connection.db.collections();
            for (let collection of collections) {
                await collection.deleteMany({});
            }
        }
    }
}
