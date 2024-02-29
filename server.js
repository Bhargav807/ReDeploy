import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import cors from "cors";
import CategoryRoutes from "./routes/CategoryRoutes.js"
import CommodityRoutes from "./routes/CommodityRoutes.js"
import UserRoutes from "./routes/UserRoutes.js"
import EquipmentRoutes from "./routes/EquipmentRoutes.js"
import path from 'path';

//configure environment
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middlewares
// app.use(cors(({
//   origin:"https://rich-gold-colt-boot.cyclic.app/",
// })));
app.use(cors());
app.use(express.static(path.join(__dirname,'./client/build')));
app.use(morgan("dev"));
app.use(express.json());


//routes all
app.use("/api/v1/auth", authRoutes);


//category routes
app.use("/api/v1/category", CategoryRoutes)


//for products
app.use("/api/v1/products", CommodityRoutes)


//for equipment
app.use("/api/v1/equipment",EquipmentRoutes)



//to get userdata
app.use("/api/v1/users", UserRoutes)



//rest api
app.use('*', function(req, res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});



const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on ${PORT} `.bgCyan.white);
});



