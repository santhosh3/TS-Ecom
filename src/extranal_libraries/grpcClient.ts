import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

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
const proto = (grpc.loadPackageDefinition(packageDefinition) as any).proto;

// Define request and response interfaces
interface UserRequest {
  token: string;
}

interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  phone_number: string;
}

// Create a client instance for the UserService
export const GetUserData = async (connectionString:string,token: string): Promise<{ status: boolean; message: any }> => {
const client = new proto.UserService(connectionString, grpc.credentials.createInsecure());

// Wrap the gRPC call in a promise for async/await usage
  return new Promise((resolve, reject) => {
    const request: UserRequest = { token };
    
    client.GetUser(request, (error: grpc.ServiceError | null, response: UserResponse) => {
      if (error) {
        const message = {
          status: false,
          message: error.details
        };
        reject(message);
      } else {
        const message = {
          status: true,
          message: response
        };
        resolve(message);
      }
    });
  });
}

interface ProductRequest {
  id: number;
}

interface ProductResponse {
  quantity: number
}

export const GetProductQuantity = async (connectionString:string,productId: number): Promise<{ status: boolean; message: any }> => {
  const client = new proto.ProductService(connectionString, grpc.credentials.createInsecure());
  
  // Wrap the gRPC call in a promise for async/await usage
    return new Promise((resolve, reject) => {
      const request: ProductRequest = { id : productId };
      
      client.GetProduct(request, (error: grpc.ServiceError | null, response: ProductResponse) => {
        if (error) {
          const message = {
            status: false,
            message: error.details
          };
          reject(message);
        } else {
          const message = {
            status: true,
            message: response
          };
          resolve(message);
        }
      });
    });
}
  