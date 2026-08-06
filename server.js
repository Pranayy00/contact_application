require("dotenv").config();
const cors=require("@fastify/cors");
const cors=require("@fastify/cors");
const connectDB=require("@fastify/mongodb");
const fastify=require("fastify")({logger:true});
const fastify=require("fastify")({logger:true});

const PORT=process.env.PORT

//cors
fastify.register(cors,{
    origin:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"]
})


//mongodb atlas connection
fastify.register(connectDB,{
    forceClose:true,
    url:process.env.MONGO_URI
})

//create contact-route
fastify.register(require("./Routes/contactRoutes"),{
    prefix:"api",
})

//fastify hook 
fastify.addHook("onReady",async ()=>{
    fastify.mongo.db.collection("contact")
    .createIndex(
        {email:1},
        {unique:true}
    )

})

fastify.get("/",(req,reply)=>{
    reply.code(200).send({
        message:"Contact management api running"
    })
})

const start=async()=>{
    try {
        await fastify.listen({
            port:PORT,
            host:"0.0.0.0"
        })
        console.log(`mongodb connected on port ${PORT}`);
        
        
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start()
