import dotenv from 'dotenv';
dotenv.config();
import Server from './server.js';
 
const server = new Server()

server.Listen()