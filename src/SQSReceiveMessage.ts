import "dotenv/config";

import aws from "aws-sdk";

import { Consumer } from "sqs-consumer";

import { container } from "tsyringe";

import https from "https";

import UpdateOrderStatusService from "@modules/checkout/services/db/UpdateOrderStatusService";

aws.config.update({ region: "us-west-2" });

// Create an SQS service object
var sqs = new aws.SQS({ apiVersion: "2012-11-05" });

var queueURL =
  "https://sqs.us-west-2.amazonaws.com/012426929987/pagarme-pedidos";

var params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

const app = Consumer.create({
  queueUrl: queueURL,
  handleMessageBatch: async message => {
    const updateOrderStatusService = container.resolve(
      UpdateOrderStatusService,
    );

    await updateOrderStatusService.execute(message[0].Body);
  },

  sqs: new aws.SQS({
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true,
      }),
    },
  }),
});

app.on("error", err => {
  console.error(err.message);
});

app.on("processing_error", err => {
  console.error(err.message);
});

console.log("Consumer service is running");
app.start();
