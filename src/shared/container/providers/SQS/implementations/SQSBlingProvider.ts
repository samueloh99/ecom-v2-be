import aws from "aws-sdk";

import ISQSBlingProvider from "@shared/container/providers/SQS/models/ISQSBlingProvider";
import ICreateSQSBling from "@shared/container/providers/SQS/dtos/ICreateSQSBling";

class SQSBlingProvider implements ISQSBlingProvider {
  constructor() {}

  public async get(): Promise<string> {
    aws.config.update({ region: "us-west-2" });

    var sqs = new aws.SQS({ apiVersion: "2012-11-05" });

    var queueURL =
      "https://sqs.us-west-2.amazonaws.com/012426929987/bling-produtos";

    var params = {
      AttributeNames: ["SentTimestamp"],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: ["All"],
      QueueUrl: queueURL,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 5,
    };

    let newMsgQueue: string = "";

    sqs.receiveMessage(params, function (err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        const sku = data.Messages[0].Body;

        newMsgQueue = sku as string;

        // var deleteParams = {
        //   QueueUrl: queueURL,
        //   ReceiptHandle: data.Messages[0].ReceiptHandle,
        // };
        // sqs.deleteMessage(deleteParams, function (err, data) {
        //   if (err) {
        //     console.log("Delete Error", err);
        //   } else {
        //     console.log("Message Deleted", data);
        //   }
        // });
      }
    });

    return newMsgQueue;
  }

  public async post({ mensagem }: ICreateSQSBling): Promise<void> {
    aws.config.update({ region: "us-west-2" });

    var sqs = new aws.SQS({ apiVersion: "2012-11-05" });

    var params = {
      // Remove DelaySeconds parameter and value for FIFO queues
      DelaySeconds: 2,
      MessageBody: mensagem,
      // "Information about current NY Times fiction bestseller for week of 12/11/2016.",
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageGroupId: "Group1",  // Required for FIFO queues
      QueueUrl:
        "https://sqs.us-west-2.amazonaws.com/012426929987/bling-produtos",
    };

    sqs.sendMessage(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.MessageId);
      }
    });
  }
}

export default SQSBlingProvider;
