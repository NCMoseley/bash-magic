# Bash Magic

This repo is complimentary to this medium article: [Bash Magic](https://medium.com/@n.c.moseley/use-some-bash-magic-to-enhance-your-aws-experience-19cc2d354b32)

## Usage

Generate list of queues: 
```bash
#!/bin/bash
aws sqs list-queues > tmp_queues/all.json
```
or, if using this repo in lieu of AWS

```bash
#!/bin/bash
grep 'QUEUE' qa-config.yaml | awk '{ print $2 }' \
| sed 's/"//g' > tmp_queues/all.txt
```

Generate list of queue attributes:

```bash
#!/bin/bash
for queue in $(jq .QueueUrls tmp_queues/all.json \
| grep '< match string if necessary >' \
| awk -F / '{print $NF}' \
| sed 's/[",]//g'); \
do aws sqs get-queue-attributes --attribute-names All --queue-url \
https://sqs.region.amazonaws.com/0000000000000/"$queue" \
> tmp_queues/"$queue".json; \
echo "$queue"; \
done
````
or, if using this repo

```bash
#!/bin/bash
while read -r queue; \
do node mockAttributes.js "$queue" \
> tmp_queues/"$queue".json; \
done < tmp_queues/all.txt
```
or with filtering to include 'qa-'

```bash
#!/bin/bash
for queue in $(cat tmp_queues/all.txt \
| grep 'qa-'); \
do node mockAttributes.js $queue \
> tmp_queues/$queue.json; \
done
```

Find specific data in the queue attributes:

```bash
#!/bin/bash
jq '[.Attributes.QueueArn, .Attributes.ApproximateNumberOfMessages]' \
tmp_queues/*.json
```