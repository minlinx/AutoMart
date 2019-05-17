import { check } from 'express-validator/check';
class GetRouteValidator {
    static getAllNewVehicles() {
        return [
            check('status', 'status is required').isLength({ min: 1 }).trim(),
            check('state', 'state is required').isLength({ min: 1 }).trim(),
            check('minPrice', 'minPrice is required').isLength({ min: 1 }).trim(),
            check('maxPrice', 'maxPrice is required').isLength({ min: 1 }).trim(),
        ];
    }
}
export default GetRouteValidator;