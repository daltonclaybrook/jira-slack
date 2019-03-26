import { APIGatewayProxyResult } from 'aws-lambda';

interface Event {
    body?: string;
}

const lambdaHandler = async (event: Event): Promise<APIGatewayProxyResult> => {
    const body = event.body || '';
    console.log(JSON.stringify(body));
    return {
        statusCode: 200,
        body: '',
    }
}

if (process.env.DEBUG) {
    lambdaHandler({ body: 'test' }).then((result) => {
        console.log(`debug success: ${JSON.stringify(result)}`);
    }).catch((err) => {
        console.log(`debug error: ${err}`);
    });
}

exports.handler = lambdaHandler;
