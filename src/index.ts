import expressApp from "./expressApp";

const PORT = process.env.PORT || 3000;
export const startServer = async () => {
  expressApp.listen(PORT);

  process.on("uncaughtException", async err => {
    console.log(err);
    process.exit(1);
  })
};

startServer().then(() => {
    console.log(`App is listening on port: ${PORT}`);
})