import Realm from 'realm';
import {RecordModel} from './RecordModel';

export const realm = new Realm({schema: [RecordModel]});

export const writeRecord = (data) => {
  console.log('writing record');

  realm.write(() => {
    realm.create('RecordModel', data);
  });
};

export const readRecord = () => {
  console.log('reading record');
  let record = realm.objects('RecordModel');

  const data = record.map((item) => {
    return item;
  });

  return data;
};
