function main(queueName) {
    const messages = Math.floor(Math.random() * 1000).toString();

    return {
        "Attributes": {
            "QueueArn": `arn:aws:sqs:region:account:${queueName}`,
            "ApproximateNumberOfMessages": messages,
            "ApproximateNumberOfMessagesNotVisible": "0",
            "ApproximateNumberOfMessagesDelayed": "0",
            "CreatedTimestamp": Date.now().toString(),
            "LastModifiedTimestamp": "1654788704",
            "VisibilityTimeout": "30",
            "MaximumMessageSize": "262144",
            "MessageRetentionPeriod": "1209600",
            "DelaySeconds": "0",
            "Policy": "{}",
            "RedrivePolicy": "{}",
            "ReceiveMessageWaitTimeSeconds": "0",
            "SqsManagedSseEnabled": "false"
        }
    }
}

console.log(JSON.stringify(main(process.argv[2])));