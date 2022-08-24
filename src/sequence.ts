import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class MySequence extends MiddlewareSequence {
  getTimeStamp = (date?: Date) => {
    date = date ?? new Date();
    return date.getTime().toString();

    // Human redable time but doesn't show miliseconds
    /* return date.toLocaleDateString('en-hi', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      minute: '2-digit',
      hour: 'numeric',
      second: 'numeric',
    }); */
  };

  logMetaData(ctx: RequestContext, startedAt: Date) {
    const {headers, ip} = ctx.request;
    const data = {
      ip,
      referer: headers.referer,
      userAgent: headers['user-agent'],
      startTime: this.getTimeStamp(startedAt),
      errTime: '-',
      completeTime: '-',
    };
    data.completeTime = this.getTimeStamp();
    if (!ctx.response.statusCode.toString().startsWith('2')) {
      // status code is not 2xx
      data.errTime = this.getTimeStamp();
    }

    console.table(data);
  }

  checkOrigin(referer: string): {allowed: boolean; origin: string} {
    const allowedOrigins: string[] =
      process.env.ALLOWED_ORIGINS?.split(', ') ?? [];

    let allowed = true;
    let origin = '';

    if (referer) {
      origin = new URL(referer).origin;

      if (!allowedOrigins.includes(origin)) {
        allowed = false;
      }
    }

    console.log('Allowed origins:', allowedOrigins, 'Referer origin:', origin);

    return {allowed, origin};
  }
  async handle(context: RequestContext): Promise<void> {
    const startTime = new Date();

    const {allowed, origin} = this.checkOrigin(
      context.request.get('referer') ?? '',
    );

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

    this.logMetaData(context, startTime);
  }
}
