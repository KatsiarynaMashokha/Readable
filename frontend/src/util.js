import { TIME_FORMAT } from '../src/constants/constants';
import moment from 'moment';

export function convertUnixTime(timestamp) {
    return moment.unix(timestamp).format(TIME_FORMAT);
}