import moment from 'moment';

export const momentSqlFormat = 'YYYY-MM-DD HH:mm:ss';
export const momentSqlTFormat = 'YYYY-MM-DDTHH:mm:ss';
export const momentSqlDateFormat = 'YYYY-MM-DD';
export const momentDateFormat = 'dddd DD MMMM YYYY';
export const momentTimeFormat = 'HH:mma';
export const momentDateTimeFormat = 'dddd DD MMMM YYYY HH:mma';
export const momentSqlTimeFormat = 'HH:mm:ss';

export const getFullDateText = dateTimeText => {
    return dateTimeText
        ? moment(dateTimeText, momentSqlFormat).format(momentDateFormat)
        : null
};

export const getTimeText = dateTimeText => {
    return dateTimeText
        ? moment(dateTimeText, momentSqlFormat).format(momentTimeFormat)
        : null
};
