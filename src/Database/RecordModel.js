export class RecordModel {}

RecordModel.schema = {
  name: 'RecordModel',
  primaryKey: 'id',
  properties: {
    id: 'int',
    responseType: 'int',
    videoPath: 'string',
    audioPath: 'string',
    text: 'string',
    time: 'string?',
    duration: 'string?',
  },
};
