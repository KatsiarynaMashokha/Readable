import { TIME_FORMAT } from '../src/constants/constants';
import moment from 'moment';

export function convertUnixTime(timestamp) {
    return moment(timestamp).format(TIME_FORMAT);
}