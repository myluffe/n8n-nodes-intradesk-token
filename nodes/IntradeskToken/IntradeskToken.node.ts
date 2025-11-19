import { 
    IDataObject,
    IExecuteFunctions,
	INodeExecutionData,
    INodeType, INodeTypeDescription,
} from 'n8n-workflow';
import { IntradeskTokenApi } from '../../credentials/IntradeskTokenApi.credentials';
import getToken from '../../intradesk/getToken';

export class IntradeskToken implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Get Intradesk Token',
        name: 'intradeskToken',
        icon: { light: 'file:../../icons/intradesktoken_light.svg', dark: 'file:../../icons/intradesktoken_dark.svg' },
        group: ['input'],
        version: 1,
        description: 'Get auth token from Intradesk',
        defaults: {
            name: 'Intradesk Token',
        },
        inputs: ['main'],
        outputs: ['main'],
        usableAsTool: true,
        credentials: [
            {
                name: 'IntradeskTokenApi',
                required: true,
            },
        ],
        properties: [
		    // Resources and operations will go here
            {
				displayName: 'Intradesk Tenant',
				name: 'intradesk_tenant',
				type: 'string',
				default: '',
				placeholder: '{your_address_part}.intradesk.ru',
				description: 'Example: pop-up.intradesk.ru',
                required: true
			},
            {
				displayName: 'Auth Scope',
				name: 'auth_scope',
				type: 'string',
				default: 'openid profile email custom.profile api offline_access',
				placeholder: 'openid profile email custom.profile api offline_access',
				description: 'Intradesk auth scope',
                required: true
			},
		]
	};

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const returnData: IDataObject[] = []

        const credentials = await this.getCredentials(IntradeskTokenApi.CredentialName)

        const tenant = this.getNodeParameter('intradesk_tenant', 0) as string
        const auth_scope = this.getNodeParameter('auth_scope', 0) as string
        const response = await getToken(credentials.username.toString(), credentials.password.toString(), auth_scope, tenant)
        returnData.push(response as IDataObject)

        return [this.helpers.returnJsonArray(returnData)];
    }
}