import {z} from "zod";

const schemaEnv = z.object({
    //environment
    NODE_ENV: z.string().default("development"),
    //cms-api
    JWT_SECRET: z.string(),
    PORT: z.string().default("3000"),
    //cms-app
    NEXT_PUBLIC_API_URL: z.string(),
    
    //Prisma
    PRISMA_LOGS: z.string(),
    DATABASE_URL: z.string(),
})


const globalEnv = schemaEnv.parse(process.env) 
export default globalEnv;