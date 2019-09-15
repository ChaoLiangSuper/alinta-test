import db from '../db';

describe('DB', () => {
  it('should be able to get all data', () => {
    const dataList = db.getAllData();
    expect(dataList.length).toBe(20);
  });

  it('should be able to save data', () => {
    db.saveData({
      firstName: '1',
      lastName: '2',
      dateOfBirth: '11/11/1111',
    });
    expect(db.getAllData().length).toBe(21);
  });

  it('should be able to update data', () => {
    const data = db.updateData('1a81dcb3-f70f-4fbe-8436-649da9cf3c0f', {
      key: '1a81dcb3-f70f-4fbe-8436-649da9cf3c0f',
      firstName: 'test1',
      lastName: 'test2',
      dateOfBirth: '11/11/1111',
    });
    expect(data).toEqual({
      key: '1a81dcb3-f70f-4fbe-8436-649da9cf3c0f',
      firstName: 'test1',
      lastName: 'test2',
      dateOfBirth: '11/11/1111',
    });
  });

  it('should be able to get one data', () => {
    const data = db.getOneData('1a81dcb3-f70f-4fbe-8436-649da9cf3c0f');
    expect(data).toEqual({
      key: '1a81dcb3-f70f-4fbe-8436-649da9cf3c0f',
      firstName: 'test1',
      lastName: 'test2',
      dateOfBirth: '11/11/1111',
    });
  });

  it('should be able to delete data', () => {
    db.deleteData('1a81dcb3-f70f-4fbe-8436-649da9cf3c0f');
    expect(db.getAllData().length).toBe(20);
  });
});
