import { observable, action } from 'mobx';

class TrainStore {
  @observable trains = [];

  @action addTrain(train) {
    this.trains.push(train);
  }

  @action moveTrain(trainId, newX, newY) {
    const train = this.trains.find((train) => train.id === trainId);
    if (train) {
      train.x = newX;
      train.y = newY;
    }
  }
}

const trainStore = new TrainStore();
export default trainStore;

