import aws from "aws-sdk";

import ISQSOrderErrorProvider from "@shared/container/providers/SQS/models/ISQSOrderErrorProvider";

class SQSOrderErrorProvider implements ISQSOrderErrorProvider {
  constructor() {}

  public async post(mensagem: string): Promise<void> {
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
        "https://sqs.us-west-2.amazonaws.com/012426929987/pedidos-error",
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

export default SQSOrderErrorProvider;
