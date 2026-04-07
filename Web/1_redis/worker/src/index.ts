import { createClient } from "redis";

const client = createClient();
//client.connect();

async function main() {
  while (1) {
    //pop from redis
    //process
    //push to database
    const response = await client.brPop("submission", 0);
    console.log(response);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Processed submission");
  }
}

main();
