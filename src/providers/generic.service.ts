import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class GenericService {

    protected apiServer = "http://localhost:8080";
    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    protected errorHandler(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}