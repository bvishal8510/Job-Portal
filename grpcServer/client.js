const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const protoPath = './demo.proto';

const options = {
    keepCase: true,
    oneofs:true,
    defaults:true,
    enums: String,
    longs:String
}

const packageDef = protoLoader.loadSync(protoPath, options);
const NewsService = grpc.loadPackageDefinition(packageDef).NewsService;

const client = new NewsService(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
)

client.getAllNews({}, (error, news)=>{
    if (error) console.log("Error occured ",error);
    else console.log("This is from client", news);
})