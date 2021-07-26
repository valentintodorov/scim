import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class MultitenantMiddleware {
    constructor() {}

    extractMultitenantId = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        let tenantId = 'default';
        req.subdomains[0]
        let subdomain = this.getSubdomain(req);
        if(subdomain){
            tenantId = subdomain;
        }
        (req as any).tenantId = tenantId;
        next(); 
    }

    getSubdomain(req: express.Request) {
        if(req.subdomains.length == 0) {
            return null;
        }
        let subdomain = req.subdomains[0];
        if(subdomain.startsWith('127.0.0.1') || subdomain.startsWith('::1')) {
            return null;
        }
        return subdomain;
    }
}

export default new MultitenantMiddleware();
