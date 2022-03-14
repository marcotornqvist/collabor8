import { SES } from "aws-sdk";
const ses = new SES({ region: process.env.AWS_REGION! });

export function sendEmail(action: string, message: string) {
  var params = {
    Destination: {
      ToAddresses: [process.env.EMAIL_TO!],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },

      Subject: { Data: `Collabor8 Action: ${action}` },
    },
    Source: process.env.EMAIL_FROM!,
  };

  return ses.sendEmail(params).promise();
}
