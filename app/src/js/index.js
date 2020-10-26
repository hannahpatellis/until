let state = {
  destinationTime: '12:00 AM',
  destinationDate: '09-08-2021',
  differenceTime: []
};

const setState = (prop, val) => {
  state[prop] = val;
  console.log(state);
  render();
}
const DOMdestinationTime = document.getElementById('destinationTime');
DOMdestinationTime.addEventListener('input', function (e) {
  setState('destinationTime', DOMdestinationTime.value);
  findDifference();
});
const DOMdestinationDate = document.getElementById('destinationDate');
DOMdestinationDate.addEventListener('input', function (e) {
  setState('destinationDate', DOMdestinationDate.value);
  findDifference();
});

const findDifference = () => {
  const now = moment();
  const then = moment(`${state.destinationDate} ${state.destinationTime}`, 'M-DD-YYYY h:mm A');

  const diff = then.diff(now) * .001;
  let differenceTime = [
    Math.floor(diff / 60 / 60),
    Math.floor(diff / 60) - (Math.floor(diff / 60 / 60) * 60)
  ];
  
  setState('differenceTime', differenceTime);
}

const setToday = () => {
  const nowDate = moment().add(1, 'd').format('M-DD-YYYY');
  const nowTime = moment().format('h:mm A');
  DOMdestinationDate.value = nowDate;
  DOMdestinationTime.value = nowTime;
  const DOMcurrentTimeView = document.getElementById('currentTime-view');
  DOMcurrentTimeView.innerHTML = nowTime;
  setState('destinationDate', nowDate);
  setState('destinationTime', nowTime);
}

const render = () => {
  const DOMhoursView = document.getElementById('hours-view');
  const DOMminutesView = document.getElementById('minutes-view');
  DOMhoursView.innerHTML = state.differenceTime[0];
  DOMminutesView.innerHTML = state.differenceTime[1];
}

render();
setToday();
findDifference();
