import {  query } from 'express-validator/check';
class GetRouteValidator {
    static getAllNewVehicles() {
        return [
            query(['status', 'state', 'minPrice', 'maxPrice'], 'cant be empty')
        ];
    }
    static getAllVehicles() {
        return [
            query('status', 'wait')
        ];
    }
}
export default GetRouteValidator;