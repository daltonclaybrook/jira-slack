import { APIGatewayProxyResult } from 'aws-lambda';
import { JiraPayload } from './jira-payload';

interface Event {
    body?: string;
}

const lambdaHandler = async (event: Event): Promise<APIGatewayProxyResult> => {
    const payload: JiraPayload = JSON.parse(event.body || '');
    const changeItems = payload.changelog.items;
    if (changeItems.length > 0 && changeItems[0].fieldId === 'status') {
        const message = `*** Status changed ***\n\
        Issue: ${payload.issue.key}\n\
        Summary: ${payload.issue.summary}\n\
        From: ${changeItems[0].fromString}\n\
        To: ${changeItems[0].toString}`;

        console.log(message);

        if (changeItems[0].fieldId.toLowerCase() === 'design uat') {
            console.log('sending message to design slack...');
        }
    }
    return {
        statusCode: 200,
        body: '',
    };
};

if (process.env.DEBUG) {
    lambdaHandler({ body: 'test' }).then((result) => {
        console.log(`debug success: ${JSON.stringify(result)}`);
    }).catch((err) => {
        console.log(`debug error: ${err}`);
    });
}

exports.handler = lambdaHandler;
