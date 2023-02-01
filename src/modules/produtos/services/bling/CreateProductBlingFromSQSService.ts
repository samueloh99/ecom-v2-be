import { injectable, inject } from "tsyringe";

import aws from "aws-sdk";

import IBlingProductsProvider from "@shared/container/providers/BlingERP/models/IBlingProductsProvider";

@injectable()
class CreateProductBlingFromSQSService {
  constructor(
    @inject("BlingProductsProvider")
    private blingProductsProvider: IBlingProductsProvider,
  ) {}

  public async execute(): Promise<void> {
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

    var paramsDlq = {
      Attributes: {
        RedrivePolicy:
          '{"deadLetterTargetArn":"arn:aws:sqs:us-west-2:012426929987:dlq-bling-produtos","maxReceiveCount":"10"}',
      },
      QueueUrl:
        "https://sqs.us-west-2.amazonaws.com/012426929987/bling-produtos",
    };

    sqs.receiveMessage(params, async (err, data) => {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        const sku = JSON.parse(data.Messages[0].Body as string);

        const response = await this.blingProductsProvider.post(sku);

        if (response.retorno.erros) {
          sqs.setQueueAttributes(paramsDlq, (e, d) => {
            if (e) {
              console.log("SUCCESS", e);
            } else {
              console.log("SUCCESS", d);
            }
          });
        }

        console.log(response);
      }
    });
  }
}

export default CreateProductBlingFromSQSService;
