#!/bin/sh

# Create message
cd twig
SHA=`git rev-parse --short HEAD`
MESSAGE=`git show -s --format=%B $SHA`
cd ..
cat >./commit_info/text <<EOL
Commit: [<$git_commit_url$SHA|$SHA>]
Commit Message: "$MESSAGE"
EOL

# Create attachment
TEXT="*Status:* $status\n*Deployment:* $deployment_area"
if [ "$status" == "FAILED" ];
then
  COLOR="danger"
elif [ "$status" = "SUCCESS" ];
then
  COLOR="good"
else
  COLOR="#333333"
fi

cat >./commit_info/attachments.json <<EOL
[
  {
    "title": "$status",
    "color": "$COLOR",
    "fields": [
      {
        "title": "OK",
        "value": "What",
        "short": false
      },
      {
        "title": "The",
        "value": "Hell",
        "short": false
      }
    ]
  }
]
EOL

cat ./commit_info/attachments.json
