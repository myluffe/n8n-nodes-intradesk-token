import {
    Icon,
	//IAuthenticateGeneric,
	//ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow'

export class IntradeskTokenApi implements ICredentialType {
	static CredentialName = 'Intradesk User'

	name = IntradeskTokenApi.CredentialName
	displayName = 'IntradeskToken API';

	properties: INodeProperties[] = [
		{
			displayName: 'User Name',
			name: 'username',
			type: 'string',
			required: true,
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			required: true,
			typeOptions: {
				password: true,
			},
			default: '',
		},
	]

	icon: Icon = { light: 'file:../icons/intradesktoken_light.svg', dark: 'file:../icons/intradesktoken_dark.svg' };
}