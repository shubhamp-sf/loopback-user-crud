import {MiddlewareSequence, RequestContext} from '@loopback/rest';

export class RequestLoggerSequence extends MiddlewareSequence {
  getTimeStamp = () => {
    const date = new Date();
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
  async handle(context: RequestContext): Promise<void> {
    const {headers, ip} = context.request;
    const data = {
      ip,
      referer: headers.referer,
      userAgent: headers['user-agent'],
      startTime: this.getTimeStamp(),
      errTime: '-',
      completeTime: '-',
    };
    await super.handle(context);
    data.completeTime = this.getTimeStamp();
    if (!context.response.statusCode.toString().startsWith('2')) {
      // status code is not 2xx
      data.errTime = this.getTimeStamp();
    }

    console.table(data);
  }
}
