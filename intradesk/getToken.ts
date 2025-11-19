/* eslint-disable @n8n/community-nodes/no-restricted-imports */
import qs from 'qs';
import axios from 'axios';

export default async function getToken(
    username: string,
    password: string,
    scope: string,
    tenant: string
): Promise<Record<string, unknown>> {
    const data = {
        grant_type: 'password',
        scope: scope,
        username: username,
        password: password,
        client_id: 'resourceowner',
        acr_values: `tenant:${tenant}`
    }

    return axios.post('https://login.intradesk.ru/connect/token', qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        return Promise.resolve(response.data);
    })
    .catch(error => {
        return Promise.reject(error);
    });
}