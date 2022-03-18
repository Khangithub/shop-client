import prettyMs from 'pretty-ms';

const convertTimestamp = timestamp =>
  prettyMs (Date.now () - new Date (timestamp), {
    compact: true,
  }) + ' ago';

const pretyTime = date => {
  const hour = date.getHours ();
  const mins = date.getMinutes ();

  const day = date.getDay ();
  const month = date.getMonth ();
  const year = date.getFullYear ();

  const formatedTime =
    (hour > 12 ? hour - 12 : hour) + ':' + mins + (hour > 12 ? ' PM' : ' AM');
  const formatedDate = day + '/' + month + '/' + year;

  return {formatedTime, formatedDate};
};
export {convertTimestamp, pretyTime};
