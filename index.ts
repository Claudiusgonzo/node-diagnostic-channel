
import {knownPatches} from './knownPatches';
import {makePatchingRequire} from './patchRequire';

const moduleModule = require('module');
moduleModule.prototype.require = makePatchingRequire(knownPatches);

// Force patching of console
require('console');


// For demo purposes, combine pub/sub into single module for knownPatches

import './bunyan/bunyan.sub';
import './console/console.sub';
import './mongodb/mongodb.sub';
import './mysql/mysql.sub';
import './redis/redis.sub';

// Also for demo purposes: hook up zone.js context preserving
// This is something that applicationinsights would do

declare var Zone;
import {channel} from './channel';
channel.addContextPreservation((cb) => {
    if (Zone && Zone.current) {
        return Zone.current.wrap(cb);
    };
    return cb;
})