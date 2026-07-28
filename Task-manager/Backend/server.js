const express = require("express");
const cors = require('cors');
const taskRoutes =  require("./routes/taskRoutes")
const { errorHandler } = require("./middleware/errorHandler");
const app = express();


app.use(cors());
app.use(express.json());

//check 
app.get("/api/health",(req,res) => {
    res.status(200).json({
        status: "ok",
        message: "server is run"
    })
})

app.use("/api/tasks",taskRoutes)


app.use((req, res) => {
    return res.status(404).json({
      error: {
        code: "ROUTE_NOT_FOUND",
        message: `Route ${req.method} was not found`,
      },
    });
  });
  
  app.use(errorHandler);


const PORT = 4000 // .env 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});