require('dotenv/config');
require('@babel/register');
require('../migrations/dropDatabase');
require('../migrations/createUsersTable');
require('../migrations/createCarsTable');
require('../migrations/createOrdersTable');
require('../migrations/createFlagsTable');
