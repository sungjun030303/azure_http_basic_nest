import mongoose from 'mongoose';

const globalTeardown = async (): Promise<void> => {
    // MongoDB 연결 해제
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('MongoDB connection is closed.');
    }
};

export default globalTeardown;
