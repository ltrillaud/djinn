import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { AuthService } from './auth.service'

export const skipJwtInterceptorHeader = 'X-Skip-Jwt-Interceptor'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Do not add Authorization header if the request has the skip header
    // (which will be removed from the final request)
    if (request.headers.has(skipJwtInterceptorHeader)) {
      const cleanHeaders = request.headers.delete(skipJwtInterceptorHeader)
      return next.handle(request.clone({ headers: cleanHeaders }))
    }

    // add authorization header with jwt token if available
    if (this.authService.user && this.authService.user.jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.user.jwt}`
        }
      })
    }
    return next.handle(request)
  }
}
