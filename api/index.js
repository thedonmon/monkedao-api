import { Base64 } from "js-base64";
import request from "request-promise";
export default async function handler(req, res) {
    const token = Base64.encode(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
    try {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );
        const { token_type, access_token } = await request({
            uri: `${process.env.ISSUER}`,
            json: true,
            method: "POST",
            headers: {
                authorization: `Basic ${token}`,
            },
            form: {
                grant_type: "client_credentials",
            },
        });
        console.log({ token_type, access_token });
        res.status(200).json({ access_token });
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
}
//# sourceMappingURL=index.js.map