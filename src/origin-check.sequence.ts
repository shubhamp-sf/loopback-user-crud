import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class OriginCheckSequence extends MiddlewareSequence {
  async handle(context: RequestContext): Promise<void> {
    const allowedOrigins: string[] =
      process.env.ALLOWED_ORIGINS?.split(', ') ?? [];

    const referer = context.request.get('referer') ?? '';

    let allowed = true;
    let origin = '';

    if (referer) {
      origin = new URL(referer).origin;

      if (!allowedOrigins.includes(origin)) {
        allowed = false;
      }
    }

    console.log('Allowed origins:', allowedOrigins, 'Referer origin:', origin);

    if (allowed) {
      await super.handle(context);
    } else {
      context.response
        .status(403)
        .json({
          error: `Request from origin ${origin} not allowed.`,
        })
        .send();
    }
  }
}
