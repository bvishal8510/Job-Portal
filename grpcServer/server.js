const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const protoPath = './demo.proto';

const options = {
    keepCase: true,
    longs: String,
    enums:String,
    defaults:true,
    oneofs:true
}

var packageDefinition = protoLoader.loadSync(protoPath, options);
const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const server = new grpc.Server();

let news = [
    { id: "1", title: "Note 1", body: "Content 1", image: "Post image 1" },
    { id: "2", title: "Note 2", body: "Content 2", image: "Post image 2" }
];

server.addService(NewsService.service, {
    getAllNews: (_, callback)=>{
        callback(null, news);
    }
})

server.bindAsync(
    "127.0.0.1:50051",
    grpc.ServerCredentials.createInsecure(),
    (err, port)=>{
        if(err) {
            console.log("some error occured", err);
        }
        console.log("grpc server running on port ", port);
        server.start();
    }
)