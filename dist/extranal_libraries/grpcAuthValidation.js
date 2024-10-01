"use strict";
// import * as grpc from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import * as path from "path";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Load the protobuf file
// const PROTO_PATH = path.join(__dirname, '../proto/service.proto');
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// // Load the gRPC package from the proto definition
// const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
// const userPackage = protoDescriptor.user;  // Adjust this based on your proto package
// const userService = userPackage.UserService;
// // Create a client instance for the UserService
// const client = new userService('localhost:50051', grpc.credentials.createInsecure());
// // Define request type
// interface GetUserRequest {
//     token: string;
// }
// // Define response type
// interface GetUserResponse {
//     id: string;
//     first_name: string;
//     last_name: string;
//     email: string;
//     profile_image: string;
//     phone_number: string;
// }
// // Wrap the gRPC call in a promise for async/await usage
// async function GetUserData(token: string) {
//   console.log(token,40)
//   return new Promise((resolve, reject) => {
//     console.log(42)
//     client.GetUser({ token }, (error: grpc.ServiceError | null, response: GetUserResponse) => {
//       if (error) {
//         console.log(error)
//         reject(error.details); 
//       } else {
//         console.log(response)
//         resolve(response); 
//       }
//     });
//   });
// }
// export default GetUserData;
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const path = __importStar(require("path"));
// Load the protobuf file
const PROTO_PATH = path.join(__dirname, '../../proto/service.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
// Load the gRPC package from the proto definition
const proto = grpc.loadPackageDefinition(packageDefinition).proto;
// Create a client instance for the UserService
function GetUserData(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new proto.UserService('localhost:50051', grpc.credentials.createInsecure());
        // Wrap the gRPC call in a promise for async/await usage
        return new Promise((resolve, reject) => {
            const request = { token };
            client.GetUser(request, (error, response) => {
                if (error) {
                    const message = {
                        status: false,
                        message: error.details
                    };
                    reject(message);
                }
                else {
                    const message = {
                        status: true,
                        message: response
                    };
                    resolve(message);
                }
            });
        });
    });
}
exports.default = GetUserData;
