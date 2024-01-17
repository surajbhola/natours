const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const xss = require("xss-clean");
const morgan = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const viewRoutes = require("./routes/viewRoutes");
const AppError = require("./utils/appError");
var cors = require('cors')


const globalErrorHandler = require("./controllers/errorController");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

const scriptSrcUrls = ['https://unpkg.com/',
    'https://tile.openstreetmap.org'];
const styleSrcUrls = [
    'https://unpkg.com/',
    'https://tile.openstreetmap.org',
    'https://fonts.googleapis.com/'
];
const connectSrcUrls = ['https://unpkg.com', 'https://tile.openstreetmap.org'];
const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];


app.use(cors()) 
app.use(helmet({ contentSecurityPolicy: false }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// decides how many requests per IP will allowed in several times
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many request from this IP, please try again in an hour",
// });
// app.use("/api", limiter);

// bodyparser , reading data from body into req.body
app.use(express.json({ limit: "10kb" })); // middleware fzunction to get data using req object in post method
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss()); //cleans user input from any malicious html code

// Prevent paramenter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingQuantity",
      "ratingAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// serving static files
app.use(
  express.static(
    "./public"
  )
);

app.use(compression());
// testing middlewares
app.use((req,res, next)=>{
  console.log(req.cookies);
  next();
})

app.use("/", viewRoutes);
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new AppError("Could not find given url", 404));
});

app.use(globalErrorHandler);

module.exports = app;
